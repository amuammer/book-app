const client = global.DBclient;

function Book(book) {
  this.id = book.id || "undefined";
  this.title = book && book.volumeInfo && book.volumeInfo.title || book.title || "Title Unknown";
  this.author = book && book.volumeInfo && book.volumeInfo.authors || book.author || "Author Unknown";
  this.isbn = book && book.volumeInfo && book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0] && book.volumeInfo.industryIdentifiers[0].type + book.volumeInfo.industryIdentifiers[0].identifier || book.isbn || "ISBN Missing";
  this.image_url = book && book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail || book.image_url || "https://i.imgur.com/J5LVHEL.jpeg";
  this.description = book && book.volumeInfo && book.volumeInfo.description || book.description || "Description Unknown";
}

Book.find = function (){
  const SQL = "SELECT * FROM books";
  return client.query(SQL);
}

Book.findById = function (id){
  const SQL = "SELECT * FROM books where id=$1";
  return client.query(SQL, [id]);
}

Book.prototype.save = function (){
  const SQL = `INSERT INTO books(title, author, isbn, image_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
  return client.query(SQL, [this.title, this.author, this.isbn, this.image_url, this.description]);
}

Book.prototype.saveChanges = function (){
  const SQL = `UPDATE books set title=$1, author=$2, image_url=$3, description=$4 where id=$5`;
  return client.query(SQL, [this.title, this.author, this.image_url, this.description, this.id]);
}

Book.deleteById = function (id){
  const SQL = "DELETE FROM books WHERE id=$1";
  return client.query(SQL, [id]);
}


exports.default = Book;
