import React, { useState, useEffect } from 'react';
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

function App() {
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogsToShow = () => blogs.map(blog => 
    <Blog 
      key={blog.id}
      blog={blog}
    />
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    if (blogObject.title && blogObject.url) {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `Blog: ${newTitle} by ${newAuthor} is created`,
        type: 'notification'
      })
    }
    else {
      setNotification({
        message: `Missing title or url`,
        type: 'error'
      })
    }
    
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: 'Wrong credentials',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: null
        })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const blogList = () => (
    <div>
      <h1>Blogs</h1>
      <p>
        <span>{user.name} logged in </span>
        <button type="submit" onClick={handleLogout}>logout</button>
      </p>
      <NewBlogForm 
        addBlog = {addBlog}
        newTitle={newTitle}
        handleTitleChange = {handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange = {handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange = {handleUrlChange}
      />
      <ul>
        {blogsToShow()}
      </ul>
    </div>
  )

  return (
    <div>

      <Notification 
        message={notification.message} 
        className={notification.type}
      />

      {user === null ?
        <LoginForm 
          handleLogin = {handleLogin}
          setUsername = {setUsername}
          setPassword = {setPassword}
        /> :

        blogList()
      }
      
    </div>
  );
}

export default App;
