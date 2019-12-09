import React, {Component} from 'react'
import {Link} from "react-router-dom";


class ShelfList extends Component {

    render() {
        const {books} = this.props.books;
        console.log('Books', books);
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