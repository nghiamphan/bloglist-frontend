import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => (
  <div>
    <h1>Log in to application</h1>

    <form onSubmit={handleLogin}>
      <div>
        <span>username </span>
        <input
          type={username.type}
          value={username.value}
          name="Username"
          onChange={username.onChange}
        />
      </div>
      <div>
        <span>password </span>
        <input
          type={password.type}
          value={password.value}
          name="Password"
          onChange={password.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm