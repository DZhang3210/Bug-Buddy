import {useState, useEffect} from 'react'
import { useIssuesContext } from "../hooks/useIssuesContext"
import {useAuthContext} from '../hooks/useAuthContext'
import './IssueDetails.css'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCheck} from '@fortawesome/free-solid-svg-icons'


const IssueDetails = ({issue, filter, keyword}) => {
    const [details, setDetails] = useState('')
    const [render, setRender] = useState(false);
    const [warning, setWarning] = useState(null)
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
        const response = await fetch('/api/issue/general/'+user.teamID+"/"+filter + '/'+user.id+"/"+keyword,{
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
            setWarning(null)
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
            setWarning(null)
        }
    }


    const onClick = (curr) =>{
        return async () =>{
        dispatch({type:'CURR_ISSUE', payload: {issueID:curr}})
        navigate('/focus')
    }}

    let issueStyle = {}
    if(details)issueStyle = details.tags.includes('resolved') ? { backgroundColor: '#d1d1d1'} : {backgroundColor: 'white'}
    return ( 
        details && <div className="workout-wrapper" style={issueStyle}>
        <div className="workout-details" onClick={onClick(issue._id)}>
            <div>
                <h4>{details.title} 
                    {issue.watchViews.includes(user.id) && <FontAwesomeIcon icon={faEye}/>}
                    {details.tags && details.tags.includes('resolved') && <FontAwesomeIcon icon={faCheck}/>}
                </h4>
                
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
                        <div className="deleteSection" onClick = {()=>setWarning('delete')}>
                            <div className="material-symbols-outlined">Delete</div>
                        </div>
                        <div className="resolveSection" onClick={()=> setWarning('resolve')}>
                            <div className="material-symbols-outlined">Block</div>
                        </div>
                    </>
                }
            </div>
            {warning !== null && <div className = "cover">
                <div className ="cover-warning">
                    <div>Are you sure? These changes will be permanent</div>
                    <div>
                        {warning === "delete" && <button onClick={handleClick} className = "warning-button">Delete</button>}
                        {warning === "resolve" && <button onClick={resolveIssue} className = "resolve-button">Resolve</button>}
                        <button className = "cancel-button" onClick = {()=>setWarning(null)}>Cancel</button>
                    </div>
                </div>
            </div>}
        </div>
    
     );
}
 
export default IssueDetails;