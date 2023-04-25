import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import AccountMenu from './AccountMenu';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import UserContext from './User';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useLocation } from "react-router-dom";

function deleteProperty(propertyId) {
    const delPropertyUrl = 'http://localhost:9000/properties/' + propertyId;
    console.log(delPropertyUrl)
    const requestOptions = {
        method: 'DELETE'
    };
    fetch(delPropertyUrl, requestOptions).then((response) => {
        return response.json();
    }).then((result) => {
        window.location.reload();
    });
}


export default function Dashboard() {
    const [properties, setProperties] = useState([]);
    const [deleteProp, setDeleteProp] = useState(false);

    const handleDeletePropClose = () => setDeleteProp(false);
    const handleDeletePropShow = () => setDeleteProp(true);

    const userId = useContext(UserContext);
    console.log("userId: ", userId)
    const url = 'http://localhost:9000/properties?userid=' + userId;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((properties) => {
                console.log(properties);
                setProperties(properties);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <header className="main-header mt-auto py-3 bg-light fixed-top">
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
                    <a className="navbar-brand" href="/">
                        <img src="../img/logo.png" width="10%" className="align-top" />
                        <span className="logo text-uppercase font-weight-bold align-bottom">Aptic</span>
                    </a>

                    <div className="collapse navbar-collapse " id="navbar">

                    </div>

                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'denter' }}>
                            <Typography sx={{ minWidth: 100 }}>Host Dashboard</Typography>
                            <Typography sx={{ minWidth: 20 }}></Typography>
                            <Typography sx={{ minWidth: 100 }}><a className="dropdown-item" href="/">Switch to User &nbsp; &nbsp;</a></Typography>
                        </Box>
                    </div>
                </nav>
            </header>

            <div className="container" style={{ marginTop: '5%', marginBottom: '10%' }}>
                {/*Title of property*/}
                <div>
                    <h3>Host Dashboard</h3>
                </div>
                <br />
                <div>
                    <Button variant="success">
                        <a href="/addProperty" style={{ textDecoration: 'none', color: 'inherit' }}>Add Property</a>
                    </Button>
                </div>
                <br />
                <div>
                    <h5>Hosted Properties : </h5>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Average Ratings</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Object.keys(properties).map((key) =>
                                        <tr>
                                            <th scope="row">{Number(key) + 1}</th>
                                            <td>{properties[key].title}</td>
                                            <td>{properties[key].location}</td>
                                            <td>{properties[key].reviews.stars}</td>
                                            <td>{properties[key].isAvailable}
                                            </td>
                                            <td>
                                                <Link to={{ pathname: '/editProperty', property: properties[key] }}>
                                                    <Button variant="primary"><a className="dropdown-item">Edit</a></Button>
                                                </Link>
                                                &nbsp;
                                                <Button variant="danger" onClick={handleDeletePropShow}>Delete</Button>
                                                <Modal show={deleteProp} onHide={handleDeletePropClose} animation={false}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Delete Property</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are you sure you want to permanantly suspend this property?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleDeletePropClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="danger" onClick={() => deleteProperty(properties[key]._id)}>
                                                            {console.log(properties[key]._id)}Delete Property
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}
