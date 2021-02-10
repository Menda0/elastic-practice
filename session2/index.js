const inquirer = require('inquirer')
const axios = require('axios')

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";

async function elasticCreateDocument(name, author, rating){
    const url = `${ELASTIC_URL}/${INDEX}/_doc`;
    const body = { name, author, rating };

    const {data} = await axios.post(url, body);
    console.log(data);
}

function createDocument(){
    inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"Title:"
        },
        {
            type:"input",
            name:"author",
            message:"Author:"
        },
        {
            type:"number",
            name:"rating",
            message:"Rating:"
        }
    ]).then(function (answers){
        const {name, author, rating} = answers;
        elasticCreateDocument(name, author, rating);
    }).catch()
}

function run(){
    inquirer.prompt([
        {
            type:"rawlist",
            name:"action",
            message:"Action?",
            choices: ["Create Document", "Update Document","Get Document", "Delete Document"]
        }
    ]).then(function (answers){
        switch(answers['action']){
            case "Create Document":
                createDocument();
                console.log("create document");
                break;
            case "Update Document":
                // updateDocument();
                console.log("Update Document");
                break;
            case "Get Document":
                // getDocument()
                console.log("Get document");
                break;
            case "Delete Document":
                // deleteDocument();
                console.log("Delete document")
                break;
            default:
                run();
                break;

        }
    })
}

run();