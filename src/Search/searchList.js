import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import * as _ from "underscore";
import BookList from "../shelf/books";

class SearchList extends Component{
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
                if(book.error === "empty query"){

                }
                this.setState(()=>({
                    bookSearch: book
                }))
            })

    };


    handleInputThrottle = _.throttle((q)=>this.updateQuery(q), 1000);
    render() {
        console.log("Book Search",this.state.bookSearch);
        const {eventCatcher} = this.props;
        return (
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

                <BookList
                books={this.state.bookSearch}
                eventCatcher={eventCatcher}
                />

                </div>
            </div>
        );
    }
}

export default SearchList