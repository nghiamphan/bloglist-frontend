import React from 'react'

const Blog = ({ blog }) => (
  <li>
    {blog.title}, by <i>{blog.author}</i>
  </li>
)

export default Blog