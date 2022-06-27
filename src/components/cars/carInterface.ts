interface I_Car {
    id?: number;
    year: number | undefined,
    make: string | undefined,
    model: string | undefined,
    price: number | undefined,
    person_id: number
}

export type Car = I_Car