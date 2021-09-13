import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Card } from 'react-bootstrap'
import { updatePuzzle, onePuzzle } from './../../api/puzzle-auth'

class UpdatePuzzle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puzzle: {
        name: '',
        difficulty: ''
      }
    }
  }

  componentDidMount () {
    onePuzzle(this.props.user, this.props.match.params.id)
      .then((response) =>
        this.setState({
          puzzle: {
            name: response.data.puzzle.name,
            difficulty: response.data.puzzle.difficulty
          }
        })
      )
      .then(() =>
        this.props.msgAlert({
          heading: 'Success',
          message: 'Make your changes then press the Update Puzzle button.',
          variant: 'success'
        })
      )
      .catch((error) => {
        this.props.msgAlert({
          heading: 'Failed to fetch puzzle',
          message: 'Something went wrong: ' + error.message,
          variant: 'danger'
        })
      })
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

  handleSubmit = (puzzleId) => {
    event.preventDefault()
    const { user, msgAlert, history } = this.props
    updatePuzzle(user, puzzleId, this.state.puzzle)
      .then((res) => history.push('/puzzles'))
      .catch((error) => {
        msgAlert({
          heading: 'Puzzle update failed',
          message: 'Something went wrong: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, difficulty } = this.state.puzzle
    return (
      <>
        <h1 style={{ margin: '0 auto' }}>Update Your Puzzle!</h1>
        <Card>
          <Form onSubmit={() => this.handleSubmit(this.props.match.params.id)}>
            <Form.Group controlId='name'>
              <Form.Control
                required
                name='name'
                value={name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group
              controlId='difficulty'>
              <Form.Control
                required
                name='difficulty'
                value={difficulty}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div>
              <Button type='submit'>
                Update Puzzle
              </Button>
            </div>
          </Form>
        </Card>
      </>
    )
  }
}

export default withRouter(UpdatePuzzle)
