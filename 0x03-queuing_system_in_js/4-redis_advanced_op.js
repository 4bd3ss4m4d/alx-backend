#!/usr/bin/node
import { createClient, print } from "redis";

const client = createClient();

client.on('err', () => console.log('Redis client not connected to the server: ${err.message}'))

client.on('connect', () => console.log('Redis client connected to the server'))


const HolbertonSchools = {
  "Portland": 50,
  "Seattle": 80,
  "New York": 20,
  "Bogota": 20,
  "Cali": 40,
  "Paris": 2
}

function setSchools(hKey, school, reply) {
  Object.entries(school).forEach(([school, students]) => {
    client.hset(hKey, school, students, reply);
  })
};

setSchools('HolbertonSchools', HolbertonSchools, print)

client.hgetall("HolbertonSchools", (err, value) => {
  if (err) throw err
  console.log(value);
})