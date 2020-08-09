
module.exports = (database) => {
    const mysqlCommands = require('./mysql/commands')(database);
    //gets
    exports.getAllBooks = () => {
        return mysqlCommands.getAllBooks();
    }
    exports.getAllLocations = () => {
        return mysqlCommands.getAllLocations();
    }
    exports.getAllStatusTypes = () => {
        return mysqlCommands.getAllStatusTypes();
    }
    exports.getAllBookComments = (bookID) => {
        return mysqlCommands.getAllBookComments(bookID);
    }
    exports.getAllComments = () => {
        return mysqlCommands.getAllComments();
    }
    //sets
    exports.checkoutBook = (checkoutObject)=> {
        return mysqlCommands.checkoutBook(checkoutObject);
    }
    exports.addNewBookComment = (commentObject) => {
        return mysqlCommands.addNewBookComment(commentObject);
    }
    exports.addNewBook = (bookObject) => {
        return mysqlCommands.addNewBook(bookObject);
    }
    exports.updateBook = (bookObject) => {
        return mysqlCommands.updateBook(bookObject);
    }
    exports.removeBook = (bookID) => {
        return mysqlCommands.removeBook(bookID);
    }
    exports.getBookByBookID = (bookID) => {
        return mysqlCommands.getBookByBookID(bookID);
    }
    return exports;
}