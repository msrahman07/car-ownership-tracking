import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { Person } from './personInterface';
import { RootState } from "../../redux/reducers";
import { actSetRetrieve } from '../../redux/actions/person';
import SinglePerson from './SinglePerson';
import { Car } from '../cars/carInterface';

const Persons: React.FC = () => {
    //   const [persons, setPersons] = useState<Person[]>([]);
    const persons: Person[] = useSelector((state: RootState) => { return state.personReducer.persons })
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const cars: Car[] = useSelector((state: RootState) => { return state.carReducer.cars })

    useEffect(() => {
        const fetchData = async () => {
            await axios.get<Person[]>("http://localhost:3000/persons").then((res) => {
                dispatch(actSetRetrieve(res.data));
                // setPersons([...res.data]);
                setLoading(false);
            })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchData().catch((err) => { console.log(err); });
    }, [cars]);
    if (loading) {
        console.log("loading...")
    }
    return (
        <div>
            {(persons.length !== 0) && <div className="owner-heading">Owners</div>}
            {persons.map((person) => (
                <div key={person.id} className="sec">
                    <SinglePerson person={person} />
                </div>
            ))}
        </div>
    )
}

export default Persons