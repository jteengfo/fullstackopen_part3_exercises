const express = require('express')
const app = express()

app.use(express.json()) // json to object to be tied to the request body before put to route

// [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const contactSize = persons.length
    const date = new Date().toString()

    response.send(
        `<p>The Phonebook has ${contactSize} entries</p>
        <br>
        <p>${date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    // console.log(request.params.id);
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        console.log(`before persons: ${persons}`);
        newPersons = persons.filter(person => person.id !== id)
        persons = newPersons
        console.log(`after persons: ${persons}`);
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons/', (request, response) => {
    
    const body = request.body

    // check if there is a body sent; if not send 404 
    if (!body.name ||!body.number) {
        return response.status(404).json({
            error: 'name or number missing'
        })
    }
    
    if (persons.find(person => person.name === body.name)) {
        return response.status(404).json({
            error: 'name already exists'
        })
    }


    // verified body content exists, create new person

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateID()
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const generateID = () => {
    // const maxID = persons.length > 0 
    //     ? Math.max(...persons.map(person => person.id)) 
    //     : 0
    
    // return maxID + 1

    return Math.floor(Math.random() * 5000)
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})