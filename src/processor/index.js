import { deadLetterQueues, emailQueue, highPriorityEmailQueue } from "../utils/listOfQueue";
import { emailSender } from "../utils/emailSender";

const emailProcessor = async (job, done) => {
    try {
        await emailSender(job)
        done()
    } catch (error) {
        // console.log("error :: ", error)
        done(new Error(`This is an error message ${job.id}`));
    }
}

const emailProcessorWithPriority = async (job, done) => {
    try {
        // write email sending logic here
        setTimeout(() => {
            done()
        }, 10000)

    } catch (error) {
        // console.log("error :: ", error)
        done(new Error(`This is an error message ${job.id}`));
    }
}
const errorEmailProcessor = async (job, done) => {
    try {
        // write email sending logic here
        if (job.id % 2 != 0) {
            throw new Error("Failed to email send")
        } else {
            setTimeout(() => { done() }, 10000)

        }

    } catch (error) {
        // console.log("error :: ", error)
        done(new Error(`This is an error message ${job.id}`));
    }
}



emailQueue.process(emailProcessor);
deadLetterQueues.process(errorEmailProcessor)
highPriorityEmailQueue.process(emailProcessorWithPriority)