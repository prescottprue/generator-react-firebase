export const ADD_CARS = 'ADD_CAR'
export const REMOVE_CARS = 'REMOVE_CAR'
export const UPDATE_CARS = 'UPDATE_CAR'

export function addCar (cars) {
  return {
    type: 'ADD_CAR',
    payload: cars
  }
}

export function removeCar (index) {
  return {
    type: 'REMOVE_CAR',
    payload: index
  }
}

export function updateCar (index, carData) {
  return {
    type: 'UPDATE_CAR',
    index: carData,
    payload: carData
  }
}
