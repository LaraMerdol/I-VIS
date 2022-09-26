# I-VIS
i-Vis Engineer Exercise 
<h3>Use Cases</h3>
The application is to mainly display a neighborhood of a given actor or a specific movie to visually analyze the contents of the movie dataset. The initial query to the database will be with the neighborhood of a given actor but the user will also be able to gradually extend the displayed sub-network with additional queries to the Neo4j movie dataset.
<h3>GUI</h3>
The application accepts an actor name and a positive integer (actor number) as input and have a visualization screen (a Cytoscape.js canvas) to show immediate neighborhood of the given actor up to the provided integer, composed of actors and movies with their relationships. 

<h5>Actor Number = 1</h5>
<img src="https://user-images.githubusercontent.com/59064089/192360702-43476da9-a1d9-48c5-b75f-4f92212ac89c.png" width="800px"/>
<h5>Actor Number = 2</h5>
<img src="https://user-images.githubusercontent.com/59064089/192360770-7bf1e9c1-d94c-4a70-9231-11550162ea2d.png" width="800px"/>

In addition, when the user right clicks on an actor node, a context menu  appears with content of “Show movies”,"Show Directed Movies","Show Followings" and etc. When the user selects this option, all movies or peoples in which that people related to are added to the current graph if not already in the graph. In the same way, when a user right clicks on a movie node, a context menu  appears with “Show actors”, "Show directors"..and upon selection, all related people of that movie, if not already in the graph, are added to the current graph.
<h5>Show actors (Past)</h5>
<img src="https://user-images.githubusercontent.com/59064089/192145322-e93bd36d-3c12-4688-8eb3-caef4733b1ab.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/59064089/192145494-5f758402-8548-45d3-9235-94b0571ca354.png" width="800px"/>
<h5>Show Directors (New)</h5>
<img src="https://user-images.githubusercontent.com/59064089/192361425-04bfb184-92cb-4e35-89d9-489d5a166033.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/59064089/192361438-acf408a5-3a90-449b-9390-5328b632fc2e.png" width="800px"/>
<h5>Show movies (Past)</h5>
<img src="https://user-images.githubusercontent.com/59064089/192145638-fa766681-bc95-4662-b341-5e10e703cd09.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/59064089/192145645-923fdf63-5bba-4787-88e4-30dbb4b7e93a.png" width="800px"/>
<h5>Show Produced Moviea (New)</h5>
<img src="https://user-images.githubusercontent.com/59064089/192361468-5058d21c-b9eb-4eab-acd9-03f588321a6d.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/59064089/192361494-44a1e17f-5789-4b8d-b51d-d88cd91b9e08.png" width="800px"/>
In addition, users can learn the details about the actors, movies or even relationships by selecting them.
<img src="https://user-images.githubusercontent.com/59064089/192361845-16b01a68-405c-4331-9014-ef75ef1ff7ca.png" width="800px"/>
# Deployment Guide 
Built with Node.js version v16.15.1 Use "npm i"to install dependencies. "node app.js" to run in development mode. Application starts in port http://localhost:3000/

Application use  default movie dataset stored in Neo4j graph database .
For authentication change this part
<img src="https://user-images.githubusercontent.com/59064089/192146260-f05d8c8a-7abd-4abc-86f4-05709f856578.png" width="800px"/>

