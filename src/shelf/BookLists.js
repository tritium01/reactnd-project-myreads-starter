import React, {Component} from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import  * as _ from 'underscore'
class BookList extends Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    componentDidMount() {
        this.getAll()
    }

    getAll = ()=> {
        BooksAPI.getAll()
            .then((books)=>{
                this.setState(()=>({
                    books : books
                }));
                this.sortingHat(books)
            });
    };

    sortingHat = (books)=> {
        books.map((book)=>{
            const shelf = book.shelf;
                this.setState((currState)=>({
                    [`${shelf}`] : currState[shelf].concat(book.id)
                }))

        })
    };


    eventCatcher = (event, book) => {

       if(event === "none") {
            this.setState((currBooks) => ({
                books: currBooks.books.filter((c) => {
                    return c !== book
                })


            }))
        } else if(this.shelfChecker(event, book) === false) {
           BooksAPI.update(book, event)
               .then(answer => (

                   this.setState(() => ({
                       currentlyReading: answer.currentlyReading,
                       read: answer.read,
                       wantToRead: answer.wantToRead
                   }))


               ));
           this.test103()

       }

    };





    shelfChecker = (event, book)=> {
        const shelf = this.state[event];
        const answer =shelf.includes(book.id);
        return !!answer;
    };

    test101 = (shelf, book) => {
        console.log(book);
        const shelves = this.state[shelf];
        const answer =shelf.includes(book.id);

        if(answer){

        }


/*          if (book.id === shelves.includes(book.id)){
              console.log(book.id)
          }*/

    };

    test103 = () => {
        console.log('test103 is working');
        this.forceUpdate();
    };


    render() {
        const {books} = this.state;
        const {bookSearch, query, shelf} = this.props;
        const newBooks = books.filter((c)=>{
            return c.shelf === shelf
        });
        console.log(books);

        return(

            <div>
                <ol className="books-grid">
                    {((query !== undefined) ? bookSearch : newBooks).map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128, height: 193,
                                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                                        }}
                                    />
                                    <div className="book-shelf-changer">
                                        <select onChange={(event) => this.eventCatcher(event.target.value, book)}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{`${book.title}`}</div>
                                <div className="book-authors">{`${book.authors}`}</div>

                            </div>
                        </li>

                    ))}
                </ol>
            </div>
        )
    }
}
export default BookList