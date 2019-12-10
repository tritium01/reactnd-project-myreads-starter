import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShelfList from "./shelf/listShelf";
import SearchList from "./Search/searchList";
import * as BooksAPI from './utils/BooksAPI'
import './App.css'


class BooksApp extends React.Component {


    render() {

    return (
    <Router>
      <div>
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <Route exact path="/" render={()=>(
              <ShelfList/>
            )}

          />
          <Route exact path="/search" render={()=>(
              <SearchList/>
          )}
          />
      </div>
    </Router>
    )
  }
}

export default BooksApp
