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
    for(let book of allBooks){
      book.addEventListener('dblclick', function(event){
        event.preventDefault();

        let bookAtribute = book.getAttribute('data-id');
        if(favoriteBooks.includes(bookAtribute)){
          const index = favoriteBooks.indexOf(bookAtribute);
          favoriteBooks.splice(index, 1);
          book.classList.remove('favorite');
        } else {
          favoriteBooks.push(bookAtribute);
          book.classList.add('favorite');
        }
      });
    }

    
  };

  initActions();

}