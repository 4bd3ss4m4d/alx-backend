#!/usr/bin/node
const kue = require('kue')

const queue = kue.createQueue();

const blacklist = ['4153518780', '4153518781']

function sendNotification(phoneNumber, message, job, done) {
  const cent = 100
  // track progress from 0 to 100
  job.progress(0, cent);

  if (blacklist.includes(phoneNumber)) {
    done(Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }
  //  track progress from 50 to 100
  job.progress(50, cent);

  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}

queue.process('push_notification_code_2', function (job, done) {
  sendNotification(
    job.data.phoneNumber, job.data.message, job, done);
});