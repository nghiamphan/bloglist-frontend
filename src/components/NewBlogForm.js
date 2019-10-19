import React from 'react'

const NewBlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => (
  <div>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type={newTitle.type}
          value={newTitle.value}
          onChange={newTitle.onChange}
        />
      </div>

      <div>
        author:
        <input
          type={newAuthor.type}
          value={newAuthor.value}
          onChange={newAuthor.onChange}
        />
      </div>

      <div>
        url:
        <input
          type={newUrl.type}
          value={newUrl.value}
          onChange={newUrl.onChange}
        />
      </div>

      <button type="submit">create</button>
    </form>
  </div>

)

export default NewBlogForm