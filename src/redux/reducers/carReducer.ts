import { Car } from '../../components/cars/carInterface';
import { CarActionTypes, CreateCarAction } from '../actions/actionTypes';

const initState = {
    cars: []
}

const carReducer = (state: {cars: Car[]} = initState, action:CreateCarAction) => {
    switch (action.type) {
        case CarActionTypes.SET_CAR_CREATE: {
            let cars: Car[] = [...state.cars, ...action.payload];
            return { ...state, cars };
        }
        case CarActionTypes.SET_CAR_RETRIEVE: {
            let cars: Car[]= action.payload
            return {cars};
        }
        case CarActionTypes.SET_CAR_UPDATE: {
            const index = state.cars.findIndex(
                    car => car.id === action.payload[0].id
                )
            let cars = [...state.cars]
            cars[index] = action.payload[0]
            return { ...state, cars };
        }
        case CarActionTypes.SET_CAR_DELETE: {
            let cars: Car[]= state.cars.filter(car => car.id !== action.payload[0].id)
            return {...state, cars};
        }
        default:{
            return state
        }
    }
}
export default carReducer;