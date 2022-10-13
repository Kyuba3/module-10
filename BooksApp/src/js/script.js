{
  'use strict';

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      book: '.books-list',
      bookLink: '.book__image',
    },
  };

  const templates = {
    bookTemplates: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  const render = function() {

    for(let book of dataSource.books){
       
      const generatedHTML = templates.bookTemplates(book);

      const bookHtml = utils.createDOMFromHTML(generatedHTML);
       
      const bookList = document.querySelector(select.containerOf.book);
       
      bookList.appendChild(bookHtml);
    }
  };
 
  render();
  
  const favoriteBooks = [];

  const initActions = function(){

    const allBooks = document.querySelectorAll(select.containerOf.bookLink);
    console.log(allBooks);
    for(let bookId in allBooks){
      const book = allBooks[bookId];
      console.log(book);
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        book.classList.add('favorite');
        let bookAtribute = book.getElementById('data-id');
        favoriteBooks.push(bookAtribute);
      });
    }

    
  };

  initActions();

}