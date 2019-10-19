import React from 'react'
import { inputAttrs }from '../hooks'

const NewBlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => (
  <div>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          {...inputAttrs(newTitle)}
        />
      </div>

      <div>
        author:
        <input
          {...inputAttrs(newAuthor)}
        />
      </div>

      <div>
        url:
        <input
          {...inputAttrs(newUrl)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  </div>

)

export default NewBlogForm