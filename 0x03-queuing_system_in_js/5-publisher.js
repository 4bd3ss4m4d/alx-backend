// #!/usr/bin/node
// publisher: generate job
// creates events and sends them to the redis q
import { createClient } from "redis";

const client = createClient();

client.on('err', () => console.log('Redis client not connected to the server: ${err.message}'))

client.on('connect', () => console.log('Redis client connected to the server'))

function publishMessage(message, time) {
  // publish a message only once after a delay, setTimeout
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message)
  }), time;
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);