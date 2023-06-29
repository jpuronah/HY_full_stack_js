const Name = ({person, deletePerson}) => {
	//console.log('Name')
  return(
	  <p>{person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
	)
}

const Persons = ({personsToShow, deletePerson}) => {

  //console.log("personsToShow", personsToShow)
  return(
    <div>
      {personsToShow.map((person, i) =>
        < Name key={i} person={person} deletePerson={deletePerson} />
      )}
    </div>
  )
}


export default Persons