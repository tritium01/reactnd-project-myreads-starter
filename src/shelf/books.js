import React, {Component} from 'react'
import * as BooksAPI from "../utils/BooksAPI";


class BookList extends Component{

    eventCatcher = (event, book)=> {

        this.props.bookDistro(event, book);
    };


    render() {
            const {books} = this.props;
        return (
                <div>
                    <ol className="books-grid">
                    {(books.error === "empty query")? null : books.map((book) => (
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