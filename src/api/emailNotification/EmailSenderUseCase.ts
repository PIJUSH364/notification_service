import { Request, Response } from "express";
import { users } from "../../config/user";
import { emailQueue, highPriorityEmailQueue } from "../../utils/listOfQueue";
import { delayCalculation } from "../../utils/utils";
import BaseUseCase from "../BaseCase";

/**
 * Use case for sending emails based on user priority and status.
 */
class EmailSenderUseCase extends BaseUseCase {
  /**
   * Constructor for EmailSenderUseCase.
   * @param request - The request object.
   * @param response - The response object.
   */
  constructor(request: Request, response: Response) {
    super(request, response);
  }

  /**
   * Executes the email sending process by adding users to the appropriate queues based on their priority.
   
   */
  public async execute() {
    try {
      // Map over the users and add each user to the appropriate queue
      users.map(async (user) => {
        // Calculate delay based on user status
        const options = {
          delay: delayCalculation(user),
        };

        // Add user to the high priority queue if priority is 1 and user is active
        if (user.priority === 1 && user.active) {
          await highPriorityEmailQueue.add({ user });
        } else {
          // Add user to the general email queue with delay options
          await emailQueue.add({ user }, options);
        }
      });

      // Return a success response after all users are added to the queue
      return {
        code: 200,
        message: "All users added to the queue",
      };
    } catch (error) {
      // Log and return an error response if there was an issue adding users to the queue
      console.log("Error adding users to the queue:", error);
      return {
        code: 400,
        message: "Error adding users to the queue",
      };
    }
  }

  /**
   * Static method to create an instance of EmailSenderUseCase.
   * @param request - The request object.
   * @param response - The response object.
   * @returns An instance of EmailSenderUseCase.
   */
  public static create(request: Request, response: Response) {
    return new EmailSenderUseCase(request, response);
  }
}

export default EmailSenderUseCase;
