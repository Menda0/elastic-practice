const inquirer = require("inquirer");
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";
const SEARCH_URL = `${ELASTIC_URL}/${INDEX}/_search`;

function outputBooks(hits){
    const books = [];

    hits.forEach(function (hit){
        // const book = hit._source;
        // book.score = hit._score;
        // delete book.description;

        const {id, title, author, rating} = hit._source;
        const score = hit._score;
        const book = {
            id,
            title,
            author,
            score,
            rating
        }

        books.push(book);
    });

    return books;
}

// Compound query clause
// Must -> Match operation title=${title}
// Filter -> Range operation rating gte 3
async function searchBookRatingGte(title, rating){
    
    const body = {
        "query":{
            "bool":{
                "must":[
                    {
                        "match":{
                            "title":title
                        }
                    }
                ],
                "filter":[
                    {
                        "range":{
                            "rating":{
                                "gte": rating
                            }
                        }
                    }
                ],
                "should": [],
                "must_not": []
            }
        },
        "aggs":{
            "stats_ratings":{
                "stats":{
                    "field":"rating"
                }
            }
        }
    }

    const {data} = await axios.post(SEARCH_URL, body);
    const {stats_ratings} = data.aggregations;

    console.table(stats_ratings);

    const books = outputBooks(data.hits.hits);

    console.table(books);
}

// Leaf query clause
// Match operation title=${title}
async function searchBook(title) {

    // Query DSL
    const body = {
        "query":{
            "match":{
                "title":title
            }
        }
    }

    const {data} = await axios.post(SEARCH_URL, body);

    const books = outputBooks(data.hits.hits);

    console.table(books);
}

function run(){

    inquirer.prompt(
        [
            {
                type:"input",
                name:"title",
                message:"Book name?"
            },
            {
                type:"number",
                name:"rating",
                message:"Book rating?"
            }
        ]
    ).then(function (answers){
        // console.log(answers.title);
        const {title, rating} = answers;

        //searchBook(title);
        searchBookRatingGte(title, rating);
    }).catch(
        function name(err) {
            console.log(err);
        }
    )    

}

run();