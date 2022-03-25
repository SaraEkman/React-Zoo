import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <header>
        <h1>
          <Link to="/">React Zoo</Link>
        </h1>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default App
