import express from 'express';
import sanitizeHtml from 'sanitize-html';
import bodyParser from 'body-parser';

import { getBook } from './book.repository';

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/search', (req, res) => {
  const bookName = req.body.book;

  // Sanitize the query parameter
  const sanitizedBookName = sanitizeHtml(bookName);

  // Perform search with the sanitized query
  const book = getBook(sanitizedBookName);

  if (!book)
    return res.status(404).json({ message: `Book not found` });

  return res.json({ message: 'Here is your book!', book });
});


// To see sanitization in action, send a GET request to /search with this body: 
// { "book": "<script>console.log('whats here');</script>Something" } 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});