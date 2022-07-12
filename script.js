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


const theHobbit = new Book("The Hobbit", "JRR Tolkien", 400, false);
const shoeDog = new Book("Shoe Dog", "Phil Knight", 400, true);
const sapiens = new Book("Sapiens", "Yuval Noah Harari", 512, false);
const elonMusk = new Book("Elon Musk", "Ashlee Vance", 448, true);
const randomWalk = new Book("A random walk down Wall Street", "Burton Malkiel", 480, true);

const myLibrary = new Library();

myLibrary.addBook(theHobbit);
myLibrary.addBook(shoeDog);
myLibrary.addBook(sapiens);
myLibrary.addBook(elonMusk);
myLibrary.addBook(randomWalk);

console.log(myLibrary.books);



// USER INTERFACE

const bookGrid = document.querySelector(".library");

const addBookForm = document.querySelector("#add-book-form");
const addBookButton = document.querySelector("#add-book-button");
const overlay = document.querySelector("#overlay");
const addBookModal = document.querySelector("#add-book-modal");
const submitButton = document.querySelector("#submit-button");



function openModal() {
    overlay.classList.add('active');
    addBookModal.classList.add('active');
}

function closeModal() {
    overlay.classList.remove('active');
    addBookModal.classList.remove('active');
}

function addBookToLibrary() {

    console.log("test")

    const title = document.querySelector("#add-book-form#title").value;
    const author = document.querySelector("#add-book-form#author").value;
    const pages = document.querySelector("#add-book-form#pages").value;
    const isRead =  document.querySelector("#add-book-form#is-read").checked;

    // console.log(title);
    // console.log(author);
    // console.log(pages);
    // console.log(isRead);

    const newBook = new Book(title, author, pages, isRead);

    // Error message when book is already in Library

    myLibrary.addBook(newBook);

    
    

    closeModal()
}

function displayBooks() {

    console.log(myLibrary.books);

    for (let book in myLibrary.books) {
        createBookCard(myLibrary.books[book]);
        // console.log(myLibrary.books[book]);
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
    resetBooks();
    displayBooks();
}

function removeBookFromLibrary(e) {
    const title = e.target.parentNode.firstChild.textContent;
    myLibrary.removeBook(title);
    resetBooks();
    displayBooks();
}


displayBooks();

addBookButton.addEventListener("click", () => openModal());
overlay.addEventListener("click", () => closeModal());
submitButton.addEventListener("submit", () => addBookToLibrary());



// LOCAL STORAGE