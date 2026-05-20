// in deployment you need to have dotenv, default it is in the node
import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000; // secret and secured information

app.use(express.json()); // accepring data in json

let teaData = [];
let nextId = 1;
//business logic

//add a new tea
app.post("/teas", (req, res) => {
  //req.body.price
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  // provide id
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name; // new
  //  name and price
  tea.price = price;

  res.status(200).send(tea);
});

//delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("tea index not foun");
  }

  teaData.splice(index, 1);

  return res.status(204).send("Tea deleted");
});

// app.get("/", (req, res) => {
//   res.send("Hello from vett");
// });

// app.get("/ice-tea", (req, res) => {
//   res.send("what ice tea would you prefer");
// });

// app.get("/twitter", (req, res) => {
//   res.send("vettdotcom");
// });

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
