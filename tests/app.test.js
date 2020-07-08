import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '../src/components/Layout.jsx'

it('Renders successfully', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Layout />, div)
  ReactDOM.unmountComponentAtNode(div)
})
