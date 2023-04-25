import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import AccountMenu from './AccountMenu';
import UserContext from './User';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Typography from '@mui/material/Typography';
import './reservations.css';

const initialFormData = Object.freeze({
  name: '',
  date: '',
  ratings: '',
  description: ''
});

function addReview(propertyId, reviewBody) {
  const addReviewUrl = 'http://localhost:9000/properties/' + propertyId + '/review';
  console.log(addReviewUrl)
  console.log(reviewBody)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: reviewBody
  };
  fetch(addReviewUrl, requestOptions).then((response) => {
    return response.json();
  }).then((result) => {
    window.location.reload();
  });
}

function cancelReservation(reservationId) {
  const delReservationUrl = 'http://localhost:9000/reservations/' + reservationId;
  console.log(delReservationUrl)
  const requestOptions = {
    method: 'DELETE'
  };
  fetch(delReservationUrl, requestOptions).then((response) => {
    return response.json();
  }).then((result) => {
    window.location.reload();
  });
}

export default function App() {
  const [reservations, setReservations] = useState([]);
  // const [cancelRes, setCancelRes] = useState(false);
  const [review, setReview] = useState(initialFormData);
  const [showReview, setShowReview] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const handleReviewClose = () => setShowReview(false);
  const handleReviewShow = () => setShowReview(true);
  const handleCancelClose = () => setShowCancel(false);
  const handleCancelShow = () => setShowCancel(true);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value.trim()
    });
  };

  const userId = useContext(UserContext);
  console.log("userId: ", userId)
  const url = 'http://localhost:9000/reservations?userid=' + userId;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((reservations) => {
        console.log(reservations);
        setReservations(reservations);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


  return (
    <div className="Favourites">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous">
      </script>

      <header className="main-header mt-auto py-3 bg-light fixed-top">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light ">
          <a className="navbar-brand" href="/">
            <img src="../img/logo.png" width="10%" className="align-top" />
            <span className="logo text-uppercase font-weight-bold align-bottom">Aptic</span>
          </a>

          <div className="collapse navbar-collapse " id="navbar">

          </div>

          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
              <Typography sx={{ minWidth: 100 }}>Reservations</Typography>
            </Box>
          </div>
          <div>
            <AccountMenu />
          </div>
        </nav>
      </header>

      {/* Reservation Table */}
      <div className="container" style={{ marginTop: '5%' }}>
        <div className="row" >
          <div className="col-12">
            <table className="table table-bordered" >
              <thead>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Checkin Date</th>
                  <th scope="col">Checkout Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(reservations).map((key) =>
                  <tr>
                    <th scope="row">{Number(key) + 1}</th>
                    <td>{reservations[key].title}</td>
                    <td>{reservations[key].location}</td>
                    <td>{reservations[key].checkin}</td>
                    <td>{reservations[key].checkout}</td>
                    <td>
                      {/* User will be able to cancel the reservation 2 days(48 hrs) prior the checkin date */}
                      {new Date(reservations[key].checkin) - new Date().setHours(0, 0, 0, 0) >= 2 * 24 * 60 * 60 * 1000
                        ?
                        <>
                          <button type="button" className="btn btn-danger" onClick={handleCancelShow}><i className="far" />Cancel</button>
                          <Modal show={showCancel} onHide={handleCancelClose} animation={false}>
                            <Modal.Header closeButton>
                              <Modal.Title>Cancel Reservation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to cancel this reservation?</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleCancelClose}>
                                Close
                              </Button>
                              <Button variant="danger" onClick={() => cancelReservation(reservations[key]._id)}>
                                Cancel Reservation
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                        : <>
                          <button type="button" className="btn btn-primary" onClick={handleReviewShow}><i className="far" />Review</button>
                          <Modal show={showReview} onHide={handleReviewClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Add Reviews</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* <div>
                                <span>Name : </span>
                                <span>Demo User</span>
                              </div>

                              <div>
                                <span>Date : </span>
                                <span>{date}</span>
                              </div> */}

                              <div className="modal-body">
                                <span>Rating : </span>

                                <span className="rating" >
                                  <input type="radio" name="rating" defaultValue={1} id={1} value={review.ratings} onChange={handleChange} /><label htmlFor={1}>☆</label>
                                  <input type="radio" name="rating" defaultValue={2} id={2} value={review.ratings} onChange={handleChange} /><label htmlFor={2}>☆</label>
                                  <input type="radio" name="rating" defaultValue={3} id={3} value={review.ratings} onChange={handleChange} /><label htmlFor={3}>☆</label>
                                  <input type="radio" name="rating" defaultValue={4} id={4} value={review.ratings} onChange={handleChange} /><label htmlFor={4}>☆</label>
                                  <input type="radio" name="rating" defaultValue={5} id={5} value={review.ratings} onChange={handleChange} /><label htmlFor={5}>☆</label>
                                </span>

                              </div>

                              <div>
                                <span>Feedback : </span><br />
                                <span><textarea rows="5" cols="50" name="descriptin" placeholder="Enter feedback/comments" onChange={handleChange}></textarea></span>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleReviewClose}>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={() => addReview(reservations[key].propertyId,
                                JSON.stringify({
                                  name: 'Demo User',
                                  date: date,
                                  ratings: review.ratings,
                                  description: review.description
                                }))}>
                                Add Review
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      }
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span>Name : </span>
            <span>name of person</span>
          </div>

          <div>
            <span>Date : </span>
            <span>{date}</span>
          </div>

          <div className="modal-body">
            <span>Rating : </span>
            <span>
              <div className="rating" >
                <input type="radio" name="rating" defaultValue={5} id={5} /><label htmlFor={5}>☆</label>
                <input type="radio" name="rating" defaultValue={4} id={4} /><label htmlFor={4}>☆</label>
                <input type="radio" name="rating" defaultValue={3} id={3} /><label htmlFor={3}>☆</label>
                <input type="radio" name="rating" defaultValue={2} id={2} /><label htmlFor={2}>☆</label>
                <input type="radio" name="rating" defaultValue={1} id={1} /><label htmlFor={1}>☆</label>
              </div>
            </span>
          </div>

          <div>
            <span>Feedback : </span><br />
            <span><textarea rows="5" cols="50"></textarea></span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => addReview(reservations[key].propertyId)}>
            Add Review
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Footer />

    </div >
  );
}
