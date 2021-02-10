// console.log("Hello world");
const inquirer = require('inquirer');
const axios = require('axios');

const ELASTIC_URL = "http://localhost:9200";

async function elasticCreateIndex(indexName){
    // TODO: Create index via http
    // PUT http://localhost:9200/<indexName>

    const endpoint = ELASTIC_URL+"/"+indexName;
    const response = await axios.put(endpoint);
    // This is the same thing as line 12
    // axios.put(endpoint).then(function(){
    //     console.log(response.data);
    // })
    console.log(response.data);
}

function createIndex(){
    inquirer.prompt([
        {
            type: "input",
            name: "indexName",
            message: "Please provide an index name:"
        }
    ]).then(function (answers){
        elasticCreateIndex(answers.indexName);
    }).catch()
}

// const obj1 = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// obj1.a -> 1
// obj1.c -> 3
// obj1['b'] -> 2

// const {b,a,z} = obj1
// a -> 1
// c -> 3
// z -> undefined

// Error
//const {a,b} = obj2

// const obj2 = {
//     a,
//     b,
//     c,
//     v
// }
// obj2.a -> 1
// obj2.c -> undefined

async function elasticGetIndex(indexName){
    // Template string or string interpolation
    const endpoint = `${ELASTIC_URL}/${indexName}`; //ELASTIC_URL+'/'+indexName
    const {data} = await axios.get(endpoint);
    console.log(data);
}

function getIndex() {
    inquirer.prompt([
        {
            type: "input",
            name: "indexName",
            message: "Please provide an index name:"
        }
    ]).then(function (answers){
        elasticGetIndex(answers.indexName)
    }).catch()
}

// This my main program
function run(){
    //console.log("O meu programa esta a correr");

    inquirer.prompt([
        {
            type: "rawlist",
            name: "action",
            message: "Action?",
            choices: ["Create Index", "Get Index", "Delete Index"]
        }
    ]).then(function (answers) {
        if(answers['action'] == "Create Index"){
            // Create Index
            createIndex();
        }else if(answers['action'] == "Delete Index"){
            // TODO: Delete index
        }else if(answers['action'] == "Get Index"){
            getIndex()
        }else{
            // Do nothing
        }
    }).catch()
}

// I am executing my program
run();