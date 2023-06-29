import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [showAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearch = (event) => { setSearchInput(event.target.value) }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log("create person")
    const nameInList = persons.some((person) => person.name === newName)
  
    console.log("create person logic alert")
    if (nameInList) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        const match = persons.find(person => person.name === newName)
        const updatedPerson = {...match, number: newNumber}
        personService
        .update(match.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const filterPersons = persons.filter(person => {
    //console.log("Filteropersib")
    return person.name.includes(searchInput)
  });

  const personsToShow = showAll
    ? filterPersons
    : filterPersons.filter(person => person.important === true)
  
  const deletePerson = (props) => {
    const personToDelete = persons.find(person => person.id === props);
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmed) {
      axios
        .delete(`http://localhost:3001/persons/${props}`)
        .then(response => {
          //console.log("response.data", response.data)
          setPersons(persons.filter(person => person.id !== props))
        })
    }
    setNewName('')
    setNewNumber('')
    return(0)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      < Filter searchInput={searchInput} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      < PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>
      <h3>Numbers</h3>
      < Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
