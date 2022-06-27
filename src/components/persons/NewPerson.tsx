import React, { SyntheticEvent, useRef, useState } from 'react';
import axios from 'axios';
import { Person } from './personInterface';
import { useDispatch } from "react-redux";
import { actSetCreate } from '../../redux/actions/person';

const NewPerson: React.FC = () => {
    const inputFirstName = useRef<HTMLInputElement>(null);
    const inputLastName = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const [hideForm, setHideForm] = useState<boolean>(true);
    const [hideSuccess, setHideSuccess] = useState<boolean>(true);
    const [disableBtn, setDisableBtn] = useState<boolean>(true);

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(inputFirstName.current?.value);
        axios.post<Person>(
            'http://localhost:3000/persons/',
            {
                'first_name': inputFirstName.current?.value,
                'last_name': inputLastName.current?.value,
                'email': inputEmail.current?.value,
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                let person: Person = res.data;
                dispatch(actSetCreate([person]));
                if (inputFirstName.current && inputLastName.current && inputEmail.current) {
                    inputFirstName.current.value = "";
                    inputLastName.current.value = "";
                    inputEmail.current.value = "";
                };
                setHideSuccess(false);
            })
            .catch(err => console.log(err));
            showFormHandler();
    };
    const showFormHandler = () => {
        (hideForm) ? setHideForm(false) : setHideForm(true);
    };
    setTimeout(() => {
        setHideSuccess(true);
    }, 2000);

    const activateForm = () => {
        if(inputFirstName.current && inputLastName.current && inputEmail.current){
            (inputFirstName.current.value !=="" && inputLastName.current.value !=="" && inputEmail.current.value !=="")? (
                setDisableBtn(false) 
            ):(setDisableBtn(true))
        } 
    }
    return (
        <div>
            <div className="alert alert-success" role="alert" hidden={hideSuccess}>
                New Owner created!
            </div>
            <button type="button" className="btn btn-info" onClick={showFormHandler}>Create New Owner</button>
            <form onSubmit={submitHandler} hidden={hideForm}>
                <div className="form-group">
                    <label htmlFor="first_name" />
                    <input
                        className="form-control"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        ref={inputFirstName}
                        onChange={activateForm}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name" />
                    <input
                        className="form-control"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        ref={inputLastName}
                        onChange={activateForm}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" />
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email address"
                        ref={inputEmail}
                        onChange={activateForm}
                    />
                </div>
                <button type="submit" className='btn btn-primary' disabled={disableBtn}>Create New Person</button>
            </form>
        </div>
    )
}
export default NewPerson;