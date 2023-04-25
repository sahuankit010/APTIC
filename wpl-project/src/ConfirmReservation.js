import React from 'react';
import './ConfirmReservation.css';
import {Link, useLocation} from "react-router-dom";
import Footer from './Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import AccountMenu from './AccountMenu';
import UserContext from './User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";

const initialFormData = Object.freeze({
  checkin: '',
  checkout: '',
  userId: '',
  guests: 0,
  totalPrice: 0,
  propertyId: '',
  paymentDetails: {
    cardNumber: '',
    expdate: '',
    cvv: '',
    cardholderName: '',
    zipcode: ''
  }
});

async function addNewReservation(reservation) {
  console.log(reservation)
  return fetch('http://localhost:9000/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservation)
  })
    .then((data) => {
      console.log(data)
      return data.json()
    })
}

export default function ConfirmReservation({state}) {
  const history = useHistory();
  let location = useLocation();
  const [formData, updateFormData] = React.useState(initialFormData);
  const userId = localStorage.getItem('userId')

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    formData.userId = userId
    console.log(location.state)
    formData.propertyId = location.state._id
    formData.paymentDetails.cardNumber = formData.cardNumber
    formData.paymentDetails.cardholderName = formData.cardholderName
    formData.paymentDetails.cvv=formData.cvv
    formData.paymentDetails.expdate=formData.expdate
    formData.paymentDetails.zipcode=formData.zipcode
    console.log()
    formData.totalPrice = parseInt(location.state.nightlyFee) * parseInt(new Date(formData.checkout)- new Date(formData.checkin)) +
     parseInt(location.state.serviceFee) + parseInt(location.state.cleaningFee)
    const response = await addNewReservation(
      formData,
    );

    if (response) {
      console.log(response)
      console.log("Reservation Success")
    } else {
      console.log(response)
      console.log("Reservation Failed")
    }
    history.push("/reservations");
  };

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
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
              <Typography sx={{ minWidth: 100 }}>Reservations</Typography>
            </Box>
          </div>
          <div>
            <AccountMenu />
          </div>
        </nav>
      </header>
      <div style={{marginLeft : '1%', marginRight : '1%', marginTop : '5%', marginBottom : '5%'}}>
        {/*Title of property*/}
        <div>
          <h3>Request Confirmation Page</h3>
        </div>
        <br />
        <div>
          <h5>Confirm Trip Details</h5>
          {/*Dates*/}
          <div>
            <div>Dates</div>
            <div>
              <span>Checkin : 
                <input type="date" name="checkin" id="checkin"  onChange={handleChange} />
              </span>&nbsp; &nbsp;
              <span>Checkout : 
                <input type="date" name="checkout" id="checkout"  onChange={handleChange}/> 
              </span>
            </div>
            <br />
            <div>
              <span>No of guests : <input name="guests" id="guests"  onChange={handleChange} style={{width : '100px'}} type="number" min={1}/></span>
            </div>
          </div>
        </div>
        <div style={{display: 'flex'}}> {/*flex => side by side divs*/}
          {/*left div : payment, Cancelation, imp*/}
          <div style={{flex: 1}}>
            <hr style={{marginRight: '10%'}} />
            {/*Payment Methods*/}
            <div>
              <h5>Payment Details</h5>
              <form>
                <div>
                  Credit/Debit Card number : <input type="text" name="cardNumber" pattern="[0-9]+" minLength={16} maxLength={16} onChange={handleChange}/>
                </div>
                <br />
                <div>
                  Name on  Credit/Debit Card: <input onChange={handleChange} type="text" name="cardholderName"/>
                </div>
                <br />
                <div style={{display: 'flex'}}>
                  <span style={{flex: 1}}>
                    exp month : <input style={{width: '20%'}} name="expdate" type="text" placeholder="mm/yy" minLength={5} maxLength={5} onChange={handleChange} />
                  </span>
                  <span style={{flex: 1}}>
                    cvc : <input style={{width: '20%'}} name="cvv" type="password" minLength={3} maxLength={3} onChange={handleChange} />
                  </span>
                </div>
                <br />
                <div>
                  Zipcode : <input style={{width: '20%'}} name="zipcode" type="text" pattern="[0-9]+" minLength={5} maxLength={5} onChange={handleChange} />
                </div>
                <br />
                <div>
                  <button type="submit" onClick={handleSubmit} defaultValue="Confirm Payment"> <a href='/' style={{textDecoration : 'none',  color: 'inherit'}}>Confirm Payment</a></button>
                </div>
              </form>
            </div>
            <hr style={{marginRight: '10%'}} />
            {/*Cancellation Policy*/}
            <div>
              <div>
                <h5>Cancellation Policy</h5>
              </div>
              <div>
                You can cancel reservation before 48 hours.
              </div>
            </div>
            <hr style={{marginRight: '10%'}} />
            {/*Important*/}
            <div>
              <div>
                <h5>Important Notice</h5>
              </div>
              <div>
                ID of person who booked will be reuqired as an Indentity proof.
              </div>
            </div>
            <hr style={{marginRight: '10%'}} />
          </div>
          
          {/*right div : title, total fees*/}
          <div style={{flex: 1}}>
            {/*Title and location*/}
            <div style={{paddingBottom: '5px', display: 'flex'}}>
              <div style={{flex : 1}}>
                <div><h6>{location.state.title}</h6></div>
                <div>{location.state.location}</div>
              </div>
              {/* <div style={{flex : 1}}>
                <div><img className="card-img-top" src={location.state.thumbnail} alt="Card image cap" /></div>
              </div> */}
            </div>
            <hr />
            {/*Price Details*/}
            <div style={{marginLeft: '2%'}}>
              <div style={{display: 'flex'}}>
                <span style={{flex: 1}}>Per night fee X 1</span>
                <span style={{flex: 1}}>{location.state.nightlyFee} * 1</span>
              </div>
              <div style={{display: 'flex'}}>
                <span style={{flex: 1}}>Cleaning fee</span>
                <span style={{flex: 1}}>{location.state.cleaningFee}</span>
              </div>
              <div style={{display: 'flex'}}>
                <span style={{flex: 1}}>Service fee</span>
                <span style={{flex: 1}}>{location.state.serviceFee}</span>
              </div>
              <div style={{display: 'flex'}}>
                <span style={{flex: 1}}>Taxes</span>
                <span style={{flex: 1}}>25</span>
              </div>
              <hr />
              <div style={{display: 'flex'}}>
                <span style={{flex: 1}}>Total</span>
                <span style={{flex: 1}}>{location.state.cleaningFee + location.state.serviceFee + location.state.nightlyFee * 1 + 25} </span>
              </div>
            </div>
          </div>
        </div> 
      </div>
    <Footer />
    </>
  )
}
