import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { StoreContext } from './App';

const MyProfile = () => {
  const { token, setToken } = useContext(StoreContext);
  const [data, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/myprofile", {
        headers: {
          'x-token': token
        }
      })
      .then(res => {
        setUserData(res.data);
      })
      .catch(error => {
        console.error('Fetch profile error:', error);
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {data && (
        <center>
          <h2>Welcome {data.username}</h2>
          <button onClick={() => setToken(null)} style={listItemStyles}>Logout</button>
        </center>
      )}
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

  
export default MyProfile;
