import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";

const initialFormData = Object.freeze({
  firstname: '',
  lastname: '',
  dob: '',
  contact: '',
  street: '',
  city: '',
  state: '',
  zip: 0,
  bankName: '',
  accountNumber: 0,
  routingNumber: 0,
  address: {
    street: '',
    city: '',
    state: '',
    zip: 0,
  },
  bankDetails: {
    accountName: '',
    bankName: '',
    accountNumber: 0,
    routingNumber: 0,
  }
});

async function addHost(host) {
  return fetch('http://localhost:9000/hosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(host)
  })
    .then((data) => {
      return data.json()
    })
}


export default function HostRegistration() {
  const [formData, updateFormData] = React.useState(initialFormData);
  const history = useHistory();
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    formData.bankDetails.accountName = formData.accountName
    formData.bankDetails.bankName = formData.bankName
    formData.bankDetails.accountNumber = parseInt(formData.accountNumber)
    formData.bankDetails.routingNumber = parseInt(formData.routingNumber)

    formData.address.street = formData.street
    formData.address.city = formData.city
    formData.address.state = formData.state
    formData.address.zip = parseInt(formData.zip)

    const response = await addHost(
      formData,
    );
    if (response) {
      console.log("Host Register Success");
    } else {
      console.log("Host Register Failed")
    }
    history.push("/hostDashboard");
  }
  return (
    <>
      <div className="card text-center" style={{ marginTop: '3%', marginLeft: '27%', marginRight: '10%', width: '50%' }}>
        <div className="card-body">
          <h5 className="card-title">Register for host</h5>
          <form>
            {/* Name input */}
            <div className="form-outline mb-4" style={{ display: 'flex' }}>
              <span style={{ flex: 1 }}>
                <input name="firstname" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                First Name
                {/* <label className="form-label" htmlFor="form2Example1">First Name</label> */}
              </span>
              <span style={{ flex: 1 }}>
                <input name="lastname" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                Last Name
                {/* <label className="form-label" htmlFor="form2Example1">Last Name</label> */}
              </span>
            </div>

            {/* Contact, DOB input */}
            <div className="form-outline mb-4" style={{ display: 'flex' }}>
              <span style={{ flex: 1 }}>
                <input name="contact" onChange={handleChange} pattern="[0-9]+" minLength={10} maxLength={10} type="text" id="form2Example1" className="form-control" />
                Phone no.
                {/* <label className="form-label" htmlFor="form2Example1">Phone no.</label> */}
              </span>
              <span style={{ flex: 1 }}>
                <input name="dob" type="date" onChange={handleChange} id="form2Example1" className="form-control" />
                DOB
                {/* <label className="form-label" htmlFor="form2Example1">DOB</label> */}
              </span>
            </div>

            {/* Street input */}
            <div className="form-outline mb-4">
              <input name="street" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
              Street
              {/* <label className="form-label" htmlFor="form2Example1">Street</label> */}
            </div>

            {/* City, State input */}
            <div className="form-outline mb-4" style={{ display: 'flex' }}>
              <span style={{ flex: 1 }}>
                <input name="city" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                City
                {/* <label className="form-label" htmlFor="form2Example1">City</label> */}
              </span>
              <span style={{ flex: 1 }}>
                <input name="state" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                State
                {/* <label className="form-label" htmlFor="form2Example1">State</label> */}
              </span>
              <span style={{ flex: 1 }}>
                <input name="zip" type="text" pattern="[0-9]+" onChange={handleChange} id="form2Example1" className="form-control" />
                Zip Code
                {/* <label className="form-label" htmlFor="form2Example1">Zip Code</label> */}
              </span>
            </div>

            {/* Account, bank name input */}
            <div className="form-outline mb-4" style={{ display: 'flex' }}>
              <span style={{ flex: 1 }}>
                <input name="accountName" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                Account Name
                {/* <label className="form-label" htmlFor="form2Example1">Account Name</label> */}
              </span>
              <span style={{ flex: 1 }}>
                <input name="bankName" type="text" id="form2Example1" onChange={handleChange} className="form-control" />
                Bank Name
                {/* <label className="form-label" htmlFor="form2Example1">Bank Name</label> */}
              </span>
            </div>

            {/* Account, routing name input */}
            <div className="form-outline mb-4" style={{ display: 'flex' }}>
              <span style={{ flex: 1 }}>
                <input name="accountNumber" pattern="[0-9]+" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                Account Number
                {/* <label className="form-label" htmlFor="form2Example1">Account Number</label> */}
              </span>
              <span style={{ flex: 1 }}>
                <input name="routingNumber" pattern="[0-9]+" type="text" onChange={handleChange} id="form2Example1" className="form-control" />
                Routing Number
                {/* <label className="form-label" htmlFor="form2Example1">Routing Number</label> */}
              </span>
            </div>

            {/* Submit button */}
            <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Register</button>

          </form>
        </div>
      </div>
    </>
  )
}