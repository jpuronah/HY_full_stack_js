import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [showAll] = useState(true)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState(-10)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearch = (event) => { setSearchInput(event.target.value) }

  // Add new person
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    //console.log("create person")
    const nameInList = persons.some((person) => person.name === newName)

    // Check IF name exists
    if (nameInList) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        // Modify existing person
        const match = persons.find(person => person.name === newName)
        personService
        .update(match.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => (person.id === returnedPerson.id ? returnedPerson : person)))

        // Set notification parameters
        setNotification(personObject.name)
        setNotificationType(1)
        setTimeout(() => {
          setNotificationType(-10)
        }, 3000)
        })
        .catch(() => {
          setNotification(personObject.name)
          setNotificationType(-9)
          setTimeout(() => {
            setNotificationType(-10)
          }, 5000)
        })
      }
    }
    // Else
    else {
      // Add new person
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          
          // Set notification parameters
          setNotification(personObject.name)
          setNotificationType(0)
          setTimeout(() => {
            setNotificationType(-10)
          }, 3000)
        })
        .catch(() => {
          setNotification(personObject.name)
          setNotificationType(-9)
          setTimeout(() => {
            setNotificationType(-10)
          }, 5000)
        })
    }
    // Reset forms
    setNewName('')
    setNewNumber('')
  }

  // Delete existing person
  const deletePerson = (props) => {
    const personToDelete = persons.find(person => person.id === props);
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirmed) {
      // Remove new person
      axios
        .delete(`http://localhost:3001/persons/${props}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== props))

        // Set notification parameters
        setNotification(personToDelete.name)
        setNotificationType(-1)
        setTimeout(() => {
          setNotificationType(-10)
        }, 3000)
        })
      .catch(() => {
        setNotification(personToDelete.name)
        setNotificationType(-9)
        setTimeout(() => {
          setNotificationType(-10)
        }, 5000)
      })
    }
    // Reset forms
    setNewName('')
    setNewNumber('')
    return(0)
  }

  const filterPersons = persons.filter(person => {
    // Filter person list
    console.log("searchInput", searchInput)
    return person.name.includes(searchInput)
  });

  return (
    <div>
      <h2>Phonebook</h2>
      < Notification message={notification} type={notificationType} />
      < Filter searchInput={searchInput} handleSearch={handleSearch} />
      <h3>add a new</h3>
      < PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
      <h3>Numbers</h3>
      < Persons persons={filterPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
