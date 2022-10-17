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
      rating: 'book__rating__fill'
    },
    filters: {
      filters: '.filters',
      input: '.filters input',
    }

  };

  const templates = {
    bookTemplates: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  class BookList{
    constructor(){
      const thisBook = this; 
      thisBook.favoriteBooks = [];
      thisBook.filters = [];

      thisBook.initData();
      thisBook.render();
      thisBook.getElements();
      thisBook.initActions();
    }

    initData(){
      const thisBook = this;
      thisBook.data = dataSource.books;
    }
    render(){
      const thisBook = this;

      for(const book of thisBook.data){
       
        book.ratingBgc = thisBook.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.bookTemplates(book);

        const bookHtml = utils.createDOMFromHTML(generatedHTML);
       
        const bookList = document.querySelector(select.containerOf.book);

        bookList.appendChild(bookHtml);
      }
    }
    getElements(){
      const thisBook = this;

      thisBook.dom = {
        books: document.querySelector(select.containerOf.book),
        filterForm: document.querySelector(select.filters.filters),
        image: document.querySelectorAll(select.book.image),
        filterInput: document.querySelector(select.filters.input),
      };
    }

    initActions(){
      const thisBook = this;

      thisBook.dom.books.addEventListener('dblclick', function(event){
        if(event.target.offsetParent.classList.contains('book__image')){
          event.preventDefault();
          const bookAttribute = event.target.offsetParent.getAttribute('data-id');
          if (!thisBook.favoriteBooks.includes(bookAttribute)){
            event.target.offsetParent.classList.add('favorite');
            thisBook.favoriteBooks.push(bookAttribute);
          } else {
            event.target.offsetParent.classList.remove('favorite');
            thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(bookAttribute), 1);
          }
        }

      });
      
      
      thisBook.dom.filterForm.addEventListener('click', function(event){
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value);
          if(event.target.checked == true){
            thisBook.filters.push(event.target.value);
          } else {
            const index = thisBook.favoriteBooks.indexOf(event.target.value);
            thisBook.filters.splice(index, 1);
          }
          console.log(thisBook.filters);
        }
        thisBook.filterFunction();
      });    
    }
  

    filterFunction(){
      const thisBook = this;
      for(const book of thisBook.data){
        let shouldBeHidden = false;
        for(const filter of thisBook.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');  
        if(shouldBeHidden == true){
          bookImage.classList.add('hidden');     
        } else {
          bookImage.classList.remove('hidden');
        }
      } 
    }
    
    determineRatingBgc(rating){
      const thisBook = this;
      
      thisBook.ratingBgc = '';
    
      if (rating < 6) {
        thisBook.ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      } else if (rating > 6 && rating <= 8) {
        thisBook.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      } else if (rating > 8 && rating <= 9) {
        thisBook.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      } else if (rating > 9) {
        thisBook.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }

      return thisBook.ratingBgc;
    }
  }
  
  const app = new BookList();
  console.log(app);
}
