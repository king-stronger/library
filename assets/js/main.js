const myLibrary = [];

const libraryBox = document.querySelector(".libraryBox");
const addBookButton = document.querySelector(".add-book-button");
const readBookButton = document.querySelectorAll(".read-book-button");
const removeBookButton = document.querySelectorAll(".remove-book-button");


/********* Event Listeners *******/

addBookButton.addEventListener("click", (event) => {
    event.preventDefault();

    let title = document.getElementById("#title").value;
    let sypnosis = document.getElementById("#sypnosis").value;
    let author = document.getElementById("#author").value;
    let pages = document.getElementById("#pages").value;
    let read = document.getElementById("#read").value;

    const book = new Book(title, sypnosis, author, pages, read);

    addBooktoLibrary(book);
});

removeBookButton.forEach(button => {
    button.addEventListener("click",  () => {
        let book_id = parseInt(button.closest('.book').getAttribute("data-id"));

        myLibrary.splice(book_id, 1);

        displayBook();
    });
})

readBookButton.forEach(button => {
    button.addEventListener("click", () => {
        let book = button.closest('.book');
        let bookRead = book.getAttribute("data-read");
        let bookIndex = book.getAttribute("data-index");

        if(bookRead === false){
            myLibrary[bookIndex].read = true; 
            book.setAttribute("data-read", true);
        } else {
            myLibrary[bookIndex].read = false; 
            book.setAttribute("data-read", false);
        }
    });
})


/********* Object Constructors *******/

function Book(title, sypnosis, author, pages, read = false){
    this.title = title;
    this.sypnosis = sypnosis;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
}


/********* Functions *******/

function addBooktoLibrary(book){
    myLibrary.push(book);
}


function displayBook(){
    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement("article");
        bookElement.classList.add("book");
        bookElement.setAttribute("data-id", index);
        bookElement.setAttribute("data-read", book.read);

        bookElement.innerHTML = `
                        <div class="img-container>
                            <img src="" alt="${book.title} class="book-image">
                        </div>
                        <div>
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-sypnosis">${book.sypnosis}</p>
                            <span class="book-author">${book.author}</span>
                            <span class="book-pages">${book.pages} pages</span>
                            <button class="button">Remove</button>
                        </div>
                    `;

        libraryBox.append(bookElement);
    });
}