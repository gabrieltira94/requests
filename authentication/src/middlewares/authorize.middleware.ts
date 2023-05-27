import jwt from 'jsonwebtoken';
import { env } from '../secrets';
import { hasAccess } from '../users.repository';

// Middleware to handle authentication
export function authorizeTokenMiddleware(req: any, res: any, next: Function) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.sendStatus(401); // Unauthorized

  jwt.verify(token, env.jwtSecret, (err: any, user: any) => {
    if (err)
      return res.sendStatus(403); // Forbidden

    // Check if user has access to API
    if (!hasAccess(user.id))
      return res.sendStatus(401); // Unauthorized

    req.user = user;
    next();
  });
}
