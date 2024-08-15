import { deadLetterQueues } from "./listOfQueue";

export const emailSender = (job: any) => {
  // write your email sender logic
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (job.data.user.id % 2 != 0) {
        resolve(
          `your job resolved with job id ::  ${job.id}  and
           user id :: ${job.data.user.id}`
        );
      } else {
        const user = job.data.user;
        const options = {
          attempts: 2,
          backoff: {
            delay: 30000, //30 sec
            // type: "fixed",
            type: "exponential",
          },
        };
        deadLetterQueues.add({ user }, options);
        reject(
          `your job rejected with job id ::  ${job.id} and
           user id :: ${job.data.user.id},because of job id is odd`
        );
      }
    }, 25000);
  });
};
