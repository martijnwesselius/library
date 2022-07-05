function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let result = `${title} by ${author}, ${pages} pages, `;
    if(read) {
        result += "read"
    } else {
        result += "not read yet"
    }
    return result;
}

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, false);
theHobbit.info();