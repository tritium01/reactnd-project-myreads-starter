import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShelfList from "./shelf/listShelf";
import BookSearch from "./Search/search"
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     * showSearchPage: false
     */
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




  render() {
    return (
    <Router>
      <div>
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <Route exact path="/" render={()=>(
              <ShelfList
                  books={this.state.books}
              />
            )}

          />
          <Route exact path="/search" render={()=>(
              <BookSearch
                  books={this.state.books}
              />
          )}

          />
      </div>
    </Router>
    )
  }
}

export default BooksApp
