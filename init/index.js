const {Book} = require('../models');
const axios = require('axios');

const ELASTIC_SEARCH_ENDPOINT = "http://localhost:9200";
const INDEX = "books2";

async function addBook(jsonBook) {
    const url = `${ELASTIC_SEARCH_ENDPOINT}/${INDEX}/_doc/${jsonBook.id}`;
    // Can also use put
    const {data} = await axios.post(url, jsonBook);
    console.log(`Book added with name ${jsonBook.title}`)
}

async function elasticInit() {
    try{
        const books = await Book.findAll();

        for(const book of books){
            const jsonBook = book.toJSON();
            await addBook(jsonBook)
        }
    }catch(e){
        console.log(e);
    }
    
}

elasticInit();