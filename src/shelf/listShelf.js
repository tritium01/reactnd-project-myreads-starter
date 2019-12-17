import React, {Component} from 'react'
import {Link} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookList from "./BookLists";


class ShelfList extends Component{
    state= {
        books: [],

    };

    componentDidMount() {
        this.getAll()
    };

    getAll = ()=>{
        BooksAPI.getAll()
            .then((books)=>{
                books.map((book)=>{
                    this.setState((currBook) =>({
                        books: currBook.books.concat(book)
                    }));

                })
            });
    };

    bookRemover = (book)=>{
        this.setState((currBooks)=>({
            books: currBooks.books.filter((c)=>{
                return c  !== book
            })

        }))
    };

    test102 = (book, event)=> {
        const books = this.state.books;
        const bookCopy = JSON.parse(JSON.stringify(books));
        const onlyBook = bookCopy.filter(b=> {return b.title === book.title});
        onlyBook[0].shelf = event;
        this.setState(()=>({
            books: bookCopy
        }))
    };


    template = (name, shelf) => (

    <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                <BookList
                    shelf={shelf}
                    books={this.state.books}
                    bookRemover={this.bookRemover}
                    update={this.test102}
                />
            </ol>
        </div>
    </div>

);
    render() {
        return (
            <div>
                {this.template("Currently Reading", 'currentlyReading')}
                {this.template("Want to Read", 'wantToRead')}
                {this.template("Read", 'read')}

                <div className="open-search">
                    <Link
                        to="/Search"
                    >
                        <button className="open-search">
                            Add a Book
                        </button>
                    </Link>
                </div>
            </div>

        )
    }
}

export default ShelfList