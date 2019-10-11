import React, { useState } from 'react'

const Blog = ({ blog, increaseLikes }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (expanded) {
    return (
      <li className="blog-expanded">
        <div onClick={() => toggleExpanded()}>
          {blog.title}, by <i>{blog.author}</i>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={increaseLikes}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </li>
    )
  }

  return (
    <li className="blog" onClick={() => toggleExpanded()}>
      {blog.title}, by <i>{blog.author}</i>
    </li>
  )
}

export default Blog