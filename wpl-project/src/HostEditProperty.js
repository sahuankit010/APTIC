import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from "react-router-dom";

async function updateProperty(property) {
  console.log(property)
  return fetch('http://localhost:9000/properties/' + property._id, {
    method: 'PUT',
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

export default function HostEditProperty() {
  const history = useHistory();
  let property = useLocation().property;
  console.log(property)
  const [formData, updateFormData] = React.useState(property);
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
    const response = await updateProperty(
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
              <span style={{ flex: '7' }}><input name="title" type="text" className="form-control" placeholder="Enter Title" value={formData.title} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Short Description</span>
              <span style={{ flex: '7' }}><input name="shortDescription" type="text" className="form-control" placeholder="Enter Short Description" value={formData.shortDescription} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Long Description</span>
              <span style={{ flex: '7' }}><input name="fullDescription" type="text" className="form-control" placeholder="Enter Long Description" value={formData.fullDescription} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Host message</span>
              <span style={{ flex: '7' }}><input name="hostMessage" type="text" className="form-control" placeholder="Enter any message" value={formData.hostMessage} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>City</span>
              <span style={{ flex: '1' }}><input name="city" type="text" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>State</span>
              <span style={{ flex: '1' }}><input name="state" type="text" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>Country</span>
              <span style={{ flex: '1' }}><input name="country" type="text" className="form-control" placeholder="Country" value={formData.country} onChange={handleChange} /></span>
            </div>
            <hr />


            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>No of Guests </span>
              <span style={{ flex: '1' }}><input name="guests" type="number" min={1} className="form-control" placeholder="" value={formData.guests} onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>No of Bedrooms </span>
              <span style={{ flex: '1' }}><input name="bedrooms" type="number" min={1} className="form-control" placeholder="" value={formData.bedrooms} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>No of Beds </span>
              <span style={{ flex: '1' }}><input name="beds" type="number" min={1} className="form-control" placeholder="" value={formData.beds} onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>No of Bathrooms </span>
              <span style={{ flex: '1' }}><input name="baths" type="number" min={0} className="form-control" placeholder="" value={formData.baths} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '1' }}>Cleaning Fee </span>
              <span style={{ flex: '1' }}><input name="cleaningFee" type="text" pattern="[0-9]+" className="form-control" placeholder="Cleaning Fees" value={formData.cleaningFee} onChange={handleChange} /></span>
              <span style={{ flex: '1' }}>Service Fee </span>
              <span style={{ flex: '1' }}><input name="serviceFee" type="text" pattern="[0-9]+" className="form-control" placeholder="Service Fees" value={formData.serviceFee} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Nightly Fee </span>
              <span style={{ flex: '7' }}><input name="nightlyFee" type="text" pattern="[0-9]+" className="form-control" placeholder="Nightly Fees in $" value={formData.nightlyFee} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Add Amenities</span>
              <span style={{ flex: '7' }}><input name="amenities" type="text" className="form-control" placeholder="Please add coma seperated ammenities" value={formData.amenities} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>House Rules</span>
              <span style={{ flex: '7' }}><input name="houseRules" type="text" className="form-control" placeholder="Please add comma seperated house rules" value={formData.houseRules} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Health and Saftey</span>
              <span style={{ flex: '7' }}><input name="healthAndSafety" type="text" className="form-control" placeholder="Please add coma seperated realth and saftey" value={formData.healthAndSafety} onChange={handleChange} /></span>
            </div>
            <hr />
            <div className="form-outline mb-2" style={{ display: 'flex' }}>
              <span style={{ flex: '3' }}>Cancellation Policy</span>
              <span style={{ flex: '7' }}><input name="cancellationPolicy" type="text" className="form-control" placeholder="Please add cancelation policy" value={formData.cancellationPolicy} onChange={handleChange} /></span>
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