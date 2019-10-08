import React, { useState, useEffect } from 'react';
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

function App() {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const blogsToShow = () => blogs.map(blog => <Blog blog={blog}/>)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogList = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <ul>
        {blogsToShow()}
      </ul>
    </div>
  )

  return (
    <div>

      <h3>{errorMessage}</h3>

      {user === null ?
        <LoginForm 
          handleLogin = {handleLogin}
          setUsername = {setUsername}
          setPassword = {setPassword}/> :
        blogList()
      }
      
    </div>
  );
}

export default App;
