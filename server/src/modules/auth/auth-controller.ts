import { Request, Response } from 'express';

const AuthController = {
  login: async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User logged in successfully' });
  },
  register: async (req: Request, res: Response) => {
    return res.status(201).json({ message: 'User registered successfully' });
  },
  refreshToken: async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Token refreshed successfully' });
  },
  logout: async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User logged out successfully' });
  },
  loginByGoogle: async (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
  },
  loginByFacebook: async (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
  }
};

export default AuthController;
