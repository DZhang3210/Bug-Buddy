 import {useState} from 'react'
 import {useAuthContext} from './useAuthContext'

 export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext();

    const signup = async (email, password, FName, LName, conPassword, teamID) =>{
        setIsLoading(true)
        setError(null)
        const response = await fetch('https://bug-tracker-w9lv.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, firstName: FName, lastName: LName, conPassword, teamID})
        })
        //returns email and json web token 
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }

    }
    return {signup, isLoading, error}
 }