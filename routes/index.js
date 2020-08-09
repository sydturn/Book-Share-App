class Routes { 
    constructor(router, libraryManager) {        
        if(!libraryManager) {
            throw new Error(`Library manager was not sent to Routes class.`) 
        }       
        if(!router) {    
            throw new Error(`router was not sent to Routes class.`);
        }            
        this.endpointHandler = new (require('./EndpointHandler'))({ router: router || require('express').Router(), libraryManager});    
    }
    
    getRouter() {        
        return this.endpointHandler.getRouter();    
    }
}
module.exports = Routes;