#!/usr/bin/node
var kiu = require('kue')

const queue = kiu.createQueue()

// ['4153518780', '4153518781']
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];


jobs.forEach((item) => {
  const job = queue.create('push_notification_code_2', item).save();
  job.on('enqueue', () => console.log(`Notification job created: ${job.id}`))
    .on('complete', () => console.log(`Notification job ${job.id} completed`))
    .on('failed', (err) => console.log(`Notification job ${job.id} failed: ${err}`))
    .on('progress', (progress, data) => console.log(`Notification job ${job.id} ${progress}% complete`))

})