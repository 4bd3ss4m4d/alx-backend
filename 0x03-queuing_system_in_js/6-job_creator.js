#!/usr/bin/node
/*
Create a queue named push_notification_code, and create a job with the object created before
When the job is created without error, log to the console Notification job created: JOB ID
When the job is completed, log to the console Notification job completed
When the job is failing, log to the console Notification job failed
*/
const kiu = require('kue')
const queue = kiu.createQueue()

const jobData = {
  phoneNumber: "4153518780",
  message: "This is the code to verify your account",
}

const job = queue.create("push_notification_code", jobData).save();

job.on('enqueue', () => console.log(`Notification job created: ${job.id}`))
  .on('failed', () => console.error("Notification job failed"))
  .on('complete', () => console.log("Notification job completed"))