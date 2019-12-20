import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) =>{
  const [error, setError] = useState()
const [data, setData] = useState({
  username: "",
  password: "",
})

const handleChange = (event) => {
  setData({
    ...data,
    [event.target.name]: event.target.value,
  })
}

const handleSubmit = (event) => {
  event.preventDefault()

  axiosWithAuth()
  .post('/login', data)
  .then(res => {
    console.log(res.data)
    localStorage.setItem('token',res.data.payload)
    props.history.push('/bubbles')
  })
  .catch(err => {
    setError(err.response.data.message)
  })
  }
  
  return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <input type="name" name="username" placeholder="Username" value={data.username} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />

          <button type="submit">Sign In</button>
        </form>
      </>
)

}

export default Login