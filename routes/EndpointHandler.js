class EndpointHandler {
    /**
     * Constructor for setting up endpoints associated to router
     * @param {*} param0 
     */
    constructor({ router, libraryManager}) {
        if(!libraryManager) {
            throw new Error('Library Manager not passed to Endpoint Handler class')
        }
        if(!router) {
            throw new Error('Router not passed to Endpoint Handler class')
        }
        console.log('[ENDPOINT HANDLER] constructed')
        this.libraryManager = libraryManager;
        this.router = router;
        // this.router.options('', (req, res, next) => {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        //     res.header('Access-Control-Allow-Credentials', true);
        //     return next();
        // });
        this.init();
    }
    init() {
        console.log('[ENDPOINT HANDLER]: initializing endpoints')       
        this.router.get('/healthcheck', this.healthCheck.bind(this));
        //get data
        this.router.get('/allbooks', this.allBooks.bind(this));
        this.router.get('/locations', this.locations.bind(this));
        this.router.get('/statustypes', this.statusTypes.bind(this));
        this.router.post('/bookcomments', this.bookComments.bind(this));
        this.router.get('/allcomments', this.allComments.bind(this));
        //post data
        this.router.post('/checkoutbook', this.checkOutBook.bind(this));        
        this.router.post('/newbook', this.newBook.bind(this));
        this.router.post('/newcomment', this.newComment.bind(this));
        this.router.post('/getbookinfo', this.getBookInfo.bind(this));
        this.router.post('/updatebook', this.updateBook.bind(this));
        this.router.post('/removebook', this.removeBook.bind(this));
    }
    /**
     * return router with completed endpoints
     */
    getRouter() {
        console.log('[ENDPOINT HANDLER]: getting router')
        return this.router;
    }
    /**
     * This endopoing is used to make sure there is still an available connection to the library api
     */
    healthCheck(req, res) {
        console.log('[ENDPOINT HANDLER]: doing a health check')
        this.successResponse(null,res)
    }
    /**
     * Used for getting all books from the tBook table
     * @param {*} req 
     * @param {*} res 
     */
    allBooks(req, res) {
        console.log('[ENDPOINT HANDLER]: getting all books')
        this.libraryManager.getAllBooks().then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to get books from library manager', err, res)
        })
    }
    /**
     * Used for getting a specific book from the db
     * @param {*} req 
     * @param {*} res 
     */
    getBookInfo(req, res) {
        console.log('[ENDPOINT HANDLER]: getting book for ', req.body)
        this.libraryManager.getBookByBookID(req.body.bookIndex).then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to get books from library manager', err, res)
        })
    }
    /**
     * Used for getting all locations from the tLocationsType table
     * @param {*} req 
     * @param {*} res 
     */
    locations(req, res) {
        console.log('[ENDPOINT HANDLER]: getting all locations')
        this.libraryManager.getAllLocations().then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to get locations from library manager', err, res)
        })
    }
    /**
     * Used for getting all books from the tBook table
     * @param {*} req 
     * @param {*} res 
     */
    statusTypes(req, res) {
        console.log('[ENDPOINT HANDLER]: getting all statuses')
        this.libraryManager.getAllStatusTypes().then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to get book statuses from library manager', err, res)
        })
    }
    /**
     * Used for getting all comments associated to a specific book
     * @param {*} req contains book id
     * @param {*} res 
     */
    bookComments(req, res) {
        console.log('[ENDPOINT HANDLER]: getting book comments')
        console.log('getting comments for ', req.body)
        this.libraryManager.getAllBookComments(req.body.bookID).then(response => {
            console.log(response)
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to get book comments from library manager', err, res)
        })
    }
     /**
     * Used for getting all comments from the comment table
     * @param {*} req 
     * @param {*} res 
     */
    allComments(req, res) {
        console.log('[ENDPOINT HANDLER]: getting all comments')
        this.libraryManager.getAllComments().then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to get all comments from library manager', err, res)
        })
    }
    /**
     * Used for changing the book status to checked out
     * @param {Object} req - request object from express containing book id
     * @param {*} res 
     */
    checkOutBook(req, res) {
        console.log('[ENDPOINT HANDLER]: checking out book')
        this.libraryManager.checkoutBook(req.body.checkOutObject).then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to checkout book from library manager', err, res)
        })
    }
    /**
     * Used for deleting books from db
     * @param {Object} req - request object from express containing book id
     * @param {*} res 
     */
    removeBook(req, res) {
        console.log('[ENDPOINT HANDLER]: cdeleting book')
        this.libraryManager.removeBook(req.body.bookID).then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'could not delete book', err, res)
        })
    }
    /**
     * Used for adding a new comment to a specific book
     * @param {Object} req - request object from express containing book id
     * @param {*} res 
     */
    newComment(req, res) {
        console.log('[ENDPOINT HANDLER]: adding new comment')
        this.libraryManager.addNewBookComment(req.body.newComment).then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to add a comment for this book', err, res)
        })
    }
    /**
     * Used for adding a new book to the tBook table
     * @param {Object} req - request object from express containing book object
     * @param {*} res 
     */
    newBook(req, res) {
        console.log('[ENDPOINT HANDLER]: adding new book', req.body)
        this.libraryManager.addNewBook(req.body.newBook).then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to add a book', err, res)
        })
    }

     /**
     * Used for updating a book in tBook tavle
     * @param {Object} req - request object from express containing book object
     * @param {*} res 
     */
    updateBook(req, res) {
        console.log('[ENDPOINT HANDLER]: updating book', req.body)
        this.libraryManager.updateBook(req.body.updatedBook).then(response => {
            this.successResponse(response, res)
        }).catch(err => {
            this.errorResponse(500, 'failed to add a book', err, res)
        })
    }

    errorResponse(status, message, code, res) {
        console.log('[ENDPOINT HANDLER]: sending error response')        
        res.status(status);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);
        return res.end(JSON.stringify({error: {status, message, code}}));
    }
    
    successResponse(data, res) {
        console.log('[ENDPOINT HANDLER]: sending success response')
        res.status(200);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);
        return res.end(data ? JSON.stringify(data) : undefined);
    }
}

module.exports = EndpointHandler;