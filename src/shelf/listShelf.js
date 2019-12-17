import React, {Component} from 'react'
import {Link} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookList from "./BookLists";


class ShelfList extends Component{
    state= {
        books: [],
        updater: {}
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
    }

    bookRemover = (book)=>{
        this.setState((currBooks)=>({
            books: currBooks.books.filter((c)=>{
                return c  !== book
            })

        }))
    }

    test102 = (book)=> {
        const books = this.state.books
        const newBooks = books.filter((b)=>{
            return b.id !== book.id
        })
        const finalBooks = newBooks.push(book)
        console.log('test103', book)
        console.log('test104', books[book.id])
        console.log('test105', newBooks)
 /*       this.setState(()=>({
            books: finalBooks
        }))*/
    }


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
        console.log(this.state.books);
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