import React, {Component} from 'react'
import {Link} from "react-router-dom";

import BookList from "./BookLists";


class ShelfList extends Component{



    template = (name, shelf) => (

    <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                <BookList
                    shelf={shelf}
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