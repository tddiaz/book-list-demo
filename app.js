class Book {
  constructor(id, title, author, isbn) {
    this.id = id
    this.title = title,
    this.author = author,
    this.isbn = isbn
  }
}

class BookList {
  static books = [];
  
  static addBook(book) {
    this.books.push(book);
  }

  static getLastBook() {
    return this.books[this.books.length - 1];
  }

  static deleteBook(bookId) {
    this.books.splice(bookId - 1 , 1);
    console.log(this.books);
  }
}


// EVENT listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const result = addBook();
  if (result === 'success') {
    showRecentlyAddedBook();
  }
});

document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.className === 'delete') {

    const row = e.target.parentElement.parentElement;
    console.log(row);
    const bookId = row.firstElementChild.textContent;
    console.log(bookId);
    
    row.remove();
    BookList.deleteBook(bookId);
  }
  
});




function addBook() {
  const title =  document.getElementById('title').value;
  const author =  document.getElementById('author').value;
  const isbn =  document.getElementById('isbn').value;

  if (title === '' || author === '' || isbn === '') {
    showAlert('Please fill in all fields', 'error');
    return 'error';
  } else {
    BookList.addBook(new Book(
      id = BookList.books.length + 1, 
      title, 
      author, 
      isbn
    ));
  
    clearInputFields();
    showAlert('Book successfully added', 'success');
    return 'success';
  }
}

function showAlert(message, className) {
  // create div
  const div = document.createElement('div');
  // add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.getElementById('book-form');

  container.insertBefore(div, form);

  // clear after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

function showRecentlyAddedBook() {

  const tBody = document.getElementById('book-list');
  const recentBook = BookList.getLastBook();

  if (recentBook === undefined) {
    return;
  }

  // row
  const row = document.createElement('tr');

  // insert column
  row.innerHTML = `
    <td style="display:none;" id='book-id'>${recentBook.id}</td>
    <td>${recentBook.title}</td>
    <td>${recentBook.author}</td>
    <td>${recentBook.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  tBody.appendChild(row);

}

function clearInputFields() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


