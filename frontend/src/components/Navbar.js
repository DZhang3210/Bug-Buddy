import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
import './navbar.css'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () =>{
        logout()
    }

    return (  
    <header>
        <div className="container">
            <Link to="/" className="brand-logo">
                <h1>Bug Buddy</h1>
            </Link>
        </div>
        <nav className="navbar">
            <Link to = "/" className = "nav-link">Home</Link>
            <Link to="/form" className="nav-link">Form</Link>
            <div className="user-controls">
                {user &&
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleClick} className="logout-btn">Log Out</button>
                    </>
                }
                {!user &&
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </>
                }
            </div>
        </nav>
     </header>

    );
}
 
export default Navbar;