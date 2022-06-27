import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Person } from '../persons/personInterface';
import { Car } from './carInterface';
import axios from 'axios';
import { actSetDeleteCar, actSetUpdateCar } from '../../redux/actions/car';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RootState } from '../../redux/reducers';

interface Props {
    car: Car;
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

const SingleCar = ({ car }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [currentCar, setCurrentCar] = useState<Car>(car);
    const [open, setOpen] = useState<boolean>(false);
    const persons: Person[] = useSelector((state: RootState) => { return state.personReducer.persons })
    const dispatch = useDispatch();
    const deleteHandler = () => {
        axios.delete(`http://localhost:3000/cars/${car.id}/`)
            .then((res) => {
                dispatch(actSetDeleteCar([currentCar]));
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
        const putData = async () => {
            await axios.put<Car>(`http://localhost:3000/cars/${car.id}/`,
                {
                    "year": currentCar.year,
                    "model": currentCar.model,
                    "make": currentCar.make,
                    "price": currentCar.price,
                    "person_id": currentCar.person_id
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }).then(res => {
                    dispatch(actSetUpdateCar([res.data]));
                }).catch(err => {
                    console.log(err);
                });
        }
        putData().catch(err => { console.log(err); });
        editHandler();

    };

    return (
        <form>
            {(edit) ? (
                <div>
                    <div className='row edit-car'>
                        <div className='col-2'>
                            <label>Year</label>
                            <input className="form-control" type="number" name="year" value={currentCar.year} onChange={(e) => setCurrentCar({ ...currentCar, "year": parseInt(e.target.value) })} />
                        </div>
                        <div className='col-2'>
                            <label>Make</label>
                            <input className="form-control" type="text" name="make" value={currentCar.make} onChange={(e) => setCurrentCar({ ...currentCar, "make": e.target.value })} />
                        </div>
                        <div className='col-2'>
                            <label>Model</label>
                            <input className="form-control" type="text" name="model" value={currentCar.model} onChange={(e) => setCurrentCar({ ...currentCar, "model": e.target.value })} />
                        </div>
                        <div className='col-2'>
                            <label>Price</label>
                            <input className="form-control" type="number" name="price" value={currentCar.price} onChange={(e) => setCurrentCar({ ...currentCar, "price": parseInt(e.target.value) })} />
                        </div>
                        <div className='col-2'>
                            <label>Owner</label>
                            <select className="form-control" value={currentCar.person_id} onChange={(e) => { setCurrentCar({ ...currentCar, "person_id": parseInt(e.target.value) }) }}>
                                {persons.map(person => (
                                    <option key={person.id} value={person.id}>{person.first_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col-2'>
                            <button className="btn btn-success btn-sm btn-block" onClick={saveEditHandler}>Save</button>
                            <button className="btn btn-danger btn-sm btn-block" onClick={editHandler}>Cancel</button>
                        </div>

                    </div>

                </div>

            ) : (
                <div>
                    <div className='sec row edit-car'>
                        <div className='col-2'>
                            <label>Year</label>
                            <div>{car.year}</div>
                        </div>
                        <div className='col-2'>
                            <label>Make</label>
                            <div>{car.make}</div>
                        </div>
                        <div className='col-2'>
                            <label>Model</label>
                            <div>{car.model}</div>
                        </div>
                        <div className='col-2'>
                            <label>Price</label>
                            <div>{car.price}</div>
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
                            Are you sure you want to delete {car.make + " " + car.model}
                        </Typography>
                        <button className="btn btn-danger btn-sm btn-block" type="button" onClick={deleteHandler}>Yes</button>
                        <button className="btn btn-success btn-sm btn-block" type="button" onClick={handleClose}>Cancel</button>
                    </Box>
                </Modal>
            </div>

        </form>
    )
}

export default SingleCar;