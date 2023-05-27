import { env } from "../secrets";
import { isValidUser } from "../users.repository";
import jwt from 'jsonwebtoken';

// Middleware to handle authentication
export function authenticateTokenMiddleware(req: any, res: any, next: Function) {
  const { username, password } = req.body;

  // We try to find the user in our DB
  const user = isValidUser(username, password);

  if (!user)
    return res.sendStatus(403); // Forbidden

  const token = generateToken(username, user.id);
  req.body.token = token;

  next();
}

function generateToken(username: string, id: number) {
  return jwt.sign(
    { username, id },
    env.jwtSecret,
    { expiresIn: env.expiresIn }
  );
}
