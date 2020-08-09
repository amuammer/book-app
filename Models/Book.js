function Book(book) {
  this.title = book && book.volumeInfo && book.volumeInfo.title || "Title Unknown";
  this.author = book && book.volumeInfo && book.volumeInfo.authors || "Author Unknown";
  this.image_url = book && book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail || "https://i.imgur.com/J5LVHEL.jpeg";
  this.description = book && book.volumeInfo && book.volumeInfo.description || "Description Unknown";
}

exports.default = Book;
