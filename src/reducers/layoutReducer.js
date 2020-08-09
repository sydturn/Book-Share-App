const initialState = {
    user: '',
    showAddBookModal: false,
    showBookInfo: false,
    statusTypes: [],
    isEdit: false
}

export default function layoutReducer(state = initialState, action) {
    switch (action.type) {
          case 'SET_USER': {
            return Object.assign({}, state, {
                user: action.payload
            })
          }
          case 'TOGGLE_ADD_BOOK_MODAL': {
            return Object.assign({}, state, {
                showAddBookModal: !state.showAddBookModal,
                isEdit: action.payload ? true : false
            })
          }
          case 'TOGGLE_BOOK_INFO_MODAL': {
            return Object.assign({}, state, {
                showBookInfo: !state.showBookInfo
            })
          }
          case 'SET_STATUS_TYPES': {
            return Object.assign({}, state, {
                statusTypes: action.payload
            })
          }
          case 'CLEAR_USER': {
            return Object.assign({}, state, {
              user: '',
              showAddBookModal: false,
              showBookInfo: false,
            })
          }
        default:
            return state
    }
}