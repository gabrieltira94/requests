import express from 'express';
import cors from 'cors';
import weatherRouter from './WeatherRouter';

const app = express();

/**
 * Now we can acces these endpoints only from our localhost domain

 * To prove it, go to google.com, open the Console and run:
 * fetch("http://localhost:3000/weather").then(req => req.text()).then(console.log) 
 */
app.use(cors({
  origin: 'http://localhost:3000'
}));

/**
 * Exposes 2 APIs:
 * 1. GET /weather -> returns JSON of available cities
 * 2. POST /weather -> adds another city to initial array
 */
app.use(weatherRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
