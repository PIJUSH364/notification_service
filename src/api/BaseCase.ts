import { Request, Response } from "express";
import UseCaseInterface from "./UseCaseInterface";

abstract class BaseUseCase implements UseCaseInterface {
  public request: Request;
  public response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  abstract execute();

  public async executeAndHandleErrors(): Promise<any> {
    try {
      let data: any = await this.execute();
      if (data?.error) throw data; //error throwing
      const code = data.code ?? 200;
      this.response.status(code).json(data);
    } catch (error) {
      if (error != null) {
        let message = error.message;
        const code = error.code ?? 400;
        const data = { code, message };
        this.response.status(code).json(data);
      } else {
        this.response.status(400).json({
          code: 400,
          message: "Unable to process your request, please try again",
        });
      }
    }
  }
}

export default BaseUseCase;
