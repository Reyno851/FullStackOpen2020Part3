require('dotenv').config() // <- This should be first line to ensure environment variables are avaialble globally before other codes run
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

// Order of middleware is important!
// When using app.use(), ALL requests will use the middleware specified
app.use(express.static('build')) // static middleware
app.use(express.json()) // json-parser middleware --> Must be one of the first middlewares to be loaded, or else request.body objects will be empty
app.use(cors()) // cors middleware

var morgan = require('morgan')

// Create a token for the body of POST request here
morgan.token('body', (req) => {
  // Use JSON.stringify or else req.body alone with return [object Object]
  return JSON.stringify(req.body)
})

// morgan.token('type', function (req, res) { return req.headers['content-type'] })
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res), // Use custom body token here
    ].join(' ')
  })
)

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

// When handling any request, code here is the LAST of logic to be exeucted after middlewares
// defined in app.use(). That is why we have the "next" parameter in middleware functions
// which tells middleware to move on to the next piece of code after running
app.get('/api/persons', (request, response) => {
  // Use .find({}) on Person model to search through all persons in database
  Person.find({}).then((persons) => {
    response.json(persons) // This returns all persons in list in json format
  })
})

// app.get("/api/persons", (request, response) => {
//   response.send(persons);
// });

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    // Use .find({}) first to get info of all persons in database
    var personsLength = persons.length // Get total number of persons
    var date = new Date() // Get current date
    // Use <br> to break line as the content type of the GET request is text/html
    // which means that the response understands html syntax
    response.send(
      `Phonebook has info for ${personsLength} people <br> ${date}`
    )
  })
})

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((note) => note.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        // If id of person exists
        response.json(person) // Return person
      } else {
        // Else if id does not exist BUT it is in correct format
        console.log('id is in correct format but doesnt exist')
        response.status(404).end() // Return code 404
      }
    })
    .catch((error) => {
      // Else if id does not exist AND it is wrong format
      console.log(error)
      // response.status(400).send({ error: 'malformatted id' })
      next(error) // Send error to error handler middleware defined below
    })
})

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      // Both successful cases of deleting existing and non-existing ids will
      // result in error code 204. Can handle and set different error codes
      // here using result as well. However, it is not done here for this assignment.
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// var getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
// };

// app.post("/api/persons", (request, response) => {
//   const newID = getRandomInt(10, 100);

//   const person = request.body;
//   person.id = newID;

//   if (!person.name) {
//     return response.status(400).json({
//       error: "name missing",
//     });
//   } else if (!person.number) {
//     return response.status(400).json({
//       error: "number missing",
//     });
//   } else if (persons.some((contact) => contact.name === person.name)) {
//     return response.status(400).json({
//       error: "name must be unique",
//     });
//   } else {
//     persons = persons.concat(person);

//     response.json(person);
//   }
// });

// Handling PUT request when user tries to update a name that already exists in phonebook
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  // Use { new: true } to call new modified document instead of original
  // Mongoose validators are off by default for update operations. Set
  // runValidators: true and context: query for validation to work
  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query', new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.find({}).then(() => {
    // if (body.name === undefined) {
    //   return response.status(400).json({ error: "name missing" });
    // } else if (body.number === undefined) {
    //   return response.status(400).json({ error: "number missing" });
    // }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person
      .save()
      .then((savedPerson) => {
        response.json(savedPerson)
      })
      .catch((error) => next(error)) // Push any errors to errorHandler middleware
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoint
// Note: Must put this almost at the end, as if we put this middleware at the top,
// it responds to ALL requests with error code 404. We put it at the end so that
// only if there is an unknown endpoint, will the error show up
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
