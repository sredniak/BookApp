{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',

        },
        containerOf: {
            bookList: '.books-panel .books-list',
            bookImage: '.book__image',
            bookFilter: '.filters',
        },
    };

    const templates = {
        bookLink: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };

    class BooksList {
        constructor() {
            const thisBooksList = this;
            thisBooksList.render();
            thisBooksList.determineRatingBgc();
            thisBooksList.initAction();

        }





        render() {
            const thisBooksList = this;
            for (let bookId in dataSource.books) {
                bookId = dataSource.books[bookId];
                const generatedHTML = templates.bookLink({
                    name: bookId.name,
                    price: bookId.price,
                    image: bookId.image,
                    rating: bookId.rating,
                    id: bookId.id,
                    ratingBgc: thisBooksList.determineRatingBgc(bookId.rating),
                    ratingWidth: bookId.rating * 10,

                });


                const listOfBook = document.querySelector(select.containerOf.bookList);

                const elem = utils.createDOMFromHTML(generatedHTML);

                listOfBook.appendChild(elem);
            }

        }



        initAction() {
            const thisBooksList = this;
            const favoriteBooks = [];
            const listOfBook = document.querySelector(select.containerOf.bookList);
            listOfBook.addEventListener('dblclick', function (event) {
                event.preventDefault();
                if (event.target.offsetParent.classList.contains('book__image')) {
                    const link = event.target.offsetParent;
                    const bookId = link.getAttribute('data-id');
                    if (favoriteBooks.includes(bookId)) {
                        const bookIndex = favoriteBooks.indexOf(bookId);
                        link.classList.remove('favorite');
                        favoriteBooks.splice(bookIndex, 1);

                    } else {
                        link.classList.add('favorite');
                        favoriteBooks.push(bookId);
                    }
                }

            });

            const booksFilter = document.querySelector(select.containerOf.bookFilter);

            console.log('booksFilter', booksFilter);

            booksFilter.addEventListener('click', function (callback) {
                const clickedElement = callback.target;
                thisBooksList.filters = [];

                if (
                    clickedElement.tagName == 'INPUT' &&
                    clickedElement.type == 'checkbox' &&
                    clickedElement.name == 'filter'
                ) {
                    console.log('clickedElement', clickedElement);

                    if (clickedElement.checked) {
                        thisBooksList.filters.push(clickedElement.value);
                    } else {
                        const indexOfValue = thisBooksList.filters.indexOf(
                            clickedElement.value
                        );
                        thisBooksList.filters.splice(indexOfValue, 1);
                    }
                }

                thisBooksList.filterBooks();
            });
        }

        filterBooks() {
            const thisBooksList = this;

            for (let book of dataSource.books) {
                let shouldBeHidden = false;
                const filterOfHiddenBooks = document.querySelector(
                    select.containerOf.bookImage + '[data-id = "' + book.id + '"]'
                );

                for (const filter of thisBooksList.filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }

                if (shouldBeHidden) {
                    filterOfHiddenBooks.classList.add('hidden');
                } else {
                    filterOfHiddenBooks.classList.remove('hidden');
                }
            }
        }

        determineRatingBgc(rating) {
            const thisBooksList = this;
            console.log(thisBooksList);
            let background = '';

            if (rating < 6) {
                background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
                background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
                background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if (rating > 9) {
                background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
            }

            return background;
        }


    }
    const app = new BooksList();
    console.log(app);
}