// DATA STRUCTURES

function Library() {
    this.books = []
}

Library.prototype.addBook = function(newBook) {
    if (!this.isInLibrary(newBook.title)) {
        this.books.push(newBook);
    }
}

Library.prototype.removeBook = function(title) {
    this.books = this.books.filter((book) => book.title !== title);
}

Library.prototype.isInLibrary = function(title) {
    return this.books.some((book) => book.title === title);
}

Library.prototype.getBook = function(title) {
    return this.books.find((book) => book.title === title);
}

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
}

const myLibrary = new Library();

// const theHobbit = new Book("The Hobbit", "JRR Tolkien", 400, false);
// const shoeDog = new Book("Shoe Dog", "Phil Knight", 400, true);
// const sapiens = new Book("Sapiens", "Yuval Noah Harari", 512, false);
// const elonMusk = new Book("Elon Musk", "Ashlee Vance", 448, true);
// const randomWalk = new Book("A random walk down Wall Street", "Burton Malkiel", 480, true);
// myLibrary.addBook(theHobbit);
// myLibrary.addBook(shoeDog);
// myLibrary.addBook(sapiens);
// myLibrary.addBook(elonMusk);
// myLibrary.addBook(randomWalk);


// USER INTERFACE

const addBookButton = document.querySelector("#add-book-button");
const overlay = document.querySelector("#overlay");
const addBookModal = document.querySelector("#add-book-modal");
const addBookForm = document.querySelector("#add-book-form");
const bookGrid = document.querySelector(".library");

addBookButton.addEventListener("click", () => openModal());
overlay.addEventListener("click", () => closeModal());
addBookForm.addEventListener("submit", (e) => addBookToLibrary(e)); 


function openModal() {
    addBookForm.reset();
    overlay.classList.add('active');
    addBookModal.classList.add('active');
}

function closeModal() {
    overlay.classList.remove('active');
    addBookModal.classList.remove('active');
}

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead =  document.querySelector("#is-read").checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.addBook(newBook);
    saveLocal();
    updateBooks();
    closeModal();
}

function updateBooks() {
    resetBooks();
    for (let book in myLibrary.books) {
        createBookCard(myLibrary.books[book]);
    }
}

function resetBooks() {
    bookGrid.innerHTML = "";
}

function createBookCard(book) {
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;
    deleteButton.textContent = "Delete";
    if (book.isRead) {
        bookRead.textContent = "Read? ✅ ";
        readButton.textContent = "Unread";
    } else {
        bookRead.textContent = "Read? ❌ ";
        readButton.textContent = "Read";
    }

    bookCard.classList.add("book");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    bookRead.classList.add("book-read");
    readButton.classList.add("read-button");
    deleteButton.classList.add("delete-button");

    readButton.addEventListener("click", (e) => toggleRead(e));
    deleteButton.addEventListener("click", (e) => removeBookFromLibrary(e));

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(readButton);
    bookCard.appendChild(deleteButton);

    bookGrid.appendChild(bookCard);
}

function toggleRead(e) {
    const title = e.target.parentNode.firstChild.textContent;
    const book = myLibrary.getBook(title);
    book.isRead = !book.isRead;
    saveLocal();
    updateBooks();
}

function removeBookFromLibrary(e) {
    const title = e.target.parentNode.firstChild.textContent;
    myLibrary.removeBook(title);
    saveLocal();
    updateBooks();
}


// LOCAL STORAGE

function saveLocal() {
    localStorage.setItem("library", JSON.stringify(myLibrary.books))
    console.log(myLibrary.books);
}

function JSONToBook(book) {
    return new Book(book.title, book.author, book.pages, book.isRead);
}

function restoreLocal() {
    const books = JSON.parse(localStorage.getItem("library"));
    myLibrary.books = books.map((book) => JSONToBook(book)) || []
    console.log(myLibrary.books);
}


// ON RELOAD

restoreLocal();
updateBooks();