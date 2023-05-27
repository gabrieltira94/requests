import { UserDB } from '../users.repository';

// Middleware to handle authentication
export function authenticateTokenMiddleware(req: any, res: any, next: Function) {
  const { username, password } = req.body;

  // We try to find the user in our DB
  const user = UserDB.find(user => user.name === username && user.password === password);

  if (!user)
    return res.sendStatus(403); // Forbidden

  // Attach its id to generate a token
  req.body.id = user.id;

  next();
}
