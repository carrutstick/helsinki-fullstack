import React from 'react'

const Header = (props) => {
	return (<h1>{props.name}</h1>)
}

const Part = (props) => {
	return (<>
	<p> {props.parts.name}: {props.parts.exercises} </p>
	</>)
}

const Content = ({parts}) => {
	return (<>
		{parts.map((x) => <Part key={x.id} parts={x} />)}
	</>)
}

const Course = ({course}) => {
	return (
		<div>
		<Header name={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
		</div>
	)
}

const Total = (props) => (
	<p><b>Number of exercises: {props.parts.map(a => a.exercises).reduce((a, b) => a + b)}</b></p>
)

export default Course
