import React, {Component} from 'react'
import {Link} from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookList from "./BookLists";


class ShelfList extends Component{


/*    bookDistro = (shelf, book)=> {

        if(shelf === "read"){

            this.setState((currState) =>({
                books:  currState.books.concat([book])
            }));
            console.log(book);
            BooksAPI.update(book, 'read')
                .then(answer => (
                    this.setState(()=>({
                        read: answer.read
                    }))
                ))
        }

        if (shelf === "none"){
            console.log(book.id);
            this.setState((currState)=>({
                books: currState.books.filter(function(currState) {return currState.id !== book.id})
            }))
        }


    };*/

    template = (name, shelf) => (

    <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                <BookList
                template={this.template}
                />
            </ol>
        </div>
    </div>

);
    render() {

        console.log('Global State', this.state);
        return (
            <div>
                {this.template("Currently Reading")}
                {this.template("Want to Read")}
                {this.template("Read")}
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