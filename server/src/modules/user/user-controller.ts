import userService from './user-service';
import { Request, Response } from 'express';
import apiResponse from '~/types/api-response';

const UserController = {
  find: async (req: Request, res: Response) => {
    const { page = 1, limit = 10, filter, sortBy, sortOrder } = req.query;
    const users = await userService.find({
      page: Number(page),
      limit: Number(limit),
      filter: filter as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as string
    });
    return res
      .status(200)
      .json(apiResponse.success('Users retrieved successfully', users));
  }
};

export default UserController;
