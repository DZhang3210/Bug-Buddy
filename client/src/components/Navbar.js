import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
import {CiLogin, CiLogout, FaSignInAlt} from "react-icons/ci";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'
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
                <h1><FontAwesomeIcon icon={faBug} /> Bug Buddy</h1>
            </Link>
        </div>
        <nav className="navbar">
            <Link to = "/" className = "nav-link">Home</Link>
            <Link to="/form" className="nav-link">Form</Link>
            <div className="user-controls">
                {user &&
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleClick} className="logout-btn">
                            <CiLogout className="ci-logout" />Log Out
                        </button>

                    </>
                }
                {!user &&
                    <>
                        <Link to="/login" className="nav-link"><CiLogin/>Login</Link>
                        <Link to="/signup" className="nav-link"> <CiLogin/>Signup</Link>
                    </>
                }
            </div>
        </nav>
     </header>

    );
}
 
export default Navbar;