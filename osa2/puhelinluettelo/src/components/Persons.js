const Name = ({person}) => {
	//console.log('Name')
  return(
	  <p>{person.name} {person.number}</p>
	)
}

const Persons = ({personsToShow}) => {
    return(
      <div>
        {personsToShow.map(person =>
          < Name key={person.name} person={person} />
        )}
      </div>
    )
}

export default Persons