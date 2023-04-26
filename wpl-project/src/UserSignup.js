import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const initialFormData = Object.freeze({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  contact: '',
  dob: ''
});

async function newUser(credentials) {
  return fetch('http://localhost:9000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then((data) => {
      console.log(data)
      return data.json()
    })
}

const SignUp = () => {
  const history = useHistory();
  const [input, setInput] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    setErrors(validate(input))
    console.log(input);
    
    const response = await newUser(
      input,
    );

    if (response.token) {
      console.log(response)
      console.log("Signup Success")
      history.push("/login");
    } else {
      console.log(response)
      console.log("Signup Failed")
    }
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      console.log(input);
    }
  }, [errors]);

  const validate = (input) => {
    let errors = {};
    var regexEmail = new RegExp("/^w+@[a-zA-Z_]+?.[a-zA-Z]/");
    const regexPassword = new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{6,})");

    if (!input.firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!input.lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!input.email) {
      errors.email = "Email is required";
    }
    if (!regexEmail.test(input.email)) {
      errors.email = "Enter valid email address. Example: abc@def.xyz";
    }
    if (!input.password) {
      errors.password = "Password is required";
    }
    if (!regexPassword.test(input.password)) {
      errors.password = "1 Uppercase, 1 Lowercase, 1 Number and 1 Special character required. Minimum length is 6";
    }
    if (!input.contact) {
      errors.contact = "Contact is required";
    }

    return errors;
  };

  return (
    <>
      <div className="card text-center" style={{  marginTop: '25px', marginBottom: '25px', marginLeft: '35%' }}>
        <div className="card-body">
          <h5 className="card-title">User Sign up</h5>
          <form>

            <div className="form-outline mb-2">
              <label className="form-label">First Name</label>
              <input name="firstname" type="text" className="form-control" placeholder="Enter firstname" value={input.firstname} onChange={handleChange} />
              <div className="text-danger">{errors.firstname}</div>
            </div>
            <div className="form-outline mb-2">
              <label className="form-label">Last Name</label>
              <input name="lastname" type="text" className="form-control" placeholder="Enter lastname" value={input.lastname} onChange={handleChange} />
              <div className="text-danger">{errors.lastname}</div>
            </div>
            <div className="form-outline mb-2">
              <label className="form-label">Email address</label>
              <input name="email" type="email" className="form-control" placeholder="Enter email" value={input.email} onChange={handleChange} />
              <div className="text-danger">{errors.email}</div>
            </div>

            {/* Password input */}
            <div className="form-outline mb-2">
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" placeholder="Enter password" value={input.password} onChange={handleChange} />
              <div className="text-danger">{errors.password}</div>
            </div>
            <div className="form-outline mb-2">
              <label className="form-label">Contact</label>
              <input name="contact" type="text" className="form-control" placeholder="Enter contact" value={input.contact} onChange={handleChange} />
              <div className="text-danger">{errors.contact}</div>
            </div>
            <div className="form-outline mb-2">
              <label className="form-label">Date of Birth (format MM/DD/YYYY)</label>
              <input name="dob" type="text" className="form-control" placeholder="Enter date of birth" value={input.dob} onChange={handleChange} />
            </div>
            <button type="button" className="btn btn-primary btn-block mb-2" onClick={handleSubmit}>Submit</button>
            <div>
              <a href="/login">Already a User?</a>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;