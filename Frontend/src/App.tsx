
import './App.css'
import Login from "./pages/login/Login.tsx"
import SignUp from './pages/signup/SignUp.tsx'
import Home from "./pages/home/Home.tsx"
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext.tsx'

function App() {

  const { authUser }:any = useAuthContext();
  return (
    <>
      <div className='h-screen p-4  flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/signUp' element={authUser ? <Navigate to={"/"} /> : <SignUp />} />
          <Route path='/login' element={authUser ? <Navigate to={"/"} /> :<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
