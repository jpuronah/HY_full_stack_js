const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}

App.return


return (
  <div>
    <h2>Phonebook</h2>
    {<form>
      <div>
        filter shown with: <input 
        value={searchInput}
        onChange={handleSearch}
        />
      </div>
    </form>}
    {/*<div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'} 
      </button>
    </div>*/}
    {/*<ul>
      {personsToShow.map(person =>
        < Name key={person.id} person={person} />
      )}
    </ul>*/}
    <h2>add a new</h2>
    <form onSubmit={addName}>
      <div>
        name: <input 
        value={newName}
        onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input 
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <div>
      {personsToShow.map(person =>
        < Name key={person.name} person={person} />
      )}
    </div>
  </div>
)