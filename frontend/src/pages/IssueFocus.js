
import {useEffect, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useIssuesContext } from '../hooks/useIssuesContext'
import './IssueFocus.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const IssueFocus = () => {
    const [details, setDetails] = useState('')
    const [comment, setComment] = useState('')
    const [CurrComments, setCurComments] = useState([])
    const [render, setRender] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()
    const {currentIssue} = useIssuesContext()

    useEffect(() => {
        const fetchIssue = async () => {
        const response = await fetch('/api/issue/'+currentIssue,{
            headers: {
                'Authorization': `Bear ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            setDetails(json)
        }}
        const fetchComments = async () => {
            const response = await fetch('/api/comment/'+currentIssue,{
                headers: {
                    'Authorization': `Bear ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setCurComments(json)
            }
            }

        if(user){
            fetchIssue()
            fetchComments()
            setError(null)
        }
    }, [user,render])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            return 
        }
            const sent = {author_id:user.id, author_name: user.firstName, issue_id: currentIssue, comment}

            const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify(sent),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${user.token}`
            }
            })
        const json = await response.json()
        if (!response.ok){
            console.log(json)
            setError(json.error)
            console.log("ERROR")
        }
        if (response.ok) {
            setComment('')
            setRender((render) => !render)
        }
    } 

    return (  
        <div className="focus-wrapper">
            <div className="focus">
                <h1 className="article-title">{details.title}</h1>
                {details.createdAt && <div className="article-detail">{formatDistanceToNow(new Date(details.createdAt), {addSuffix: true})}</div>}
                <div className="article-detail">{details.author_name}</div>
                <div className="article-detail">{details.description}</div>
            </div>
            <div className="commentSection">
                <form onSubmit={handleSubmit}>
                    <div className="commentPrompt">Comment Something</div>
                    <div className="inputButtonContainer">
                        <input 
                            className="commentInput"
                            type="text" 
                            onChange={(e) => setComment(e.target.value)} 
                            value={comment}
                            placeholder="Type a Comment Here!"
                        />
                        <button className="commentButton">Add Comment</button>
                    </div>
                    {error && <div className = "error">{error}</div>}
                </form>
            </div>
            <div className="commentsContainer">
                {CurrComments.map((cover) => (
                    <div className="singleComment" key={cover._id}>
                        <p className="commentAuthor">Author: {cover.author_name}</p>
                        <p className="commentText">{cover.comment}</p>
                        {/* Additional details like date, reply button etc. can be added here */}
                    </div>
                ))}
            </div>
        </div>
    


    );
}
 
export default IssueFocus;