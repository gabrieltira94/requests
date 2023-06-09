import express from 'express';
import bodyParser from 'body-parser';
import { authenticateTokenMiddleware } from './middlewares/authenticate.middleware';
import { authorizeTokenMiddleware } from './middlewares/authorize.middleware';

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);

// API endpoint that requires authorization
app.get('/protected', authorizeTokenMiddleware, (req: any, res: any) => {
  // If passed `authorizeTokenMiddleware`,
  // Access granted, return protected data
  res.json({ message: 'Access granted!', user: req.user });
});

// API endpoint for generating a token
app.post('/login', authenticateTokenMiddleware, (req: any, res: any) => {
  const { token } = req.body;

  res.json({ token });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});