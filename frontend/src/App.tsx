import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './layouts/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route 
          path='/search' 
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
