import React from 'react'
import { useHistory } from "react-router-dom";


const initialFormData = Object.freeze({
  email: "",
  password: ""
});

async function loginUser(credentials) {
  return fetch('http://localhost:9000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then( (data) =>{ 
      console.log("data : ",data);
      return data.json()
    })
 }

const Login = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    console.log(formData);
    // ... submit to API or something
    const response = await loginUser(
      formData,
    );
    if (response.token) {
      console.log("response : ", response);
      console.log("user id : ", response.user._id);
      
      
      //store data in localStorage so that loggedin user can be accessed
      localStorage.setItem("userId", response.user._id);


      console.log("Login Success");
      // <Route path="./App.js" component={App} /> 
      // navigate('/app.js');
      history.push("/");

      // swal("Success", response.message, "success", {
      //   buttons: false,
      //   timer: 2000,
      // })
      // .then((value) => {
      //   localStorage.setItem('accessToken', response['accessToken']);
      //   localStorage.setItem('user', JSON.stringify(response['user']));
      //   window.location.href = "/profile";
      // });
    } else {
      console.log(response)
      console.log("Login Failed")
      // swal("Failed", response.message, "error");
    }
  };
  return (
    <>
      <div className="card text-center" style={{ marginTop: '10%', marginLeft: '35%', marginRight: '35%' }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          {/* Email input */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">Email address</label>
            <input name = "email" type="email" id="form2Example1" className="form-control"  onChange={handleChange} />
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">Password</label>
            <input name = "password" type="password" id="form2Example2" className="form-control"  onChange={handleChange}/>
          </div>
          <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>
          <div>
              <a href="/usersignup">New User?</a>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;