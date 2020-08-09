import _ from 'lodash';
var axios = require('axios');
///this function is for updating the room/tab selected on the main scree
export function updateSelectedBook(bookIndex) {
    return (dispatch, getState) => {        
        axios.post('/getBookInfo', {bookIndex}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {              
                dispatch({type: 'SELECT_BOOK', payload: res.data[0]});        
                dispatch(getBookComments(bookIndex));        
                dispatch({type: 'TOGGLE_BOOK_INFO_MODAL'});
            }
        }).catch(err => {
            console.log('could not get book info', err)
        })
    }
}

///this function makes a call to our api to add a new book to the db
export function addBook(newBook) {
    return (dispatch) => {
        axios.post('/newbook', {newBook}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {
                dispatch(getAllBooks());
            }
        }).catch(err => {
            console.log('could not get books', err)
        });
    }
}
///remove book from database
export function removeBook(bookID) {
    return (dispatch) => {
        axios.post('/removebook', {bookID}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {
                dispatch(getAllBooks());
                dispatch({type: 'CLEAR_SELECTED'});
                dispatch({type: 'TOGGLE_BOOK_INFO_MODAL'});
            }
        }).catch(err => {
            console.log('could not delete', err)
        });
    }
}

///this function makes a call to our api to update a book to the db
export function updateBook(updatedBook) {
    return (dispatch) => {
        axios.post('/updatebook', {updatedBook}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {
                dispatch(getAllBooks());
                dispatch({type: 'SELECT_BOOK', payload: res.data[0]}); //update selected book info
            }
        }).catch(err => {
            console.log('could not get books', err)
        });
    }
}
//get all books... we do this a lot, just to keep things up to date. Ideally we would have something like redis for pubsub whenver someone add or edits something.
export function getAllBooks() {
    return (dispatch) => {
        axios.get('/allbooks', {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {         
                dispatch({type: 'SET_BOOK_LIST', payload: res.data});
                dispatch(getAllComments(res.data));
                dispatch(getStatusTypes())
            }
        }).catch(err => {
            console.log('could not get books', err)
        })
    }
}

export function getAllComments(books) {
    return (dispatch) => {
        axios.get('/allcomments', {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {         
                dispatch({type: 'SET_COMMENT_LIST', payload: res.data});
            }
        }).catch(err => {
            console.log('could not get comment list', err)
        })
    }
}
export function checkOut(checkOutObject) {
    return (dispatch) => {
        axios.post('/checkoutbook', {checkOutObject}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
               dispatch({type: 'SELECT_BOOK', payload: res.data[0]});
        }).catch(err => {
            console.log('could not checkout book', err)
        })
    }
}

export function addComment(newComment) {
    return (dispatch) => {
        axios.post('/newcomment', {newComment}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
              console.log(res.data)
              dispatch({type: 'SET_SELECTED_BOOK_COMMENTS', payload: res.data});   
        }).catch(err => {
            console.log('could not add comment to book', err)
        })
    }
}

export function getBookComments(bookID) {
    return (dispatch) => {
        axios.post('/bookComments', {bookID}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {   
                dispatch({type: 'SET_SELECTED_BOOK_COMMENTS', payload: res.data});
            }
        }).catch(err => {
            console.log('could not get book comments', err)
        })
    }
}

export function getStatusTypes() {
    return (dispatch) => {
        axios.get('/statustypes', {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          ).then(res => {
            if(res.status === 200) {   
                dispatch({type: 'SET_STATUS_TYPES', payload: res.data});
            }
        }).catch(err => {
            console.log('could not get book comments', err)
        })
    }
}