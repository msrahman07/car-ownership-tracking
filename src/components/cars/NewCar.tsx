import React, { SyntheticEvent, useRef, useState } from 'react';
import axios from 'axios';
import { Car } from './carInterface';
import { useSelector, useDispatch } from "react-redux";
import { actSetCreateCar } from '../../redux/actions/car';
import { RootState } from '../../redux/reducers';
import { Person } from '../persons/personInterface';

const NewCar: React.FC = () => {
    const inputYear = useRef<HTMLInputElement>(null);
    const inputMake = useRef<HTMLInputElement>(null);
    const inputModel = useRef<HTMLInputElement>(null);
    const inputPrice = useRef<HTMLInputElement>(null);
    const inputPersonId = useRef<HTMLSelectElement>(null);
    const [disableBtn, setDisableBtn] = useState<boolean>(true);
    const dispatch = useDispatch();
    const persons: Person[] = useSelector((state: RootState) => { return state.personReducer.persons })
    const [hideForm, setHideForm] = useState<boolean>(true);
    const [hideSuccess, setHideSuccess] = useState<boolean>(true);
    
    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        const fetchData = async () => {
            await axios.post<Car>(
                'http://localhost:3000/cars/',
                {
                    'year': inputYear.current?.value,
                    'make': inputMake.current?.value,
                    'model': inputModel.current?.value,
                    'price': inputPrice.current?.value,
                    'person_id': inputPersonId.current?.value,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    let car: Car = res.data;
                    dispatch(actSetCreateCar([car]));
                    if (inputYear.current && inputMake.current && inputModel.current && inputPrice.current) {
                        inputYear.current.value = "";
                        inputMake.current.value = "";
                        inputModel.current.value = "";
                        inputPrice.current.value = "";
                    };
                    setHideSuccess(false);
                })
                .catch(err => console.log(err));
        }
        fetchData().catch(err => console.log(err));
        showFormHandler();
    };
    const showFormHandler = () => {
        (hideForm) ? setHideForm(false) : setHideForm(true);
    };
    setTimeout(() => {
        setHideSuccess(true);
    }, 2000);

    const activateForm = () => {
        if(inputMake.current && inputModel.current && inputYear.current && inputPrice.current && inputPersonId.current){
            (inputMake.current.value !=="" && inputModel.current.value !=="" && inputYear.current.value !=="" && inputPrice.current.value !=="" && inputPersonId.current.value !=="")? (
                setDisableBtn(false) 
            ):(setDisableBtn(true))
        } 
    }

    return (
        <div>
            <div className="alert alert-success" role="alert" hidden={hideSuccess}>
                New car created!
            </div>
            <button type="button" className="btn btn-info" onClick={showFormHandler}>Create New Car</button>
            <form className="form-vertical" onSubmit={submitHandler} hidden={hideForm}>
                <div className="form-group">
                    <label htmlFor="year" />
                    <input
                        className="form-control"
                        type="number"
                        name="year"
                        placeholder="Year"
                        ref={inputYear}
                        onChange={activateForm}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="make" />
                    <input
                        className="form-control"
                        type="text"
                        name="make"
                        placeholder="Make"
                        onChange={activateForm}
                        ref={inputMake}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="model" />
                    <input
                        className="form-control"
                        type="text"
                        name="model"
                        placeholder="Model"
                        onChange={activateForm}
                        ref={inputModel}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price" />
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={activateForm}
                        ref={inputPrice}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="owner" className="select_label" />
                    <select className="form-control" ref={inputPersonId} onChange={activateForm}>
                        <option value="" defaultValue="Choose an owner" >Choose an owner</option>
                        {persons.map(person => (
                            <option key={person.id} value={person.id}>{person.first_name}</option>
                        ))}
                    </select>
                </div>
                <button className='btn btn-primary' type="submit" disabled={disableBtn}>Create New Car</button>
            </form>
        </div>
    )
}
export default NewCar;