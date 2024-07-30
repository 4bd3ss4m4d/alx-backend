const express = require('express');
const redis = require('redis');
const kue = require('kue');
const { promisify } = require('util');

// Create a Redis client:
const client = redis.createClient();
const queue = kue.createQueue();
const app = express();

let availableSeats = 50;
let reservationEnabled = true;


const reserveSeat = (number) => {
  availableSeats -= number;
  client.set('available_seats', availableSeats);
};

// return the current number of available seats
const getCurrentAvailableSeats = async () => {
  const getAsync = promisify(client.get).bind(client);
  return await getAsync('available_seats');
};

app.get('/available_seats', async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: seats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      res.json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in process' });
    }
  });

  job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`));
  job.on('failed', (errorMessage) => console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`));
});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', async (job, done) => {
    try {
      const seats = await getCurrentAvailableSeats();
      if (seats > 0) {
        reserveSeat(1);
        done();
      } else {
        done(new Error('Not enough seats available'));
      }
    } catch (err) {
      done(err);
    }
  });

  res.json({ status: 'Queue processing' });
});

app.listen(1245, () => console.log('Server listening on port 1245'));
