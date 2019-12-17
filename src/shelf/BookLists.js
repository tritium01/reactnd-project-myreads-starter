import React, {Component} from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import  * as _ from 'underscore'
class BookList extends Component {
    state = {

        currentlyReading: [],
        wantToRead: [],
        read: []
    };


    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.sortingHat(books)
            })
    }


    sortingHat = (books)=> {
        console.log('SortingHat Books', books)
        books.map((book)=>{
            const shelf = book.shelf;
            if(this.shelfChecker(shelf, book) === false) {
                this.setState((currState) => ({
                    [`${shelf}`]: currState[shelf].concat(book.id)
                }))
            }

        })
    };

    eventCatcher = (event, book) => {
        console.log("Book Format", book)
        BooksAPI.update(book, event)
        .then(answer=>(
            this.setState(()=>({
                currentlyReading: answer.currentlyReading,
                read: answer.read,
                wantToRead: answer.wantToRead
            }))

        ))
        if(event !== "none"){
            //this.props.update(book)
        }else if(event === "none"){
            this.props.bookRemover(book)
        }


    };



    shelfChecker = (event, book)=> {
        const shelf = this.state[event];
        const answer =shelf.includes(book.id);
        return !!answer;
    };




    render() {
        //const {books} = this.state;
        const {bookSearch, query, shelf, books} = this.props;

        return(

            <div>
                <ol className="books-grid">
                    {((query !== undefined) ? bookSearch : books.filter((c)=>{
                        return c.shelf === shelf
                    })).map((book) => (
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
                                        <select value={book.shelf} onChange={(event) => this.eventCatcher(event.target.value, book)}>
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