import { Response, NextFunction } from "express";
import { SuccessfulResponse } from "../interfaces/Base.interface";

class BaseController {
  static returnSuccessfulResponse<T>(res: Response, data: T): Response {
    const response: SuccessfulResponse = {
      code: res.statusCode || 200,
      success: true,
      data,
    };
    return res.json(response);
  }

  public makeRequest = async (
    fn: Function,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await fn();
      return BaseController.returnSuccessfulResponse(res, response.data);
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;
