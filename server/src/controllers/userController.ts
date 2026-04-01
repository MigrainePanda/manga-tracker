import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.ts';

// Create a new user
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, name } = req.body;
    const user = UserModel.create(username, name);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// get all users
export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = UserModel.getAll();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

// get user by userID
export const getUserByID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const user = UserModel.getById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// update user's name
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { name } = req.body;
    const user = UserModel.update(id, name);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const user = UserModel.delete(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
