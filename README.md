# I-VIS
i-Vis Engineer Exercise 
<h3>Use Cases</h3>
The application is to mainly display a neighborhood of a given actor or a specific movie to visually analyze the contents of the movie dataset. The initial query to the database will be with the neighborhood of a given actor but the user will also be able to gradually extend the displayed sub-network with additional queries to the Neo4j movie dataset.
<h3>GUI</h3>
The application accepts an actor name and a positive integer (actor number) as input and have a visualization screen (a Cytoscape.js canvas) to show immediate neighborhood of the given actor up to the provided integer, composed of actors and movies with their relationships. 
Actor Number = 1
<img src="https://user-images.githubusercontent.com/59064089/192144903-5c406482-5f1d-4c9f-b4a6-63ed5c91b62b.png" width="800px"/>
Actor Number = 3
<img src="https://user-images.githubusercontent.com/59064089/192145146-8a25b859-fb5d-4141-83fb-9f4ace384d9c.png" width="800px"/>

In addition, when the user right clicks on an actor node, a context menu  appears with the sole content of “Show movies”. When the user selects this option, all movies in which that actor played are added to the current graph if not already in the graph. In the same way, when a user right clicks on a movie node, a context menu  appears with “Show actors”, and upon selection, all actors of that movie, if not already in the graph, are added to the current graph.
<h5>Show actors</h5>
<img src="https://user-images.githubusercontent.com/59064089/192145322-e93bd36d-3c12-4688-8eb3-caef4733b1ab.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/59064089/192145494-5f758402-8548-45d3-9235-94b0571ca354.png" width="800px"/>
<h5>Show movies</h5>
<img src="https://user-images.githubusercontent.com/59064089/192145638-fa766681-bc95-4662-b341-5e10e703cd09.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/59064089/192145645-923fdf63-5bba-4787-88e4-30dbb4b7e93a.png" width="800px"/>

In addition, users can learn the details about the actors, movies or even relationships by selecting them.
<img src="https://user-images.githubusercontent.com/59064089/192145856-6e68e68e-334b-4414-acd4-0443815f8896.png" width="800px"/>


# Deployment Guide 
Built with Node.js version v16.15.1 Use "npm i"to install dependencies. "node app.js" to run in development mode. 
Application use  default movie dataset stored in Neo4j graph database .
For authentication change this part
<img src="https://user-images.githubusercontent.com/59064089/192146260-f05d8c8a-7abd-4abc-86f4-05709f856578.png" width="800px"/>

