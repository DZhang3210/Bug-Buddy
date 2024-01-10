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
            fetchIssues()
        }
    }, [user, render])


    const OnResolve = async () => {
        const response = await fetch('/api/issue/general/'+user.teamID,{
            headers: {
                'Authorization': `Bear ${user.token}`
            }})
        const json = await response.json()
        if (response.ok) {
            dispatch({type: 'SET_ISSUES', payload: json})
        }}

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
            OnResolve()
        }
    }


    const onClick = (curr) =>{
        return async () =>{
        dispatch({type:'CURR_ISSUE', payload: {issueID:curr}})
        navigate('/focus')
    }}

    
    const issueStyle = issue.tags.includes('resolved') ? { backgroundColor: '#d5deeb'} : {backgroundColor: 'white'}
    return ( 
        details && <div className="workout-wrapper" style={issueStyle}>
        <div className="workout-details" onClick={onClick(issue._id)}>
            <div>
                <h4>{details.title}</h4>
                {details.tags.map((tag, index) => (
                    <div key={index}>
                        {tag}
                    </div>
                ))}
            </div>
            <div className = "issueDetails">
                <span>
                    Opened <strong>{formatDistanceToNow(new Date(details.createdAt), {addSuffix: true})}</strong> by {details.author_name}
                </span>
            </div>
            </div>
            <div className="buttons">
                {details.author_id === user.id &&
                    <>
                        <div className="deleteSection" onClick={handleClick}>
                            <div className="material-symbols-outlined">Delete</div>
                        </div>
                        <div className="resolveSection" onClick={resolveIssue}>
                            <div className="material-symbols-outlined">Block</div>
                        </div>
                    </>
                }
            </div>
        </div>
    
     );
}
 
export default IssueDetails;