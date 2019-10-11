import React, { useState, useEffect } from 'react';
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
      .then(initialBlogs =>
        setBlogs(initialBlogs.sort((x, y) => y.likes - x.likes))
      )
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
      increaseLikes={() => increaseLikes(blog.id)}
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
      /**
       * Note: After setBlogs(blogs.concat(newBlog)), the page is rendered,
       * and the old blog form which is assigned to newBlogFormRef variable
       * is destroyed, so call newBlogFormRef.current.toggleVisibility() 
       * after that will cause an error.
       */
      newBlogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        message: `Blog: ${newTitle} by ${newAuthor} is created`,
        type: 'notification'
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
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
  }

  const increaseLikes = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(
      blogs
        .map(blog => blog.id !== id ? blog : returnedBlog)
        .sort((x, y) => y.likes - x.likes)
    )
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

  const loginForm = () => (
    <Togglable buttonLabel="Login">
        <LoginForm 
          handleLogin = {handleLogin}
          setUsername = {setUsername}
          setPassword = {setPassword}
        />
    </Togglable>
  )

  const content = () => (
    <div>
      <p>
        <span>{user.name} logged in </span>
        <button type="submit" onClick={handleLogout}>logout</button>
      </p>

      {newBlogForm()}

      <ul>
        {blogsToShow()}
      </ul>
    </div>
  )

  const newBlogFormRef = React.createRef()

  const newBlogForm = () => (
    <Togglable buttonLabel="Create New Blog" ref={newBlogFormRef}>
      <NewBlogForm 
        addBlog = {addBlog}
        newTitle={newTitle}
        handleTitleChange = {handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange = {handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange = {handleUrlChange}
      />
    </Togglable>
  )

  return (
    <div>

      <Notification 
        message={notification.message} 
        className={notification.type}
      />

      <h1>Blogs</h1>

      {user === null ?
        loginForm() :
        content()
      }
      
    </div>
  );
}

export default App;
