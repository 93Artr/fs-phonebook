require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', req =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// app.use(morgan('tiny'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
  const infoStr = `<p>Phonebook has info for ${Person.length} people</p>
  <p>${new Date()}</p>`
  response.send(infoStr)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      !person ? response.status(404).end() : response.json(person)
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const { body } = request

  if (!body.name || !body.number) {
    return response.status(400).json({ message: 'Name or number is missing' })
  }
  // else if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({ message: "Name must be unique" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// olemattomien osoitteiden k??sittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // console.log(error)
  next(error)
}
// virheellisten pyynt??jen k??sittely
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

////////////////////////////////////////////////////////////
// vanha koodi ennen mongoDB

/*

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

const person = new Person({
  name: newName,
  number: newNumber,
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  !person ? response.status(404).end() : response.json(person);
});

// const generateID = () => Math.trunc(Math.random() * 10000);

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

*/
