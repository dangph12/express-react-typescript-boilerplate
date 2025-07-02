import { NextFunction, Request, Response } from 'express';
import QuizModel from './quizModel';
import { apiResponse } from '~/types/apiResponse';
import createHttpError from 'http-errors';

/**
 * quizController.ts
 *
 * @description :: Server-side logic for managing quizzes.
 */
export default {
  /**
   * quizController.list()
   */
  list: async function (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const quizzes = await QuizModel.find();
      if (!quizzes || quizzes.length === 0) {
        throw createHttpError(404, 'No quizzes found');
      }

      return res
        .status(200)
        .json(apiResponse.success('Quizzes retrieved successfully', quizzes));
    } catch (err) {
      next(err);
    }
  },

  /**
   * quizController.show()
   */
  show: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const id = req.params.id;

    try {
      const quiz = await QuizModel.findById(id);
      if (!quiz) {
        throw createHttpError(404, 'No such quiz');
      }
      return res
        .status(200)
        .json(apiResponse.success('Quiz retrieved successfully', quiz));
    } catch (err: Error | unknown) {
      next(err);
    }
  },

  /**
   * quizController.create()
   */
  create: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const quiz = new QuizModel({
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions
    });

    try {
      const savedQuiz = await quiz.save();
      return res
        .status(201)
        .json(apiResponse.success('Quiz created successfully', savedQuiz));
    } catch (err: Error | unknown) {
      next(err);
    }
  },

  /**
   * quizController.update()
   */
  update: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const id = req.params.id;

    try {
      const quiz = await QuizModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!quiz) {
        throw createHttpError(404, 'No such quiz');
      }
      return res
        .status(200)
        .json(apiResponse.success('Quiz updated successfully', quiz));
    } catch (err: Error | unknown) {
      next(err);
    }
  },

  /**
   * quizController.remove()
   */
  remove: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const id = req.params.id;

    try {
      const result = await QuizModel.findByIdAndDelete(id);
      if (!result) {
        throw createHttpError(404, 'No such quiz');
      }
      return res
        .status(200)
        .json(
          apiResponse.success('Quiz deleted successfully', { id: result.id })
        );
    } catch (err: Error | unknown) {
      next(err);
    }
  }
};
