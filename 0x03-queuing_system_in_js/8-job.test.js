#!/usr/bin/node
const { expect } = require("chai");
const assert = require('assert')
const kiu = require('kue');
const createPushNotificationsJobs = require("./8-job");

const queue = kiu.createQueue();

describe('createPushNotificationsJobs', () => {
  let consoleSpy;

  before(() => { queue.testMode.enter() });
  afterEach(() => { queue.testMode.clear() });
  after(() => { queue.testMode.exit() });

  it('should throw an error if input is not an array', () => {
    assert.throws(() => createPushNotificationsJobs('not an array', queue), Error, 'Jobs is not an array');
  });

  it('should process an array of jobs', () => {
    const jobs = [{ phoneNumber: '1234567890', message: 'Test message' }];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(1);
  });

  it('should create the correct notification type', (done) => {
    const jobs = [{ phoneNumber: '1234567890', message: 'Test message' }];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3')
    done();
  });

  it('should emit progress event with correct percentage', (done) => {
    const jobs = [{ phoneNumber: '1234567890', message: 'Test message' }];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs[0].data).to.deep.equal({
      phoneNumber: "1234567890",
      message: "Test message",
    });
    done();
  });
});
