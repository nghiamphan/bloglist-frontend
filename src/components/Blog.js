import React from 'react'

const Blog = ({ blog }) => (
  <li className="blog">
    {blog.title}, by <i>{blog.author}</i>
  </li>
)

export default Blog