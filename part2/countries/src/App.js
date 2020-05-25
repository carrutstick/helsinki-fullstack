import React, {useState, useEffect} from 'react';
import axios from 'axios'

const SearchForm = ({setSearch}) => (
	<form>
	Search: <input onChange={ev => setSearch(ev.target.value)} />
	</form>
)

const Weather = ({city}) => {
	const [weather, setWeather] = useState(undefined)
	const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}&units=m`
	useEffect(() => { axios.get(url).then(response => {setWeather(response.data)}) }, [url])
	if (weather === undefined) {
		return (<p>Waiting for weather server...</p>)
	} else {
		const current = weather.current
		return (<div>
			<p>{current.weather_description}</p>
			<p>Temperature: {current.temperature} degrees Celcius</p>
			<p>Wind: {current.wind_speed}km/h {current.wind_dir}</p>
			<img alt="weather icon" src={current.weather_icons[0]} />
			</div>)
	}
}

const Country = ({country}) => {
	const [show, setShow] = useState(false)

	if (show) {
		return (
			<div key={country.alpha3Code}>
			<h2>{country.name}</h2>
			<button onClick={ev => setShow(false)}>Hide</button>
			<p>Capital: {country.capital}</p>
			<p>Popultaion: {country.population}</p>
			<h3>Languages:</h3>
			<ul>
				{country.languages.map(l => <li key={l.name}>{l.name} -- {l.nativeName}</li>)}
			</ul>
			<img src={country.flag} alt={country.name} width="300px" />
			<h3>Weather in {country.capital}:</h3>
			<Weather city={country.capital} />
			</div> )
	} else {
		return (
			<div key={country.alpha3Code}>
			<h2>{country.name}</h2>
			<button onClick={ev => setShow(true)}> Show </button>
			</div>
		)
	}
}

const SearchResults = ({search, countries}) => {
	const results = countries
		.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
	if (countries.length === 0){
		return <p>Waiting for country data...</p>
	} else if (results.length > 30) {
		return <p>Too many results to display.</p>
	} else if (results.length > 0) {
		return results.map(c => <Country key={c.alpha3Code} country={c} />)
	} else {
		return <p>No results found.</p>
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => setCountries(response.data))
	}, [])
	return (
		<div>
		<h1>Search Countries:</h1>
		<SearchForm setSearch={setSearch} />
		<h1>Results:</h1>
		<SearchResults search={search} countries={countries} />
		</div>
	)
}

export default App;
