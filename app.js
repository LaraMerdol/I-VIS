// Imports
const express = require("express");
const path = require("path");
const neo4j = require("neo4j-driver");

const app = express();
//
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
//View Engine
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//Import Files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(path.join(__dirname, "/node_modules/cytoscape-context-menus"))
);
app.get("/public/cytoscape.min.js", function (req, res) {
  res.sendFile(__dirname + "/public/cytoscape.min.js");
});
app.get(
  "/node_modules/cytoscape-context-menus/cytoscape-context-menus.js",
  function (req, res) {
    res.sendFile(
      __dirname +
        "/node_modules/cytoscape-context-menus/cytoscape-context-menus.js"
    );
  }
);
app.get("/public/index.css", function (req, res) {
  res.sendFile(__dirname + "/public/index.css");
});


var name = "";
var number = 0;
var movieArr = [];
var newElements = [];
var actors = [];
var movies = [];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
  res.render("./index", {
    movies: movieArr,
    name: name,
    number: number,
  });
});

app.post("/search", function (req, res) {
  movieArr = [];
  actors = [];
  movies = [];
  name = req.body.name;
  number = req.body.number;
  var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic());
  var session = driver.session();
  session
    .run(
      'MATCH p = (actor:Person {name:"' +
        name +
        '"})-[*0..' +
        number +
        "]-(hollywood)WITH *, relationships(p)AS edge  RETURN hollywood, edge"
    )
    .then(function (result) {
      result.records.forEach(function (record) {
        if (record._fields[0].labels[0] == "Movie") {
          movies.push(record._fields[0].properties.title);
        } else {
          actors.push(record._fields[0].properties.name);
        }
        movieArr.push({
          data: {
            id: record._fields[0].identity.low,
            type: record._fields[0].labels[0],
            properties: record._fields[0].properties,
          },
        });
        if (record._fields[1].size != 0) {
          record._fields[1].forEach(function (edge) {
            movieArr.push({
              data: {
                id: edge.start.low + "" + edge.end.low + edge.type,
                source: edge.start.low,
                target: edge.end.low,
                label: edge.type,
                properties: edge.properties,
              },
            });
          });
        }
      });
      res.render("./index", {
        movies: movieArr,
        name: name,
        number: number,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.post("/add", function (req, res) {
  newElements = [];
  var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic());
  var session = driver.session();
  if (req.body.name.type == "Movie") {
    var title = req.body.name.properties.title;
    session
      .run(
        'MATCH p = (movie:Movie {title:"' +
          title +
          '"})<-[edge]-(hollywood)  RETURN hollywood , edge'
      )
      .then(function (result) {
        result.records.forEach(function (record) {
          var id = "";
          if (!actors.includes(record._fields[0].properties.name )) {
            
            newElements.push({
              data: {
                id: record._fields[0].identity.low + "n" + title,
                type: record._fields[0].labels[0],
                properties: record._fields[0].properties,
              },
            });
            id = record._fields[0].identity.low + "n" + title;
            actors.push(record._fields[0].properties.name);
            movieArr.push({
              data: {
                id: record._fields[0].identity.low + "n" + title,
                type: record._fields[0].labels[0],
                properties: record._fields[0].properties,
              },
            });
          }      
          else{
            movieArr.forEach(function(element){
              if(element.data.type =='Person' && element.data.properties.name == record._fields[0].properties.name){
                id =element.data.id;    
              }
            }) 
  
          }
          if(!movieArr.some(e => e.data.id == id+req.body.name.id +record._fields[1].type)){
            newElement = {
              data: {
                id:id+
                  req.body.name.id +
                  record._fields[1].type,
                source: id,
                target: req.body.name.id,
                label: record._fields[1].type,
                properties: record._fields[1].properties,
              },
            };
            newElements.push(newElement) ;
            movieArr.push(newElement);

          }

        });
        res.send( JSON.stringify({ newElements,
        }));
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  else {
    var nameActor = req.body.name.properties.name;
    session
      .run(
        'MATCH p = (person:Person {name:"' +
        nameActor +
          '"})-[edge]->(hollywood)  RETURN hollywood , edge'
      )
      .then(function (result) {
        result.records.forEach(function (record) {
          var id = "";
          if (!movies.includes(record._fields[0].properties.title )) {
            
            newElements.push({
              data: {
                id: record._fields[0].identity.low + "n" + nameActor,
                type: record._fields[0].labels[0],
                properties: record._fields[0].properties,
              },
            });
            id = record._fields[0].identity.low + "n" + nameActor;
            movies.push(record._fields[0].properties.title);
            movieArr.push({
              data: {
                id: record._fields[0].identity.low + "n" + nameActor,
                type: record._fields[0].labels[0],
                properties: record._fields[0].properties,
              },
            });
          }
          
          else{
            movieArr.forEach(function(element){
              if(element.data.type =='Movie' && element.data.properties.title == record._fields[0].properties.title){
                id =element.data.id;    
              }
            }) 
  
          }
          if(!movieArr.some(e => e.data.id == id+req.body.name.id +record._fields[1].type)){
            newElement = {
              data: {
                id:id+
                  req.body.name.id +
                  record._fields[1].type,
                source: id,
                target: req.body.name.id,
                label: record._fields[1].type,
                properties: record._fields[1].properties,
              },
            };
            newElements.push(newElement) ;
            movieArr.push(newElement);

          }

        });
        res.send( JSON.stringify({ newElements,
        }));
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

app.listen(3000);
console.log("Server started on Port 3000");
module.exports = app;
