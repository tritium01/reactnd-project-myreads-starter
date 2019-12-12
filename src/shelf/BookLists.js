import React, {Component} from 'react'
import * as BooksAPI from '../utils/BooksAPI'

class BookList extends Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((books)=>{
            books.map((book)=>{
                this.setState((currBook) =>({
                    books: currBook.books.concat(book)

                }));

                if(book.shelf === "read"){
                    this.setState((currBook, state)=>({
                        read: currBook.read.concat(book.id)
                    }))

                } if(book.shelf === "currentlyReading") {
                    this.setState((currBook, state)=>({
                        currentlyReading: currBook.currentlyReading.concat(book.id)
                    }))
                } if(book.shelf === "wantToRead"){
                    this.setState((currBook, state)=>({
                        wantToRead: currBook.wantToRead.concat(book.id)
                    }))
                }

            })
            });


    }



    eventCatcher = (event, book) => {
        BooksAPI.update(book, event)
        .then(answer=>(
            this.setState(()=>({
                currentlyReading: answer.currentlyReading,
                read: answer.read,
                wantToRead: answer.wantToRead
            }))
        ))

        if(event === "none"){
            console.log("none")
            this.setState((currBooks)=>({
                books: currBooks.books.filter((c)=>{
                    return c  !== book
                })


            }))
        }
    };


    render() {
        const {books} = this.state;
        const {bookSearch, query, shelf} = this.props;
        console.log('Books', this.state)

        return(

            <div>
                <ol className="books-grid">
                    {((query !== undefined) ? bookSearch : books.filter((c)=>{
                        return c.shelf === shelf
                    })).map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128, height: 193,
                                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                                        }}
                                    />
                                    <div className="book-shelf-changer">
                                        <select onChange={(event) => this.eventCatcher(event.target.value, book)}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{`${book.title}`}</div>
                                <div className="book-authors">{`${book.authors}`}</div>

                            </div>
                        </li>

                    ))}
                </ol>
            </div>
        )
    }
}
export default BookList