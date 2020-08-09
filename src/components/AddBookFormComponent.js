import React, { Component } from 'react';
import { connect } from 'react-redux';
//import actions
import { addBook, updateBook } from '../actions/bookActions'

const mapStateToProps = state => ({
  ...state
})

export class AddBookForm extends Component {
  constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',      
            owner: '',
            isEBook: false
        }
    }
   
    toggleAddBookModal() {
        this.props.toggleAddBookModal();
    }
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleOwnerChange(event) {
        this.setState({ owner: event.target.value });
    }
    handleAuthorChange(event) {
        this.setState({ author: event.target.value });
    }
    toggleEBook() {
        this.setState({isEBook: !this.state.isEBook})
    }
    componentDidMount() {
        if(this.props.layout.isEdit) {
            const selectedBookDetails = this.props.book.selectedBook;
            this.setState({
                title: selectedBookDetails.title,
                author: selectedBookDetails.author,
                owner: selectedBookDetails.owner,
            })
        }
    }
    onSubmit(event) {
        event.preventDefault();
        if(this.props.layout.isEdit) {
            this.props.updateBook({
                title: this.state.title,
                author: this.state.author,
                owner: this.state.owner,
                bookID: this.props.book.selectedBook.bookID,
                statusTypeID: this.state.isEBook ? 3 : this.props.book.selectedBook.statusTypeID //isEbook here is isDamaged
            });  
        } else {
            this.props.addBook({
                title: this.state.title,
                author: this.state.author,
                owner: this.state.owner,
                statusTypeID: this.state.isEBook ? 4 : 1,
                locationTypeID: this.state.isEBook ? 3 : 2
            });            
        }
        this.setState({ openNamingModal: false, title: '', owner: '', author: '', openNamingModal: false, isEBook: false });
        this.props.toggleAddBookModal();
    }
    render() {
        const bookInfo = this.props.book.selectedBook;
        const comments = this.props.book.selectedBookComments;
        const isEditModal = this.props.layout.isEdit;

        return (
        <div className="alpha-sheet">
            <div className="naming-modal">
              <div className="naming-modal-content">
                <span className="modal-close" onClick={this.toggleAddBookModal.bind(this)}>&times;</span><br/><br/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Title: </label>
                    <input autoFocus type="text" ref="_name" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
                    
                    <label>Author: </label>
                    <input type="text" ref="_name" value={this.state.author} onChange={this.handleAuthorChange.bind(this)}/>

                    <label>Owner: </label>
                    <input type="text" ref="_name" value={this.state.owner} onChange={this.handleOwnerChange.bind(this)}/>

                    <input type="checkbox" id="isEBook" name="isEBook" value={this.state.isEBook} onChange={this.toggleEBook.bind(this)}/>
                    <label htmlFor="isEBook">{isEditModal ? 'Book Damaged/Lost' : 'Is E-Book'}</label>
                    <button type="submit" value="save">{isEditModal ? 'Save Changes' : 'Add Book'}</button>
                </form>
              </div>
            </div>
        </div>
        );
    }
}
const mapDispatchToProps  = (dispatch) => {
    return {
        toggleAddBookModal: () => dispatch({type: 'TOGGLE_ADD_BOOK_MODAL'}),
        addBook: (book) => dispatch(addBook(book)),
        updateBook: (book) => dispatch(updateBook(book))
    }  
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBookForm);