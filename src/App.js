import React, { useState, useEffect } from 'react'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'

function App() {
  const [notification, setNotification] = useState({
    message: '',
    type: ''
  })
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const username = useField('text')
  const password = useField('password')

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

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
      remove={() => removeBlog(blog.id)}
      removeAllowed={user.username === blog.user.username}
    />
  )

  const addBlog = async (event) => {
    //event.preventDefault()
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
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
      newTitle.set('')
      newAuthor.set('')
      newUrl.set('')
    }
    else {
      setNotification({
        message: 'Missing title or url',
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

  const removeBlog = async (id) => {
    blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.set('')
      password.set('')
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
        username = {username}
        password = {password}
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
        newAuthor={newAuthor}
        newUrl={newUrl}
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
  )
}

export default App
