import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
//import actions
import { updateSelectedBook, getAllBooks } from '../actions/bookActions'
import { login } from '../actions/globalActions'

//import components
import BookInfoModal from './BookInfoModalComponent'
import AddBookModal from './AddBookFormComponent'

const mapStateToProps = state => ({
  ...state
})

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',      
      owner: '',
      name: '',
      status: ''
    }
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onLogin(event) {
    event.preventDefault();
    this.props.login(this.state.name)
    this.setState({name:''})
  }
  toggleAddBookModal() {
    this.props.toggleAddBookModal();
  }
  selectBook(bookID) {
    this.props.updateSelectedBook(bookID)
  }
  componentWillMount() {
    this.props.getAllBooks();
  }
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
    this.forceUpdate();
  }
  handleOwnerChange(event) {
    this.setState({ owner: event.target.value });
  }
  handleAuthorChange(event) {
    this.setState({ author: event.target.value });
  }
  handleStatusChange(event) {
    this.setState({ status: event.target.value });
  }
  switchUser() {
    this.props.clearUser()
  }
  render() {
      const books = this.props.book.books;
      const showAddBookModal = this.props.layout.showAddBookModal;
      const showBookInfo = this.props.layout.showBookInfo;
      const allComments = this.props.book.comments;
      const user = this.props.layout.user;
      const statuses = this.props.layout.statusTypes;
      return (
        
        <div>  
          
          {user === '' && 
          <div>
          <div className="login"></div>     
          <div className="alpha-sheet username">
            <form className="login-form" onSubmit={this.onLogin.bind(this)}>
              <span className="intro-part-one">What  </span> Is your name? <br/>
              <hr/>
              <input type="text" ref="_name" value={this.state.name} placeholder="...?" onChange={this.handleNameChange.bind(this)}/>
            </form>       
          </div></div>
          }  
          {user != '' && <div>       
          <div className="sidenav">
            {/*Some search parameters in case the book list gets too long*/}
            Welcome {this.props.layout.user}!
           <div>             
            <label>Search Author: </label><br/>
            <input type="text" ref="_name" value={this.state.author} onChange={this.handleAuthorChange.bind(this)}/>
           </div>
            <div>
              <label>Search Title: </label><br/>
              <input type="text" ref="_name" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
            </div>
            <div>
              <label>Search Owner: </label><br/>
              <input type="text" ref="_name" value={this.state.owner} onChange={this.handleOwnerChange.bind(this)}/>
            </div>
            <div>
              <label htmlFor="status">Status Type</label><br/>
              <select name="status" id="status" onChange={this.handleStatusChange.bind(this)}> 
                <option key='0' value=''>All</option>
                {Object.keys(statuses).map((status) => {
                  const statusContent = statuses[status];
                  return(<option key={statusContent.typeID} value={statusContent.statusDescription}>{statusContent.statusDescription}</option>)
                })}                
              </select>
            </div>
            <button onClick={this.toggleAddBookModal.bind(this)}>Add Book</button>
            <button onClick={this.switchUser.bind(this)}>Switch User</button>
          </div>
          <div className="main-canvas">
            {/*loop through books and give them on clicks for their modals*/}
            {Object.keys(books).map((book) => {
              const bookObject = books[book];
              const bookID = bookObject.bookID;
              const commentCount = (_.filter(allComments, function(o) { return o.bookID == bookID; })).length;
              if(bookObject.title.toLowerCase().indexOf(this.state.title.toLowerCase()) != -1
              && bookObject.author.toLowerCase().indexOf(this.state.author.toLowerCase()) != -1
              && bookObject.owner.toLowerCase().indexOf(this.state.owner.toLowerCase()) != -1
              && (this.state.status == '' || bookObject.statusDescription === this.state.status))  {
                return(<div className="book" key={bookID} onClick={this.selectBook.bind(this, bookID)}>
                    <span className="book-title">{bookObject.title} </span><br/>
                    <span className="book-title">{bookObject.author} </span><br/>
                    <span className="book-comment-count">({commentCount} Comments)</span>
                  </div>)
              }
            })}    
            {showBookInfo && <BookInfoModal/>}    
          </div>
          {showAddBookModal && 
            <AddBookModal/>
          }
          </div>} 
        </div>
      );
  }
}
const mapDispatchToProps  = (dispatch) => {
  return {
    updateSelectedBook: (bookID) => dispatch(updateSelectedBook(bookID)),
    toggleAddBookModal: () => dispatch({type: 'TOGGLE_ADD_BOOK_MODAL'}),
    clearUser: () => dispatch({type: 'CLEAR_USER'}),
    getAllBooks: () => dispatch(getAllBooks()),
    login: (username) => dispatch(login(username))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);