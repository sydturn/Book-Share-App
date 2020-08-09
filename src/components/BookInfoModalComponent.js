import React, { Component } from 'react';
import { connect } from 'react-redux';
//import actions
import { addComment, checkOut, removeBook } from '../actions/bookActions'
import { getDateFromMySQLFormat } from '../actions/globalActions'

const mapStateToProps = state => ({
  ...state
})

export class BookInfoModal extends Component {
  constructor(props) {
        super(props);
        this.state = {
            comment: 'Comment...'
        }
    }
    handleCommentChange(event) {
        this.setState({ comment: event.target.value})
    }
    closeBookInfoModal() {
        this.props.closeBookInfoModal();
        this.props.clearSelectedBook();
    }
    onSubmit(event) {
        event.preventDefault();
        this.props.addComment({
            comment: this.state.comment, 
            bookID: this.props.book.selectedBook.bookID,
            commenterName: this.props.layout.user
        });
        this.setState({ comment: '', showCommentBox: false})
    }
    handleFocus() {
        this.setState({ comment: ''})
    }
    checkOut() {
        // Available         |      1 
        // Checked Out       |      2 
        // Damaged           |      3
        // Electronic        |      4
        var statusTypeID;
        // Exactus Office    |      1 
        // Owner's Home      |      2 
        // In the Matrix     |      3
        var locationTypeID;
        //then we're checking out
        if( this.props.book.selectedBook.statusTypeID == 1) {
            statusTypeID = 2;
            locationTypeID = 1;
        }
        //then we're checking in
        else if( this.props.book.selectedBook.statusTypeID == 2 && this.props.layout.user == this.props.book.selectedBook.checkedOutBy) {
            statusTypeID = 1;
            locationTypeID = 2;
        }
        if(this.props.book.selectedBook.locationTypeID == 3) {
            locationTypeID = 3; //e-books don't leave the matrix            
            statusTypeID = 4; //e-books don't leave the matrix
        }

        this.props.checkOut({
            bookID: this.props.book.selectedBook.bookID,
            checkedOutBy: this.props.layout.user,
            statusTypeID: statusTypeID,
            locationTypeID: locationTypeID
        })
    } 
    toggleAddBookModal() {
        this.props.toggleAddBookModal(true);
    }
    removeBook() {
        this.props.removeBook(this.props.book.selectedBook.bookID);
    }
    render() {
        const bookInfo = this.props.book.selectedBook;
        const comments = this.props.book.selectedBookComments;

        return (
        <div className="alpha-sheet bookinfo">
            <div className="book-modal">
                <div className="book-content">
                    <div>
                        <div className="book-info-header">
                            {bookInfo.title}<br/>
                            By {bookInfo.author}<br/>
                        </div><hr/>
                        <div className="book-info-cildren">
                            <span className="info-prefix">Owner:</span> {bookInfo.owner}<br/>
                            <span className="info-prefix">Currently Located:</span> {bookInfo.locationDescription}<br/>
                            {(bookInfo.statusTypeID == 2 || bookInfo.statusTypeID == 4)  && 
                                <div>                            
                                    <span className="info-prefix">{bookInfo.statusTypeID == 4 ? 'Last Checked Out By:' : 'Checked Out By:'}</span> {bookInfo.checkedOutBy}<br/>
                                    <span className="info-prefix">{bookInfo.statusTypeID == 4 ? 'Last Checked Out On:' : 'Checked Out On:'}</span> {getDateFromMySQLFormat(bookInfo.checkedOutDate)}<br/>
                                </div>
                            }
                        </div>              
                        <hr/>
                        This book is {bookInfo.statusDescription}{bookInfo.statusTypeID == 2 && bookInfo.checkedOutBy == this.props.layout.user ? " (By you)" : ""}!<br/>      
                        <button  onClick={this.checkOut.bind(this)} disabled={bookInfo.statusTypeID == 3 || bookInfo.statusTypeID == 2 && bookInfo.checkedOutBy != this.props.layout.user}>
                        {bookInfo.statusTypeID == 3 ? 'Damaged/Lost' : 
                        bookInfo.statusTypeID == 1 ? 'Check Out!' : 
                        bookInfo.statusTypeID == 4 ? 'Grab a Copy!' :
                        bookInfo.statusTypeID == 2 && bookInfo.checkedOutBy == this.props.layout.user ? 'Return It' : 'Unavailable'}</button>
                    </div>
                    {bookInfo.statusTypeID != 3 && <span className='edit-link' onClick={this.toggleAddBookModal.bind(this)}>Edit</span>}
                    <span className='edit-link' onClick={this.removeBook.bind(this)}>Remove From Library Forever.</span>
                </div>
                <div className="comment-page">
                    <span className="close" onClick={this.closeBookInfoModal.bind(this)}>&times;</span>
                    {/*loop through comments and display them*/}
                    <div className="comment-holder">
                    {Object.keys(comments).map((commentObject) => {
                        const comment = comments[commentObject];
                        return(<span className="commentBox" key={comment.commentID}><span className="info-prefix">{comment.commenterName}:</span> "{comment.comment}"<br/><span className="comment-date">{getDateFromMySQLFormat(comment.created)}</span><hr/></span>)
                    })}</div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <br/>
                        <div>
                        <textarea name="comments" id="comments" value={this.state.comment} onFocus={this.handleFocus.bind(this)} onChange={this.handleCommentChange.bind(this)}>
                        Comment...
                        </textarea>
                        </div>
                        <button type="submit" value="Submit">Comment!</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}
const mapDispatchToProps  = (dispatch) => {
  return {
        closeBookInfoModal: () => dispatch({type: 'TOGGLE_BOOK_INFO_MODAL'}),
        clearSelectedBook: () => dispatch({type: 'CLEAR_SELECTED'}),
        toggleAddBookModal: (isEdit) => dispatch({type: 'TOGGLE_ADD_BOOK_MODAL', payload: isEdit}),
        removeBook: (bookID) => dispatch(removeBook(bookID)),   
        addComment: (comment) => dispatch(addComment(comment)),        
        checkOut: (checkOutObject) => dispatch(checkOut(checkOutObject))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookInfoModal);