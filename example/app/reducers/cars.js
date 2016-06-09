import { ADD_CAR } from '../actions/cars'

export default function cars (state = [], action) {
  switch (action.type) {
    case ADD_CAR:
      return [...state, action.payload]
    default:
      return state
  }
}
