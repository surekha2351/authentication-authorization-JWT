import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { StoreContext } from './App';

const Login = () => {
  const { token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", data)
      .then(res => {
        setToken(res.data.token); // Update token with the response token
      })
      .catch(error => {
        if (error.response) {
          console.error('Login error:', error.response.data); // Specific error message from server
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error during request setup:', error.message);
        }
      });
  };
  
  if (token) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div>
      <center>
        <form onSubmit={submitHandler} autoComplete='off'>
          <h3>Login</h3>
          <input type='email' name='email' placeholder='Email' onChange={changeHandler} /><br />
          <input type='password' name='password' placeholder='Password' onChange={changeHandler} /><br />
          <input type='submit' value="Login" style={listItemStyles}/><br />
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
export default Login;
