import express from 'express';
import bodyParser from 'body-parser';
import { authenticateTokenMiddleware } from './middlewares/authenticate.middleware';
import { registerMiddleware } from './middlewares/register.middleware';
import { authorizeTokenMiddleware } from './middlewares/authorize.middleware';

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.post('/register', registerMiddleware, (req, res) => {
  const { newUser } = req.body;

  res.json({ message: 'Register successful', newUser });
});

// API endpoint that requires authorization
app.get('/protected', authorizeTokenMiddleware, (req: any, res: any) => {
  // If passed `authorizeTokenMiddleware`,
  // Access granted, return protected data
  res.json({ message: 'Access granted!', user: req.user });
});

app.post('/login', authenticateTokenMiddleware, (req, res) => {
  const { token } = req.body;

  // Authentication succedded, return token
  res.json({ message: 'Login successful', token });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});