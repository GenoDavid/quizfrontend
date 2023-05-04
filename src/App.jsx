import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Questions from './pages/question/Questions'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/question/:id' element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
