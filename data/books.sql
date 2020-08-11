CREATE TABLE IF NOT EXISTS
books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(500) NOT NULL,
  isbn VARCHAR(100) UNIQUE NOT NULL,
  image_url VARCHAR(1000) NOT NULL,
  description TEXT NOT NULL,
  bookshelf VARCHAR(20)
);