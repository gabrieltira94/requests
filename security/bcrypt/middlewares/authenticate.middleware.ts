import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from '../secrets';
import { isValidUser } from '../users.repository';

// Middleware to handle authentication
export function authenticateTokenMiddleware(req: any, res: any, next: Function) {
  const { username, password } = req.body;

  // We try to find the user in our DB
  const user = isValidUser(username);

  if (!user)
    return res.status(401).json({ message: 'Invalid credentials' });

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // Password matches, generate and return token
      req.body.token = generateToken(username, user.id);
      next();
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
}

function generateToken(username: string, id: number) {
  return jwt.sign(
    { username, id },
    env.jwtSecret,
    { expiresIn: env.expiresIn }
  );
}
