import { Car } from "../cars/carInterface";

interface I_Person {
    id?: number;
    first_name: string | undefined,
    last_name: string | undefined,
    email: string | undefined,
    cars: Car[],
}

export type Person = I_Person