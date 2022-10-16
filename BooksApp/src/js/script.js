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
    book: {
      image: '.books-list .book__image',
    },
    filters: {
      filters: '.filters',
    }

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
  

  const filters = [];
  const filtersValue = document.querySelector(select.filters.filters);

  const initActions = function(){
    const favoriteBooks = [];
    const allBooks = document.querySelectorAll(select.containerOf.book);
    
    for(const book of allBooks){
      book.addEventListener('click', function(event){
        if(event.target.offsetParent.classList.contains('.book__image')){
          event.preventDefault();
          const bookAtribute = book.getAttribute('data-id');       
          
          if(!favoriteBooks.includes(bookAtribute)){
            book.classList.add('favorite');
            favoriteBooks.push(bookAtribute);
          } else {
            book.classList.remove('favorite');
            const index = favoriteBooks.indexOf(bookAtribute);
            favoriteBooks.splice(index, 1);
          }
          console.log(book, favoriteBooks);
        }
      });
    }

    filtersValue.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value);
        if(event.target.checked){
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
        console.log(filters);
      }
      filterFunction();

    });    
  };

  const filterFunction = function(){
    for(const book of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }  
      if(shouldBeHidden){
        document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');     
      } else {
        document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
      }
    } 
  };
  initActions();

}