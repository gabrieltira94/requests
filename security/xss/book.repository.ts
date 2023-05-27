const BookDB = [
  {
    name: 'Amazing story',
    price: 89,
    stock: 99
  },
  {
    name: 'Learn to learn quick',
    price: 30,
    stock: 35
  },
  {
    name: 'French in 30 days',
    price: 17,
    stock: 51
  }
];

export function getBook(bookName: string) {
  return BookDB.find(book => book.name === bookName);
}