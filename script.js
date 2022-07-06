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

function Book(title, author, pages = undefined, isRead = false) {
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


// LOCAL STORAGE