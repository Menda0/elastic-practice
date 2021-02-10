const inquirer = require('inquirer')
const axios = require('axios')

const ELASTIC_URL = "http://localhost:9200"

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
                // createDocument();
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