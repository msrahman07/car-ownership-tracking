import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Person } from './personInterface';
import axios from 'axios';
import { actSetDelete, actSetUpdate } from '../../redux/actions/person';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cars from '../cars/Cars';

interface Props {
    person: Person
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 0.2,
    p: 4,
    textAlign: 'center',
};

const SinglePerson = ({ person }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [currentPerson, setCurrentPerson] = useState<Person>(person);
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const deleteHandler = () => {
        axios.delete(`http://localhost:3000/persons/${person.id}/`)
            .then((res) => {
                dispatch(actSetDelete([currentPerson]));
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const editHandler = () => {
        (edit) ? setEdit(false) : setEdit(true);
    };
    const saveEditHandler = () => {
        axios.put<Person>(`http://localhost:3000/persons/${person.id}/`,
            {
                "first_name": currentPerson.first_name,
                "last_name": currentPerson.last_name,
                "email": currentPerson.email,
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }).then(res => {
                dispatch(actSetUpdate([res.data]));
            }).catch(err => {
                console.log(err);
            });
        editHandler();
    };

    return (
        <div>
            <form>
                {(edit) ? (
                    <div>
                        <div className='row edit-car'>
                            <div className='col'>
                            <label>First Name</label>
                                <input className="form-control" type="text" name="first_name" value={currentPerson.first_name} onChange={(e) => setCurrentPerson({ ...currentPerson, "first_name": e.target.value })} />
                            </div>
                            <div className='col'>
                            <label>Last Name</label>
                                <input className="form-control" type="text" name="last_name" value={currentPerson.last_name} onChange={(e) => setCurrentPerson({ ...currentPerson, "last_name": e.target.value })} />
                            </div>
                            <div className='col'>
                            <label>Email</label>
                                <input className="form-control" type="email" name="email" value={currentPerson.email} onChange={(e) => setCurrentPerson({ ...currentPerson, "email": e.target.value })} />
                            </div>
                            <div className='col'>
                                <button type="button" className="btn btn-success btn-sm btn-block" onClick={saveEditHandler}>Save</button>
                            </div>
                            <div className='col'>
                                <button type="button" className="btn btn-danger btn-sm btn-block" onClick={editHandler}>Cancel</button>
                            </div>
                        </div>

                    </div>

                ) : (
                    <div>
                        <div className='row edit-car'>
                            <div className='col-2'>
                                <label>First Name</label>
                                <div>
                                    {person.first_name}
                                </div>
                            </div>
                            <div className='col-2'>
                                <label>Last Name</label>
                                <div>
                                    {person.last_name}
                                </div>
                            </div>
                            <div className='col-2'>
                                <label>Email</label>
                                <div>
                                    {person.email}
                                </div>
                            </div>
                            <div className='col-2'>
                                <button className="btn btn-warning" type="button" onClick={editHandler}>Edit</button>
                            </div>
                            <div className='col-2'>
                                <button className="btn btn-danger" type="button" onClick={handleOpen}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure you want to delete {person.first_name + " " + person.last_name}
                            </Typography>
                            <button className="btn btn-danger btn-sm btn-block" type="button" onClick={deleteHandler}>Yes</button>
                            <button className="btn btn-success btn-sm btn-block" type="button" onClick={handleClose}>Cancel</button>
                        </Box>
                    </Modal>
                </div>

            </form>
            <hr />
            {(person.id !== undefined) &&
                <Cars personId={person.id} />}
        </div>

    )
}

export default SinglePerson;