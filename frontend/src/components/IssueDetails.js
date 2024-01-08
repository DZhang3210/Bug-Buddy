import {useState, useEffect} from 'react'
import { useIssuesContext } from "../hooks/useIssuesContext"
import {useAuthContext} from '../hooks/useAuthContext'
import './IssueDetails.css'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useNavigate } from "react-router-dom"

const IssueDetails = ({issue}) => {
    const [details, setDetails] = useState('')
    const [render, setRender] = useState(false);
    const {dispatch} = useIssuesContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("ReRender")
        const fetchIssues = async () => {
        const response = await fetch('/api/issue/'+issue._id,{
            headers: {
                'Authorization': `Bear ${user.token}`
            }})
        const json = await response.json()
        if (response.ok) {
            setDetails(json)
        }}
        if(user){
            fetchIssues().then(
                console.log('DETAILS',details)
            )
        }
    }, [user, render])


    const handleClick = async() =>{
        if(!user){return}
        const response = await fetch('/api/issue/' + issue._id,{
            method: 'DELETE', 
            headers: {
                'Authorization': `Bear ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok){
            dispatch({type:'DELETE_ISSUE', payload: json})
        }
    }
    const resolveIssue = async() =>{
        if(!user){return}
        const response = await fetch('/api/issue/' + issue._id,{
            method: 'PATCH', 
            body: JSON.stringify({action: "resolve"}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok){
            setRender((render) => !render)
        }
    }


    const onClick = (curr) =>{
        return async () =>{
        dispatch({type:'CURR_ISSUE', payload: {issueID:curr}})
        navigate('/focus')
    }}

    

    return ( 
        details && <div className = "workout-wrapper">
            <div className = "workout-details" onClick = {onClick(issue._id)}>
                <h4>{details.title}</h4>
                <p><strong>Author: </strong> {details.author_name}</p>
                <p>{formatDistanceToNow(new Date(details.createdAt), {addSuffix: true})}</p>
                <p>{details.description}</p>
                <div>
                    {details.tags.map((tag, index)=>(
                        <div key = {index}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            {details.author_id === user.id &&
            <div className = "deleteSection" onClick = {handleClick}>
                <div className = "material-symbols-outlined" >Delete</div>
            </div>
            }
            {details.author_id === user.id &&
            <div className = "resolveSection" onClick = {resolveIssue}>
                <div className = "material-symbols-outlined">Block</div>
            </div>
            }
        </div>
     );
}
 
export default IssueDetails;