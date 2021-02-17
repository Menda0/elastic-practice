const inquirer = require('inquirer')
const axios = require('axios')

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";

async function elasticCreateDocument(title, author, rating){
    const url = `${ELASTIC_URL}/${INDEX}/_doc`;
    const body = { title, author, rating };

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
    ]).then(async function (answers){
        const {title, author, rating} = answers;
        await elasticCreateDocument(title, author, rating);
        run();
    }).catch()
}

async function elasticUpdateDocument(id, title, author, rating) {
    const url = `${ELASTIC_URL}/${INDEX}/_doc/${id}`;
    const body = {title, author, rating};

    const {data} = await axios.put(url, body);
    console.log(data);
}

function updateDocument(){
    // We need id, title, author and rating of the book
    // We need to make a put operation to elastic search
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Document Id:"
        },
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
    ]).then(async function (answers) {
        const {title, author, rating, id} = answers;
        await elasticUpdateDocument(id, title, author, rating);
        run();
    }).catch(function(err) {
        console.log(err);
    })

}

function run(){
    inquirer.prompt([
        {
            type:"rawlist",
            name:"action",
            message:"Action?",
            choices: ["Create Document", "Update Document","Get Document", "Delete Document", "Exit"]
        }
    ]).then(function (answers){
        switch(answers['action']){
            case "Create Document":
                createDocument();
                break;
            case "Update Document":
                updateDocument();
                break;
            case "Get Document":
                // getDocument()
                console.log("Get document");
                break;
            case "Delete Document":
                // deleteDocument();
                console.log("Delete document")
                break;
            case "Exit":
                return;
            default:
                run();
                break;

        }
    })
}

run();