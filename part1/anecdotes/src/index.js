import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState((new Array(props.anecdotes.length)).fill(0))
	const [highest, setHighest] = useState(0)

	const nextAnecdote = () => {
		setSelected(Math.floor(Math.random() * props.anecdotes.length))
	}

	const doVote = () => {
		let newVotes = [...votes]
		newVotes[selected] += 1
		if (newVotes[selected] > newVotes[highest] && selected !== highest) {
			setHighest(selected)
		}
		setVotes(newVotes)
	}

	return (
		<div>
		<h1>Anecdote of the day</h1>
		<p>{props.anecdotes[selected]}</p>
		<p>Votes: {votes[selected]}</p>
		<button onClick={nextAnecdote}>
			Next Anecdote
		</button>
		<button onClick={doVote}>
			Vote
		</button>
		<h1>People&apos;s choice</h1>
		<p>{props.anecdotes[highest]}</p>
		<p>Votes: {votes[highest]}</p>
		</div>
	)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
