const inquirer = require("inquirer");
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";

// Leaf query clause
// Match operation title=${title}
async function searchBook(title) {
    const SEARCH_URL = `${ELASTIC_URL}/${INDEX}/_search`;

    // Query DSL
    const body = {
        "query":{
            "match":{
                "title":title
            }
        }
    }

    const {data} = await axios.post(SEARCH_URL, body);

    const hits = data.hits.hits;
    const books = [];

    hits.forEach(function (hit){
        // const book = hit._source;
        // book.score = hit._score;
        // delete book.description;

        const {id, title, author} = hit._source;
        const score = hit._score;
        const book = {
            id,
            title,
            author,
            score
        }

        books.push(book);
    });

    // for(const hit of hits){
    // }

    console.table(books);
}

function run(){

    inquirer.prompt(
        [
            {
                type:"input",
                name:"title",
                message:"Book name?"
            }
        ]
    ).then(function (answers){
        // console.log(answers.title);
        const title = answers.title;
        searchBook(title);
    }).catch(
        function name(err) {
            console.log(err);
        }
    )    

}

run();