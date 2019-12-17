import React, {Component} from 'react'
import * as BooksAPI from '../utils/BooksAPI'
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

        BooksAPI.update(book, event)
        .then(answer=>(
            this.setState(()=>({
                currentlyReading: answer.currentlyReading,
                read: answer.read,
                wantToRead: answer.wantToRead
            }))

        ));

   this.componentChecker(event, book)


    };

    componentChecker = (event, book) => {
        if (event !== "none") {
            if (this.props.query !== undefined) {
                return null
            } else {
                this.props.update(book, event)
            }
        } else if(event === "none") {
            if (this.props.query !== undefined) {
                return null
            } else {
                this.props.bookRemover(book)
            }
        }
    };

    shelfChecker = (event, book)=> {
        const shelf = this.state[event];
        const answer =shelf.includes(book.id);
        return !!answer;
    };

    shelfFinder = (book)=> {
        const id = book.id;
        const shelf = this.state;
       const entries = Object.entries(shelf);
       for (const key of entries) {
           if (key[1].includes(id)) {
               return key[0]
           }
       }
       return 'none'

    };


    render() {
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
                                        <select value={this.shelfFinder(book)} onChange={(event) => this.eventCatcher(event.target.value, book)}>
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