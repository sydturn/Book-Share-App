const initialState = {
    selectedBook: {},
    selectedBookComments: [],
    books: [],
    comments: []
}

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case 'SELECT_BOOK': {
            return Object.assign({}, state, {
                selectedBook: action.payload
            })
        }
        case 'ADD_BOOK': {
            return Object.assign({}, state, {
                books: action.payload
            })
        }
        case 'SET_BOOK_LIST': {
            return Object.assign({}, state, {
                books: action.payload
            }) 
        }
        case 'SET_COMMENT_LIST': {
            return Object.assign({}, state, {
                comments: action.payload
            }) 
        }
        case 'SET_SELECTED_BOOK_COMMENTS': {
            return Object.assign({}, state, {
                selectedBookComments: action.payload
            }) 
        }
        case 'CLEAR_SELECTED': {
            return Object.assign({}, state, {    
                selectedBook: {},
                selectedBookComments: []
            }) 
        }          
        case 'CLEAR_USER': {
            return Object.assign({}, state, {
                selectedBook: {},
                selectedBookComments: [],
            })
          }
        default:
            return state
    }
}