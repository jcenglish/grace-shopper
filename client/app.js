import React from 'react'
import {Navbar, Sidebar, SearchBar} from './components'
import Routes from './routes'

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Navbar />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>

        <div className="col-10">
          <Routes />
        </div>
      </div>
    </div>
  )
}

export default App
