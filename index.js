const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { response } = require("express");

morgan.token("body", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

const app = express();

app.use(express.json());
app.use(cors());

// app.use(morgan('tiny'));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abrmov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Phonebook</h1>");
});

app.get("/info", (request, response) => {
  const infoStr = `<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`;
  response.send(infoStr);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  !person ? response.status(404).end() : response.json(person);
});

const generateID = () => Math.trunc(Math.random() * 10000);

app.post("/api/persons/", (request, response) => {
  const { body } = request;
  // console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({ message: "Name or number is missing" });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ message: "Name must be unique" });
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // console.log(request.body);
  const editablePerson = persons.find((person) => person.id === id);
  // console.log(editablePerson);
  editablePerson.number = request.body.number;
  response.json(editablePerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  //   console.log(id);
  persons = persons.filter((person) => person.id !== id);
  //   console.log(persons);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
