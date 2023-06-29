const Name = ({person, deletePerson}) => {
	//console.log('Name')
  return(
	  <p>{person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
	)
}

const Persons = ({persons, deletePerson}) => {
  return(
    <div>
      {persons.map((person, i) =>
        < Name key={i} person={person} deletePerson={deletePerson} />
      )}
    </div>
  )
}

export default Persons