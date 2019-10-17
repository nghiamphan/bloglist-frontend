import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'title-test',
    author: 'author-test',
    likes: 123
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('title-test')
  expect(component.container).toHaveTextContent('author-test')
  expect(component.container).toHaveTextContent('123')
})

test('clicking the button calls event handler twice', () => {
  const blog = {
    title: 'title-test',
    author: 'author-test',
    likes: 123
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})