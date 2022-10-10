{
  'use strict';

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      book: '.books-list',
    },
  };

  const render = function() {
    
    const bookTemplates = {
      books: Handlebars.compile(
        document.querySelector(select.templateOf.bookProduct).innerHTML
      ),
    };

    for(let book of dataSource.books){
       
      const generatedHTML = bookTemplates.books(book);

      const bookHtml = utils.createDOMFromHTML(generatedHTML);
       
      const bookList = document.querySelector(select.containerOf.book);
       
      bookList.appendChild(bookHtml);
    }
  };
 
  render();
}