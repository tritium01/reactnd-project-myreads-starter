import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import * as _ from "underscore";
import BookList from "../shelf/BookLists";

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
                console.log(book)
                if(book.error !== "empty query"){
                    this.setState(()=>({
                        bookSearch: book
                    }))
                } else {
                    this.setState(()=>({
                        bookSearch: []
                    }))
                }

            })

    };


    handleInputThrottle = _.throttle((q)=>this.updateQuery(q), 1000);
    render() {

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
                bookSearch={this.state.bookSearch}
                query={this.state.query}
                />

                </div>
            </div>
        );
    }
}

export default SearchList