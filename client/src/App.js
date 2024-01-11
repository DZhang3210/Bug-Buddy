import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'


// Pages and Components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import IssueForm from './pages/IssueForm'
import IssueFocus from './pages/IssueFocus'

function App() {
  const {user} = useAuthContext();
  return(
  <div className = "App">
    <BrowserRouter>
      <Navbar/>
      <div className = "pages">
        <Routes>
          <Route
            path = "/"
            element = {user ? <Home/> : <Navigate to ="/login"/>}
          />
          <Route
            path = "/form"
            element = {user ? <IssueForm/>: <Navigate to = "/login"/>}
          />
          <Route
            path = "/focus"
            element = {user ? <IssueFocus/> : <Navigate to = "/login"/>}
            />
          <Route
            path = "/login"
            element = {!user ? <Login/> : <Navigate to = "/"/>}
          />
          <Route
            path = "/signup"
            element = {!user ? <Signup/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
)}

export default App;
