const {Book} = require('../models');

async function elasticInit() {
    try{
        const books = await Book.findAll();

        for(const book of books){
            const jsonBook = book.toJSON();
            console.log(jsonBook);
        }
    }catch(e){
        console.log(e);
    }
    
}

elasticInit()