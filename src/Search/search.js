import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as _ from 'underscore';
import * as BooksAPI from '../utils/BooksAPI'

class BookSearch extends Component {
    state={
        query: '',
        bookSearch: []
    };

    updateQuery = (query)=>{
        this.setState(()=>({
            query: query.trim()
        }));

        if(query.trim() !== '') {
            this.displayBooks(query)
        } else {
            this.setState(()=>({
                bookSearch: []
        }))
        }
    };

    displayBooks = (query)=> {
        BooksAPI.search(query)
            .then((book)=>{
                this.setState(()=>({
                    bookSearch: book
                }))
            })
            .catch(err => alert(err))
    };
    eventCatcher = (event, book)=> {
        if(event === "read"){
            this.props.bookDistro(book);
        }
    };

    handleInputThrottle = _.throttle((q)=>this.updateQuery(q), 1000);
render() {
    const {query, bookSearch} = this.state;



    return(
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search"
                >Close
                </Link>

                <div className="search-books-input-wrapper">
                    <input onChange={(event)=>this.handleInputThrottle(event.target.value)} type="text" placeholder="Search by title or author"/>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {bookSearch.map((book)=>(
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div
                                    className="book-cover"
                                    style={{
                                        width:128, height: 193,
                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                                    }}
                                />
                                <div className="book-shelf-changer" >
                                    <select onChange={(event)=> this.eventCatcher(event.target.value, book)}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{`${book.title}`}</div>
                            <div className="book-authors">{book.authors}</div>

                        </div>
                        </li>
                        ))}
{/*                    <li>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                                <div className="book-shelf-changer">
                                    <select>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">To Kill a Mockingbird</div>
                            <div className="book-authors">Harper Lee</div>
                        </div>
                    </li>*/}
                </ol>
            </div>
        </div>
    )
}
}

export default BookSearch