import React, {useState} from 'react';

const Numbers = ({persons, filter}) => (
	persons.filter(p => p.name.toLowerCase().includes(filter)).map(p => <p key={p.name}>{p.name}: {p.number}</p>)
)

const PersonForm = ({doSubmit, setNewName, setNewNumber}) => (
	<form onSubmit={doSubmit}>
		<div> name: <input onChange={x => setNewName(x.target.value)} /> </div>
		<div> number: <input onChange={x => setNewNumber(x.target.value)} /> </div>
		<div> <button type="submit"> add </button> </div>
	</form>
)

const Filter = ({doChange}) => (
	<div>
	Filter: <input onChange={doChange} />
	</div>
)

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '123-456-7890' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setFilter ] = useState('')

	const doSubmit = ev => {
		ev.preventDefault()
		if (!persons.some(p => p.name === newName)) {
			setPersons(persons.concat({name: newName, number: newNumber}))
		} else {
			alert(`${newName} is already in the phonebook`)
		}
	}

	return (
		<div>
		<h2>Phonebook</h2>
		<Filter doChange={x => setFilter(x.target.value.toLowerCase())} />
		<h3>Add Entry</h3>
		<PersonForm doSubmit={doSubmit} setNewName={setNewName} setNewNumber={setNewNumber} />
		<h2>Numbers</h2>
		<Numbers persons={persons} filter={filter} />
		</div>
	)
}

export default App;
