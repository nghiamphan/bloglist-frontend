import React from 'react'

const NewBlogForm = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange }) => (
  <div>
    <h1>create new</h1>
    
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>

      <div>
        url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      
      <button type="submit">create</button>
    </form>  
  </div>
  
)

export default NewBlogForm