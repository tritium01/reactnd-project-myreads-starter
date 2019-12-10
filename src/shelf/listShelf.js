import React, {Component} from 'react'
import {Link} from "react-router-dom";
import BookList from "./books";
import * as BooksAPI from "../utils/BooksAPI";


class ShelfList extends Component {
    state = {
        books: []
    };
    componentDidMount() {
        BooksAPI.getAll()
            .then((books)=>{
                this.setState(()=>({
                    books
                }))
            })
    }

    bookDistro = (shelf, book)=> {

        if(shelf === "read"){
            if(book.id )
            this.setState((currState) =>({
                books:  currState.books.concat([book])
            }));
            BooksAPI.search(book.id, 'read')

        }

        if (shelf === "none"){
            console.log(book.id);
            this.setState((currState)=>({
                books: currState.books.filter(function(currState) {return currState.id !== book.id})
            }))
        }


    };

    render() {

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
                        <BookList
                        books={this.state.books}
                        bookDistro={this.bookDistro}
                        />
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