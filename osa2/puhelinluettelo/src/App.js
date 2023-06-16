import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [showAll] = useState(true)
  
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearch = (event) => { setSearchInput(event.target.value) }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
      //id: persons.length + 1,
    }
    const nameInList = persons.some((person) => person.name === newName)
  
    if (nameInList) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      // console.log('button clicked', event.target)
    }
  }
  const filterPersons = persons.filter((person) =>
    person.name.includes(searchInput)
  )
  const personsToShow = showAll
    ? filterPersons
    : filterPersons.filter(person => person.important === true)
  
  return (
    <div>
      <h2>Phonebook</h2>
      < Filter searchInput={searchInput} handleSearch={handleSearch}/>
      <h3>add a new</h3>
      < PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>
      <h3>Numbers</h3>
      < Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
