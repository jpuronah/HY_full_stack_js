const Header = (props) => {
	return(
	  <h2>
		{props.course.name}
	  </h2> 
	)
  }
  
  const Total = ({parts}) => {
	const total = parts.reduce((sum, part) => 
	  sum + part.exercises, 0)
	return(
	  <p>
		<b>Total of exercises {total}</b>
	  </p>    
	)
  }
  
  const Part = ({part}) => {
	return(
	  <p>
		{part.name} {part.exercises}
	  </p>
	)
  }
  
  const Content = ({parts}) => {
	return(
	  <div>
		{parts.map((part) =>
		  <Part key = {part.id} part={part} />
		)}
	  </div>
	)
  }
  
  const Course = ({course}) => {
	return(
	  <div>
		<Header course={course} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	  </div>
	)
  }
  
export default Course