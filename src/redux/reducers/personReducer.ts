import { Person } from '../../components/persons/personInterface';
import { ActionTypes, CreateAction } from '../actions/actionTypes';

const initState = {
    persons: []
}

const personReducer = (state: {persons: Person[]} = initState, action:CreateAction) => {
    switch (action.type) {
        case ActionTypes.SET_CREATE: {
            let persons: Person[] = [...state.persons, ...action.payload];
            return { ...state, persons };
        }
        case ActionTypes.SET_RETRIEVE: {
            let persons: Person[]= action.payload
            return {...state, persons};
        }
        case ActionTypes.SET_UPDATE: {
            const index = state.persons.findIndex(
                    person => person.id === action.payload[0].id
                )
            let persons: Person[]= [...state.persons]
            persons[index] = action.payload[0]
            return {...state, persons};
        }
        case ActionTypes.SET_DELETE: {
            let persons: Person[]= state.persons.filter(person => person.id !== action.payload[0].id)
            return {...state, persons};
        }
        default:{
            return state
        }
    }
}
export default personReducer;