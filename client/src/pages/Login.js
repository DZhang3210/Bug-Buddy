import {useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const {dispatch} = useAuthContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    return (  
        <form className = "login" onSubmit = {handleSubmit}>
            <h3>Login</h3>

            <label for = "fmail">Email:</label>
            <input 
            type = "email" 
            onChange = {e => setEmail(e.target.value)}
            id  = "fmail"
            placeholder = "Email"
            value = {email}
            />
            <label for = "fpass">Password</label>
            <input 
            type = "text" 
            onChange = {e => setPassword(e.target.value)}
            placeholder = "password"
            id  = "fpass"
            value = {password}
            />
            <button>Log in</button>
            {error && <div className = "error">{error}</div>}
            <div className = "instructions">
                <div>Test Email: dummy@gmail.com</div>
                <div>Test Password: Password1!</div>
            </div>
        </form>
    );
}
 
export default Login;