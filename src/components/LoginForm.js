import React from 'react'

const LoginForm = ({ handleLogin, setUsername, setPassword }) => (
  <div>
    <h1>Log in to application</h1>

    <form onSubmit={handleLogin}>
      <div>
        <span>username </span>
        <input
          type="text"
          //value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <span>password </span>
        <input
          type="password"
          //value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm