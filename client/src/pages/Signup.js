import {useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import {useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConPassword, setConPassword] = useState('')
    const [TeamID, setTeamID] = useState('')
    const [FName, setFName] = useState('')
    const [LName, setLName] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password, FName, LName, ConPassword, TeamID)
    }

    return (  
        <form className = "signup" onSubmit = {handleSubmit}>
            <h3>Sign Up</h3>
            <label for = "fname">First Name:</label>
            <input 
            type = "text" 
            onChange = {e => setFName(e.target.value)}
            id  = "fname"
            placeholder = "First Name"
            value = {FName}
            />
            <label for = "lname">Last Name:</label>
            <input 
            type = "text" 
            onChange = {e => setLName(e.target.value)}
            id  = "lname"
            placeholder = "Last Name"
            value = {LName}
            />
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
            <label for = "cfpass">Confirm Password</label>
            <input 
            type = "text" 
            onChange = {e => setConPassword(e.target.value)}
            placeholder = "Confirm password"
            id  = "cfpass"
            value = {ConPassword}
            />
            <label for = "TeamID">Team ID</label>
            <input 
            type = "text" 
            onChange = {e => setTeamID(e.target.value)}
            placeholder = "Team ID"
            id  = "TeamID"
            value = {TeamID}
            />
            <button disabled = {isLoading}>Sign up</button>
            {error && <div className = "error">{error}</div>}
        </form>
        
    );
}
 
export default Signup;