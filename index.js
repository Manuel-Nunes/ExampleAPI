import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const server = express();

const PORT = 8080;

server.use(bodyParser.json())

/**
 * @typedef {Object} VisitorsList
 * @property {string[]} Visitors
 */

/**
 * Reads data from json file
 * @returns {VisitorsList}
 */
function readList(){
  const rawData = fs.readFileSync("./visitedList.json",'utf-8');
  /** @type {VisitorsList} */
  const list = JSON.parse(rawData)

  return list;
}

/**
 *
 * @param {VisitorsList} List
 */
function writeList(List){
  fs.writeFileSync("visitedList.json",JSON.stringify(List,null,2))
}

function appendList(name){
  const list = readList();

  list.Visitors.push(name);

  writeList(list);

  return list;
}

server.get('/', (req,res)=>{
  res.send('Hello world from example')
})

server.get('/visitor', (req,res) => {

  const List = readList();

  res.send(JSON.stringify(List,null,2))
})

/**
 * @typedef {Object} ReqBody
 * @prop {string} Name
 */
server.post('/visitor', (req, res) => {
  /** @type {ReqBody} */
  const body = req.body;

  const List =  appendList(body.Name);

  res.contentType('json');

  res.send(JSON.stringify(List,null,2))
})

server.listen(PORT,()=>{

  console.log(`listening on http://localhost:${PORT}`)
})
