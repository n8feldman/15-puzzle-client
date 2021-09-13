import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { userPuzzles, deletePuzzle } from './../../api/puzzle-auth'

class UserPuzzles extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puzzles: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    userPuzzles(user)
      .then((res) => this.setState({ puzzles: res.data.puzzles }))
      .then(() =>
        msgAlert({
          heading: 'Success',
          message: 'Here are your puzzles',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Index failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
  }

  destroy = (puzzleId) => {
    const { user, msgAlert } = this.props
    deletePuzzle(user, puzzleId)
      .then(() => {
        const newPuzzles = Object.assign({}, this.state)
        newPuzzles.puzzles = newPuzzles.puzzles.filter(
          (puzzle) => puzzle._id !== puzzleId
        )
        this.setState({ puzzles: newPuzzles.puzzles })
      })
      .then(() =>
        msgAlert({
          heading: 'Delete success',
          message: 'Puzzle deleted',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Delete failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
  }

  render () {
    const { puzzles } = this.state
    if (this.state.puzzles === null) {
      return <p>Loading...</p>
    }
    let puzzleJsx
    const ownedPuzzles = puzzles.filter(
      (puzzle) => this.props.user._id === puzzle.owner
    )
    if (ownedPuzzles.length === 0) {
      puzzleJsx = (
        <p>
          You have not created any puzzles yet, go create some!
        </p>
      )
    } else {
      puzzleJsx = ownedPuzzles.map((puzzle) => (
        <Card key={puzzle._id}>
          <Card.Body>
            <Card.Title>{puzzle.name}</Card.Title>
            <Card.Text>{puzzle.difficulty}</Card.Text>
            <Button
              onClick={() => this.destroy(puzzle._id)}
            >
              Delete Puzzle
            </Button>
            <Button
              onClick={() =>
                this.props.history.push(`/puzzles/${puzzle._id}/update`)
              }
            >
              Update Puzzle
            </Button>
          </Card.Body>
        </Card>
      ))
    }
    return (
      <>
        <h1 style={{ margin: '0 auto' }}>Welcome!</h1>
        <div>{puzzleJsx}</div>
      </>
    )
  }
}

export default withRouter(UserPuzzles)
