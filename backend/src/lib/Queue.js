import Bee from 'bee-queue';

import redisConfig from '../config/redis';

import SubscriberMail from '../app/jobs/SubscriberMail';

const jobs = [SubscriberMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(job => {
      this.queues[job.key] = {
        bee: new Bee(job.key, { redis: redisConfig }),
        handle: job.handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
