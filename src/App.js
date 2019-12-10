import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShelfList from "./shelf/listShelf";
import BookSearch from "./Search/search"
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
      category: {
          currentlyReading: [],
          wantToRead: [],
          read: []
      }
  };
  componentDidMount() {
    BooksAPI.getAll()
        .then((books)=>{
          this.setState(()=>({
            books
          }))
        })
  }

    bookDistro = (book)=> {
        this.setState((currState) =>({
            read: currState.category.read.push([book])
        }));
        
    };




    render() {
        console.log(this.state.category.read)
    return (
    <Router>
      <div>
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <Route exact path="/" render={()=>(
              <ShelfList
                  read={this.state.category.read}
              />
            )}

          />
          <Route exact path="/search" render={()=>(
              <BookSearch
                  //books={this.state.books}
                  bookDistro={this.bookDistro}
              />
          )}

          />
      </div>
    </Router>
    )
  }
}

export default BooksApp
