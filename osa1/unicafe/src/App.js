import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value, text2}) => {
  return (
    <tr>
      <td>{text} {value} {text2}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  if ((props.good + props.neutral + props.bad) > 0) 
   return(
     <table>
       <tbody>
         <StatisticLine value={props.good} text='good'/>
         <StatisticLine value={props.neutral} text='neutral'/>
         <StatisticLine value={props.bad} text='bad'/>
         <StatisticLine value={props.good + props.neutral + props.bad} text='all'/>
         <StatisticLine value={Math.round(((props.good + props.bad + props.neutral) / 3) * 10) / 10} text='average'/>
         <StatisticLine value={Math.round((props.good / (props.good + props.bad + props.neutral) * 100) * 10) / 10} text='positive' text2='%'/>
       </tbody>
     </table>
     )
  else
    return <p>No feedback given</p>
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>
        statistics
      </h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>

  )
}

export default App