import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShelfList from "./shelf/listShelf";
import SearchList from "./Search/searchList";
import './App.css'


function BooksApp(props) {
    return (
    <Router>
      <div>
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <Route exact path="/" component={ShelfList}/>
          <Route exact path="/search" component={SearchList}/>
          />
      </div>
    </Router>
    )
}

export default BooksApp
