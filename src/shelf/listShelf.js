import React, {Component} from 'react'
import BookSearch from "../Search/search";
import {Link} from "react-router-dom";


class ShelfList extends Component {
    state={

    }

    render() {
        const {read} = this.props;
        console.log('Read State', read)
        return(
        <div>

            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    </ol>
                </div>
            </div>
            <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">

                </ol>
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {read.map((book)=>(
                            book.map((book)=>(
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
                            ))
                        ))}
                    </ol>
                </div>
            </div>
            <div className="open-search">
                <Link
                to="/Search"
                ><button className="open-search">
                    Add a Book
                </button></Link>
            </div>
        </div>

        )
    }

}

export default ShelfList