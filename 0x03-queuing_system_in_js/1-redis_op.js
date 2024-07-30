#!/usr/bin/node
// Connect to localhost on port 6379.
import { createClient, print } from 'redis';

const client = createClient();

client.on('error', err => console.log(`Redis client not connected to the server: ${err.message}`));

client.on("connect", () => console.log("Redis client connected to the server"));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // ok
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, res) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(res);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');