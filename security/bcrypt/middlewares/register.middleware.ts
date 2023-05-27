import bcrypt from 'bcrypt';
import { addUser, isNameTaken } from "../users.repository";
import { env } from '../secrets';

export function registerMiddleware(req: any, res: any, next: Function) {
  const { name, password } = req.body;

  if (isNameTaken(name))
    return res.status(400).json({ message: 'Name already taken.' });

  bcrypt.genSalt(env.saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err)
        return res.sendStatus(500);

      // Store hash in your password DB.
      const newUser = addUser(name, hash);

      req.body.newUser = newUser;
      next();
    });
  });
}