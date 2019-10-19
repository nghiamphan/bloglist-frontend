import React from 'react'
import { inputAttrs } from '../hooks'

const LoginForm = ({ handleLogin, username, password }) => (
  <div>
    <h1>Log in to application</h1>

    <form onSubmit={handleLogin}>
      <div>
        <span>username </span>
        <input
          {...inputAttrs(username)}
          name="Username"
        />
      </div>
      <div>
        <span>password </span>
        <input
          {...inputAttrs(password)}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm