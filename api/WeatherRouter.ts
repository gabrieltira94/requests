import express from 'express';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const weatherRouter = express.Router();

const weatherData = [{
  city: 'New York',
  temperature: 28,
  description: 'Sunny',
}];

/**
 * If we go to http://localhost:3000/weather, we will get the following object in page:
  {
    "city": "New York",
    "temperature": 25,
    "description": "Sunny"
  }
 */


weatherRouter.get('/weather', function (req, res) {
  res.json(weatherData);
});

/**
 * Send this request to include another city:
 * 
  curl --location 'http://localhost:3000/weather' \
  --header 'Content-Type: application/json' \
  --data '{
    "city": "London",
    "temperature": 19,
    "description": "Rainy"
  }'
 */
weatherRouter.post('/weather', jsonParser, function (req, res) {
  console.log(req.body);
  weatherData.push(req.body);

  res.json(`${req.body.city} added!`);
});

export default weatherRouter;
