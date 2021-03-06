import TokenDecoder from '../helpers/TokenDecoder';
import Admin from '../models/admin.model';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { decodedToken } = TokenDecoder(req);

    if (!decodedToken) {
      throw new Error('This token may have expired');
    }

    const { id } = decodedToken;

    const admin = await Admin.findById(id);

    if (admin) {
      req.body.id = id;
      req.body.user = admin;
      return next();
    }
    return res.json({ message: 'Unappoved User' });
  } catch (error) {
    next(error);
  }
};
