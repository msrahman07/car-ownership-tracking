import { Person } from '../../components/persons/personInterface';
import { ActionTypes } from './actionTypes';

export const actSetCreate = (person: Person[]) => {
    return {
        type: ActionTypes.SET_CREATE,
        payload: person
    }
}

export const actSetRetrieve = (persons: Person[]) => {
    return {
        type: ActionTypes.SET_RETRIEVE,
        payload: persons
    }
}

export const actSetUpdate = (persons: Person[]) => {
    return {
        type: ActionTypes.SET_UPDATE,
        payload: persons
    }
}

export const actSetDelete = (persons: Person[]) => {
    return {
        type: ActionTypes.SET_DELETE,
        payload: persons
    }
}
