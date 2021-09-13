import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPuzzle = (user, puzzleData) => {
  console.log(puzzleData)
  return axios({
    method: 'POST',
    url: apiUrl + '/puzzles',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      puzzle: {
        name: puzzleData.name,
        difficulty: puzzleData.difficulty
      }
    }
  })
}

export const userPuzzles = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/puzzles',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deletePuzzle = (user, puzzleId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/puzzles/' + puzzleId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const onePuzzle = (user, puzzleId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/puzzles/' + puzzleId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updatePuzzle = (user, puzzleId, puzzleData) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/puzzles/' + puzzleId,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      puzzle: {
        name: puzzleData.name,
        difficulty: puzzleData.difficulty
      }
    }
  })
}
