import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { Car } from './carInterface';
import { RootState } from "../../redux/reducers";
import { actSetRetrieveCars } from '../../redux/actions/car';
import SingleCar from './SingleCar';
// import SinglePerson from './SinglePerson';

interface Props {
    personId: number;
}

const Cars = ({ personId }: Props) => {
    //   const [persons, setPersons] = useState<Person[]>([]);
    const cars: Car[] = useSelector((state: RootState) => { return state.carReducer.cars })
    const [loading, setLoading] = useState<boolean>(true);
    const filteredCars = cars.filter(car => car.person_id === personId);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get<Car[]>("http://localhost:3000/cars/",
            {
                params: {
                    person_id: personId,
                }
            }
        ).then((res) => {
            dispatch(actSetRetrieveCars(res.data));
            // setPersons([...res.data]);
            setLoading(false);
        })
            .catch((err) => {
                console.log(err);
            })

    }, [personId]);
    if (loading) {
        console.log("loading...")
    }
    return (
        
        <div>
            {(filteredCars.length !== 0) && <div>Cars</div>}
            {filteredCars.map((car) => (
                <SingleCar key={car.id} car={car} />
            ))}

        </div>
    )
}

export default Cars