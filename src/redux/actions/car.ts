import { Car } from '../../components/cars/carInterface';
import { CarActionTypes } from './actionTypes';

export const actSetCreateCar = (car: Car[]) => {
    return {
        type: CarActionTypes.SET_CAR_CREATE,
        payload: car
    }
}

export const actSetRetrieveCars = (cars: Car[]) => {
    return {
        type: CarActionTypes.SET_CAR_RETRIEVE,
        payload: cars
    }
}

export const actSetUpdateCar = (cars: Car[]) => {
    return {
        type: CarActionTypes.SET_CAR_UPDATE,
        payload: cars
    }
}

export const actSetDeleteCar = (cars: Car[]) => {
    return {
        type: CarActionTypes.SET_CAR_DELETE,
        payload: cars
    }
}
