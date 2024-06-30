import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/register", data)
      .then(res => {
        alert(res.data); // Display response message
        setData({  // Clear form after successful registration
          username: '',
          email: '',
          password: '',
          confirmpassword: ''
        });
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.'); // Display error message
      });
  };

  return (
    <div>
      <center>
        <form onSubmit={submitHandler} autoComplete='off'>
          <h3>Register</h3>
          <input type='text' name='username' placeholder='User Name' value={data.username} onChange={changeHandler} required /><br />
          <input type='email' name='email' placeholder='Email' value={data.email} onChange={changeHandler} required /><br />
          <input type='password' name='password' placeholder='Password' value={data.password} onChange={changeHandler} required /><br />
          <input type='password' name='confirmpassword' placeholder='Confirm Password' value={data.confirmpassword} onChange={changeHandler} required /><br />
          <input type='submit' value="Register" style={listItemStyles}/><br />
        </form>
      </center>
    </div>
  );
};



const listItemStyles = {
    display: "inline-block",
    padding: "8px 16px",
    margin:"10px",
    border:"none",
    backgroundColor:"slateblue",
    borderRadius: "4px",
    color: "white",
    listStyleType: "none",
  };

export default Register;
