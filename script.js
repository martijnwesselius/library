// DATA STRUCTURES

function Library() {
    this.books = []
}

Library.prototype.addBook = function(newBook) {
    if (!this.isInLibrary(newBook.title)) {
        this.books.push(newBook);
    }
}

Library.prototype.removeBook =function(title) {
    if (this.isInLibrary(title)) {
        this.books.filter((book) => book.title !== title);
    }
}

Library.prototype.isInLibrary = function(title) {
    return this.books.some((book) => book.title === title);
}

Library.prototype.getBook = function(title) {
    return this.books.find((book) => book.title === title);
}

function Book(title, author, pages = undefined, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
}


const theHobbit = new Book("The Hobbit", "JRR Tolkien", 400, false);
const shoeDog = new Book("Shoe Dog", "Phil Knight", 400, true);
const sapiens = new Book("Sapiens", "Yuval Noah Harari", 512, false);
const elonMusk = new Book("Elon Mus", "Ashlee Vance", 448, true);
const randomWalk = new Book("A random walk down Wall Street", "Burton Malkiel", 480, true);

const myLibrary = new Library();
myLibrary.addBook(theHobbit);
myLibrary.addBook(shoeDog);
myLibrary.addBook(sapiens);
myLibrary.addBook(elonMusk);
myLibrary.addBook(randomWalk);

console.log(myLibrary.books);



// USER INTERFACE

const addBookButton = document.querySelector("#add-book-button");
const overlay = document.querySelector("#overlay");
const addBookModal = document.querySelector("#add-book-modal");
const readButton = document.querySelector(".read-button");
const deleteButton = document.querySelector(".delete-button");



function openModal() {
    overlay.classList.add('active')
    addBookModal.classList.add('active')
}

function closeModal() {
    overlay.classList.remove('active')
    addBookModal.classList.remove('active')
}

addBookButton.addEventListener("click", () => openModal());
overlay.addEventListener("click", () => closeModal());
// addBookForm.addEventListener("submit", addBook);



// LOCAL STORAGE