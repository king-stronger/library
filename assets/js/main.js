const myLibrary = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        synopsis: "A young boy discovers he's a wizard on his eleventh birthday and attends Hogwarts School of Witchcraft and Wizardry, where he uncovers the truth about his parents' mysterious death.",
        author: "J.K. Rowling",
        pages: 223,
        read: true
    },
    {
        title: "The Hobbit",
        synopsis: "Bilbo Baggins, a hobbit, is swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug.",
        author: "J.R.R. Tolkien",
        pages: 310,
        read: true
    },
    {
        title: "To Kill a Mockingbird",
        synopsis: "In the racially charged Depression-era South, young Scout Finch and her brother, Jem, learn about empathy and justice from their father, Atticus Finch, as he defends a black man accused of raping a white woman.",
        author: "Harper Lee",
        pages: 281,
        read: false
    },
    {
        title: "1984",
        synopsis: "In a dystopian future, Winston Smith lives under the oppressive rule of the Party and its leader, Big Brother. As Winston grapples with his own thoughts and seeks truth, he risks everything for freedom.",
        author: "George Orwell",
        pages: 328,
        read: false
    },
    {
        title: "Pride and Prejudice",
        synopsis: "Elizabeth Bennet navigates the complexities of society and family expectations in 19th-century England, while overcoming her prejudices and misunderstandings with the aloof but wealthy Mr. Darcy.",
        author: "Jane Austen",
        pages: 279,
        read: false
    },
    {
        title: "The Great Gatsby",
        synopsis: "In the Roaring Twenties, Nick Carraway moves to Long Island and becomes entangled in the life of his mysterious neighbor, Jay Gatsby, whose obsession with the beautiful Daisy Buchanan leads to tragedy.",
        author: "F. Scott Fitzgerald",
        pages: 180,
        read: true
    }    
];

const libraryBox = document.querySelector(".library-box");
const addBookButton = document.querySelector(".add-book");
const showModal = document.querySelector(".show-modal");
const modal = document.querySelector(".modal");

let readBookButton, removeBookButton;


/********* Event Listeners *******/

addBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
    
    let title = document.getElementById("title").value;
    let synopsis = document.getElementById("synopsis").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;
    
    const book = new Book(title, synopsis, author, pages, read);

    addBooktoLibrary(book);
    displayBook();
});

showModal.addEventListener("click", () => {
    modal.showModal();
});

/********* Object Constructors *******/

function Book(title, synopsis, author, pages, read = false){
    this.title = title;
    this.synopsis = synopsis;
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


function createBooks(){
    let books = [];

    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement("article");
        bookElement.classList.add("book");
        bookElement.setAttribute("data-id", index);
        bookElement.setAttribute("data-read", book.read);

        let generateImage = Math.floor(Math.random() * 3) + 1;

        bookElement.innerHTML = `
                        <div class="img-container">
                            <img src="assets/img/default${generateImage}.jpg" alt="${book.title} class="book-image">
                        </div>
                        <div class="flow">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-synopsis">${book.synopsis}</p>
                            <div class="book-author">${book.author}</div>
                            <div class="flex">
                                <div class="book-status">Status : ${book.read ? 'Read' : 'Unread'}</div>                        
                                <div class="book-pages">${book.pages} pages</div>
                            </div>
                        </div>
                        <div class="book-options">
                            <button class="button read-book ${book.read ? 'unread-button' : 'read-button'}">${book.read ? 'Unread' : 'Read'}</button>
                            <button class="button remove-button">Remove</button>
                        </div>
                    `;

        books.push(bookElement);
    });

    return books;
}

function displayBook(){
    libraryBox.innerHTML = "";

    let books = createBooks();
    
    books.forEach(book => {
        libraryBox.appendChild(book);
    });

    readBookButton = document.querySelectorAll(".read-book");
    removeBookButton = document.querySelectorAll(".remove-button");


    removeBookButton.forEach(button => {
        button.addEventListener("click",  () => {
            let book_id = parseInt(button.closest('.book').getAttribute("data-id"));

            myLibrary.splice(book_id, 1);

            displayBook();
        });
    });

    readBookButton.forEach(button => {
        button.addEventListener("click", () => {
            let book = button.closest('.book');
            let bookRead = book.getAttribute("data-read");
            let bookIndex = book.getAttribute("data-id");

            if (bookRead == "true") {
                myLibrary[bookIndex].read = false; 
                book.setAttribute("data-read", false);
            } else {
                myLibrary[bookIndex].read = true; 
                book.setAttribute("data-read", true);
            }

            displayBook();
        });
    });
}

displayBook();
