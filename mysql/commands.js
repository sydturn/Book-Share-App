/**
 * @module mysql-commands
 * @param {Object} mysql - Insance of mysql connection
*/
module.exports = (database) => {
    /**
     * Method gets all books from db
     */
    exports.getAllBooks = () => {
        console.log('[SQL COMMANDS] getting all books')
        return new Promise((resolve, reject) => {
            database.query(
                'SELECT b.*, a.locationDescription, x.statusDescription FROM tBooks AS `b` INNER JOIN tLocationType as `a` ON (b.locationTypeID=a.typeID) INNER JOIN tStatusType as `x` ON (b.StatusTypeID=x.TypeID);'
            ).then(data => {
                console.log('books recieved')
                resolve(data)
            }).catch(err => {
                console.log('could not receive books', err)
                reject(err)
            });
        })
    }  
    /**
     * Method gets all books from db
     */
    exports.getAllLocations = () => {
        console.log('[SQL COMMANDS] getting all locations')
        return new Promise((resolve, reject) => {
            database.query(
                'SELECT * FROM tLocationType;'
            ).then(data => {
                console.log('locations recieved')
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    } 
    /**
     * Method gets all books from db
     */
    exports.getAllStatusTypes = () => {
        console.log('[SQL COMMANDS] getting all status types')
        return new Promise((resolve, reject) => {
            database.query(
                'SELECT * FROM tStatusType;'
            ).then(data => {
                console.log('statuses recieved')
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    }
    /**
     * Method gets all books comments from db
     */
    exports.getAllBookComments = (bookID) => {
        console.log('[SQL COMMANDS] getting book comments for ', bookID)
        return new Promise((resolve, reject) => {
            database.query(
                'SELECT b.*, a.comment, a.commenterName, a.created FROM ltComments_Books AS `b` INNER JOIN tComments as `a` ON (b.commentID=a.commentID) WHERE b.bookID=?;',
                [bookID]
            ).then(data => {
                console.log('book comments recieved')
                resolve(data)
            }).catch(err => {
                console.log('unable to get book comments', err)
                reject(err)
            });
        })
    }
    /**
     * Method gets all books from db
     */
    exports.getAllComments = () => {
        console.log('[SQL COMMANDS] getting all comments')
        return new Promise((resolve, reject) => {
            //returns all comments and their book ids
            database.query(
                'SELECT * FROM ltComments_Books;'
            ).then(data => {
                console.log('comments retrieved')
                resolve(data)
            }).catch(err => {
                console.log('unable to get comments', err)
                reject(err)
            });
        })
    }

    /**
    * Method gets a specific book from the db
    */
   exports.getBookByBookID = (bookID) => {
       console.log('[SQL COMMANDS] getting book info for book ', bookID)
       return new Promise((resolve, reject) => {
           database.query(
               'SELECT b.*, a.locationDescription, x.statusDescription FROM tBooks AS `b` INNER JOIN tLocationType as `a` ON (b.locationTypeID=a.typeID) INNER JOIN tStatusType as `x` ON (b.StatusTypeID=x.TypeID) WHERE bookID = ?;', bookID
           ).then(data => {
               console.log('book retrieved')
               resolve(data)
           }).catch(err => {
               reject(err)
           });
       })
    }
    /**
     * Method sets book to checked out status
     */
    exports.checkoutBook = (checkoutObject) => {
        console.log('[SQL COMMANDS] checking out book', checkoutObject)
        return new Promise((resolve, reject) => {
            //set status and location to checked out and exactus office
            database.query('CALL CheckoutBook(?, ?, ?, ?);', [checkoutObject.checkedOutBy, checkoutObject.locationTypeID, checkoutObject.statusTypeID, checkoutObject.bookID]
            ).then(data => {
                this.getBookByBookID(checkoutObject.bookID).then(res => {
                    resolve(res)
                }).catch(err => {
                    console.log('could not get book info')
                })
            }).catch(err => {
                console.log('could not check out book', err)
                reject(err);
            })
        })
    }
    /**
     * Method adds a book comment to a book
     */
    exports.addNewBookComment = (commentObject) => {
        console.log('[SQL COMMANDS] adding comment to book', commentObject)
        return new Promise((resolve, reject) => {
            database.query(
                'CALL AddNewComment(?, ?, ?);', [commentObject.comment, commentObject.commenterName, commentObject.bookID]
            ).then(data => {
                console.log('added comment successfully')
                this.getAllBookComments(commentObject.bookID).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log('could not get book after commenting.');
                    reject(err)
                });
            }).catch(err => {
                console.log('could not add comment', err)
                reject(err)
            });
        })
    }
    /**
     * Method adds new book to tbook
     */
    exports.addNewBook = (bookObject) => {
        console.log('[SQL COMMANDS] adding new book')
        return new Promise((resolve, reject) => {
            database.query(
                'CALL AddNewBook(?, ?, ?, ?, ?);', [bookObject.title, bookObject.author, bookObject.owner, bookObject.locationTypeID, bookObject.statusTypeID]
            ).then(data => {
                console.log('books added')
                resolve(data)
            }).catch(err => {
                console.log('unable to add new book', err)
                reject(err)
            });
        })
    }
        /**
     * Method adds new book to tbook
     */
    exports.removeBook = (bookID) => {
        console.log('[SQL COMMANDS] adding new book')
        return new Promise((resolve, reject) => {
            database.query(
                'DELETE FROM ltComments_Books WHERE bookID = ?;',[bookID]
            ).then(data => {
                database.query(
                    'DELETE FROM tBooks WHERE bookID = ?;',[bookID]
                ).then(res => {
                    console.log('books deleted')
                    resolve(data)
                }).catch(err => {
                    console.log('unable to add new book', err)
                    reject(err)
                });
            }).catch(err => {
                console.log('unable to add new book', err)
                reject(err)
            });
        })
    }
    /**
     * Method updates tbook in tbook
     */
    exports.updateBook = (bookObject) => {
        console.log('[SQL COMMANDS] updating book')
        return new Promise((resolve, reject) => {
            database.query(
                'CALL UpdateBook(?, ?, ?, ?, ?);', [bookObject.title, bookObject.author, bookObject.owner, bookObject.statusTypeID, bookObject.bookID]
            ).then(data => {
                this.getBookByBookID(bookObject.bookID).then(res => {
                    resolve(res)
                }).catch(err => {
                    console.log('could not get book info')
                })
            }).catch(err => {
                console.log('unable to update book', err)
                reject(err)
            });
        })
    }
    return exports;
}