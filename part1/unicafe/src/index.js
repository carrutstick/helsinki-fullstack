import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({setter, value, text}) => (
	<button onClick={() => setter(value + 1)}>
		{text}
	</button>
)

const Statistic = ({text, value}) => (
	<tr>
	<td> {text} </td>
	<td> {value} </td>
	</tr>
)

const Statistics = ({good, bad, neutral}) => {
	if (good + bad + neutral > 0) {
		return (<table>
		<tbody>
		<Statistic text='good' value={good} />
		<Statistic text='neutral' value={neutral} />
		<Statistic text='bad' value={bad} />
		<Statistic text='all' value={good + bad + neutral} />
		<Statistic text='average' value={((good - bad) / (good + bad + neutral)).toFixed(2)} />
		<Statistic text='positive' value={(good / (good + bad + neutral)).toFixed(2) + '%'} />
		</tbody>
		</table>)
	} else {
		return (<>
		<p>No feedback given</p>
		</>)
	}
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
		<h1>give feedback</h1>
		<Button text='good' value={good} setter={setGood} />
		<Button text='neutral' value={neutral} setter={setNeutral} />
		<Button text='bad' value={bad} setter={setBad} />
		<h1>statistics</h1>
		<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
