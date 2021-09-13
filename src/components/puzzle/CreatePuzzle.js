import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import { Button, Card } from 'react-bootstrap'

import { createPuzzle } from './../../api/puzzle-auth'

class CreatePuzzle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puzzle: {
        name: 'Write your puzzle name here!',
        difficulty: 'Write a number here!'
      }
    }
  }

  handleChange = (event) => {
    const inputName = event.target.name
    const inputValue = event.target.value
    const puzzleCopy = Object.assign({}, this.state.puzzle)
    puzzleCopy[inputName] = inputValue
    this.setState({
      puzzle: puzzleCopy
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert, history } = this.props
    createPuzzle(user, this.state.puzzle)
      .then((res) => history.push('/puzzles'))
      .catch((error) => {
        msgAlert({
          heading: 'Puzzle creation failed',
          message: 'Something went wrong: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, difficulty } = this.state.puzzle
    return (
      <>
        <h1 style={{ margin: '0 auto' }}>
          Create a puzzle!
        </h1>
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Control
                required
                name='name'
                value={name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='difficulty'>
              <Form.Control
                as='textarea'
                rows={1}
                required
                name='difficulty'
                value={difficulty}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type='submit'>
              Create Puzzle
            </Button>
          </Form>
        </Card>
      </>
    )
  }
}

export default withRouter(CreatePuzzle)
