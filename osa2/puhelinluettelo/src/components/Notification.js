const Notification = ({ message, type }) => {
	//console.log("Message", message)
	//console.log("type", type)
	if (type === -10) {
	  return null
	}
	else if (type === 0) {
	  return (
		<div className="success">
		  Added {message}
		</div>
	  )
	}
	else if (type === 1) {
		return (
		  <div className="modify">
			Modified {message}
		  </div>
		)
	}
	else if (type === -1) {
	  return (
		<div className="remove">
		  Removed {message}
		</div>
	  )
	}
	else if (type === -9) {
		return (
		  <div className="error">
			Information of {message} has already been removed from server
		  </div>
		)
	  }
}

export default Notification
