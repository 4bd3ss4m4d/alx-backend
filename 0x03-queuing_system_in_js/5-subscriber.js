#!/usr/bin/node
// subscriber: process job
// waits events on the queue then carries out a process
import { createClient } from "redis";

const client = createClient();

client.on('err', () => console.log('Redis client not connected to the server: ${err.message}'))

client.on('connect', () => console.log('Redis client connected to the server'))

client.subscribe("holberton school channel")

client.on("message", (channel, message) => {
  if (channel === "holberton school channel") console.log(message);
  if (message === "KILL_SERVER") {
    client.unsubscribe();
    client.quit();
  }
})