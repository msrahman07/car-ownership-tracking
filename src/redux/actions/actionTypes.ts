import { Car } from "../../components/cars/carInterface";
import { Person } from "../../components/persons/personInterface";

export enum ActionTypes {
    SET_RETRIEVE = 'RETRIEVE',
    SET_CREATE = 'CREATE',
    SET_UPDATE = 'UPDATE',
    SET_DELETE = 'DELETE',
}

export enum CarActionTypes {
    SET_CAR_RETRIEVE = 'CAR_RETRIEVE',
    SET_CAR_CREATE = 'CAR_CREATE',
    SET_CAR_UPDATE = 'CAR_UPDATE',
    SET_CAR_DELETE = 'CAR_DELETE',
}

interface SetCreatePersonAction {
    type: string;
    payload: Person[];
}
interface SetCreateCarAction {
    type: string;
    payload: Car[];
}

export type CreateAction = SetCreatePersonAction;
export type CreateCarAction = SetCreateCarAction;