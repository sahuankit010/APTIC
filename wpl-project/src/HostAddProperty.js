import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const initialFormData = Object.freeze({
  title: '',
  userId: localStorage.getItem('userId'),
  shortDescription: '',
  fullDescription: '',
  location: '',
  city: '',
  state: '',
  country: '',
  hostMessage: '',
  nightlyFee: 0,
  cleaningFee: 0,
  serviceFee: 0,
  guests: 0,
  bedrooms: 0,
  beds: 0,
  baths: 0,
  thumbnail: '',
  amenities: [],
  houseRules: [],
  healthAndSafety: [],
  cancellationPolicy: '',
  reviews: {},
  image: []
});

async function addNewProperty(property) {
  console.log(property)
  return fetch('http://localhost:9000/properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(property)
  })
    .then((data) => {
      console.log(data)
      return data.json()
    })
}

const HostAddProperty = () => {
  const history = useHistory();
  const [formData, updateFormData] = React.useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    console.log(formData);
    formData.location = formData.city + ', ' + formData.state + ', ' + formData.country;
    const response = await addNewProperty(
      formData,
    );

    if (response.token) {
      console.log(response)
      console.log("Signup Success")
    } else {
      console.log(response)
      console.log("Signup Failed")
    }
    history.push("/hostDashboard");
  };

  return (
    <>
      <div className="card text-center d-flex justify-content-center" style={{ marginTop: '25px', marginBottom: '25px', marginLeft: '30%', width: '40rem' }}>
        <div className="card-body">
          <h5 className="card-title">Host Add Property</h5>
          <hr />
          <form>

            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }} className='align-middle'>Title of Property</span>
              <span style={{ flex: '7' }}><input name="title" type="text" className="form-control" placeholder="Enter Title" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Short Description</span>
              <span style={{ flex: '7' }}><input name="shortDescription" type="text" className="form-control" placeholder="Enter Short Description" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Long Description</span>
              <span style={{ flex: '7' }}><input name="fullDescription" type="text" className="form-control" placeholder="Enter Long Description" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Host message</span>
              <span style={{ flex: '7' }}><input name="hostMessage" type="text" className="form-control" placeholder="Enter any message" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>City</span>
              <span style={{ flex: '1' }}><input name="city" type="text" className="form-control" placeholder="City" onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>State</span>
              <span style={{ flex: '1' }}><input name="state" type="text" className="form-control" placeholder="State" onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>Country</span>
              <span style={{ flex: '1' }}><input name="country" type="text" className="form-control" placeholder="Country" onChange={handleChange} /></span>
            </div>
            <hr />


            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>No of Guests </span>
              <span style={{ flex: '1' }}><input name="guests" type="number" min={1} className="form-control" placeholder="" onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>No of Bedrooms </span>
              <span style={{ flex: '1' }}><input name="bedrooms" type="number" min={1} className="form-control" placeholder="" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>No of Beds </span>
              <span style={{ flex: '1' }}><input name="beds" type="number" min={1} className="form-control" placeholder="" onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>No of Bathrooms </span>
              <span style={{ flex: '1' }}><input name="baths" type="number" min={0} className="form-control" placeholder="" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>Cleaning Fee </span>
              <span style={{ flex: '1' }}><input name="cleaningFee" type="text" pattern="[0-9]+" className="form-control" placeholder="Cleaning Fees" onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>Service Fee </span>
              <span style={{ flex: '1' }}><input name="serviceFee" type="text" pattern="[0-9]+" className="form-control" placeholder="Service Fees" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Nightly Fee </span>
              <span style={{ flex: '7' }}><input name="nightlyFee" type="text" pattern="[0-9]+" className="form-control" placeholder="Nightly Fees in $" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Add Amenities</span>
              <span style={{ flex: '7' }}><input name="amenities" type="text" className="form-control" placeholder="Please add coma seperated ammenities" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>House Rules</span>
              <span style={{ flex: '7' }}><input name="houseRules" type="text" className="form-control" placeholder="Please add comma seperated house rules" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Health and Saftey</span>
              <span style={{ flex: '7' }}><input name="healthAndSafety" type="text" className="form-control" placeholder="Please add coma seperated realth and saftey" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Cancellation Policy</span>
              <span style={{ flex: '7' }}><input name="cancellationPolicy" type="text" className="form-control" placeholder="Please add cancelation policy" onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Property Images</span>
              <span style={{ flex: '7' }}>
                <Form.Group controlId="formFile" name='thumbnail' className="mb-3">
                  <Form.Control type="file" />
                </Form.Group>
              </span>
            </div>
            <hr />
            <button type="button" className="btn btn-primary btn-block mb-2" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default HostAddProperty;