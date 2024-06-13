#!/usr/bin/node
// Connect to localhost on port 6379.
import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

// Use util.promisify to convert the client.set method
// to a promise-based version
const getAsync = promisify(client.get).bind(client)

client.on('error', err => console.log(`Redis client not connected to the server: ${err.message}`));

client.on("connect", () => console.log("Redis client connected to the server"));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print); // ok
}

async function displaySchoolValue(schoolName) {
  const res = await getAsync(schoolName);
  console.log(res);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');