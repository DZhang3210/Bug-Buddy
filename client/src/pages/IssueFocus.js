
import {useEffect, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useIssuesContext } from '../hooks/useIssuesContext'
import './IssueFocus.css'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faLock} from '@fortawesome/free-solid-svg-icons'

const IssueFocus = () => {
    const [details, setDetails] = useState('')
    const [comment, setComment] = useState('')
    const [CurrComments, setCurComments] = useState([])
    const [watching, setWatching] = useState(null)
    const [render, setRender] = useState(false)
    const [error, setError] = useState(null)
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [par, setPar] = useState('')
    const {user} = useAuthContext()
    const {currentIssue} = useIssuesContext()

    useEffect(() => {
        const fetchIssue = async () => {
        const response = await fetch('https://bug-tracker-w9lv.onrender.com/api/issue/'+currentIssue,{
            headers: {
                'Authorization': `Bear ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            setDetails(json)
            setTitle(json.title)
            setPar(json.description)
            setWatching(json.watchViews.length)
            if(details !== null)
                console.log('USER', user, 'DETAILS',details)
        }}
        const fetchComments = async () => {
            const response = await fetch('https://bug-tracker-w9lv.onrender.com/api/comment/'+currentIssue,{
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

            const response = await fetch('https://bug-tracker-w9lv.onrender.com/api/comment/', {
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

    const onSubmit = async() =>{
        if(edit){
        if(!user){return}

        const response = await fetch('https://bug-tracker-w9lv.onrender.com/api/issue/' + currentIssue,{
            method: 'PATCH', 
            body: JSON.stringify({action:"edit",title, description:par}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok){
            setRender((render) => !render)
            console.log("NEW SUBMIT",json)
        }

        }
        setEdit(!edit)
    }
    const changeViews = async () =>{
        if(!user){return}
        const response1 = await fetch('https://bug-tracker-w9lv.onrender.com/api/issue/' + currentIssue,{
            method: 'PATCH', 
            body: JSON.stringify({action:"views", user:user.id}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bear ${user.token}`
            }
        })
        const json = await response1.json()
        if (response1.ok){
            setRender((render) => !render)
            console.log("NEW SUBMIT",json)
        }
    }


    return (  
        <div className="focus-wrapper">
            <div className="focus">
                <div className="top-section">
                    {!edit && <span className="article-title">{details.title}</span>}
                    <div className = "article-dash">
                        {!edit && 
                            <span className = 
                                {details && details.watchViews.includes(user.id) ?"active":"edit"} 
                                onClick = {()=>changeViews()}>
                                {details && details.watchViews.includes(user.id) && <FontAwesomeIcon icon={faEye}Watching/> }
                                {details && details.watchViews.includes(user.id) ? 'Watching' : 'Watch'} ({watching})
                            </span>}
                        {edit && (
                            <div className="edit-input-container">
                                <label>Title: </label><input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="title"
                                    value={title}
                                />
                                <div className="edit" onClick={() => onSubmit()}>{!edit ? 'Edit' : 'Submit'}</div>
                            </div>
                        )}

                        {(details && details.tags.includes('resolved')) ? <div className="tag">Resolved</div> : 
                            (details.author_id === user.id && !edit && <div className="edit" onClick={() => setEdit(true)}>Edit</div>)
                        }
                    </div>
                    <div className="article-extra">
                        Opened {details.createdAt && <span className="article-detail"><strong>{formatDistanceToNow(new Date(details.createdAt), {addSuffix: true})}</strong> by {details.author_name}</span>}
                    </div>
                    
                </div>

                {!edit ? <div className="description">{details.description}</div> : 
                    <div className = "description-input">
                        <label>Description: </label>
                        <input
                            type = "text"
                            value = {par}
                            onChange = {(e) => setPar(e.target.value)}
                            placeholder = "description"
                        ></input>
                    </div>
                    }
            </div>
            {!edit && details && (details.tags.includes('resolved')? <div className = "commentPrompt">
                [Issue Resolved] Comment Section Is Now Locked<FontAwesomeIcon icon={faLock}/>
            </div> :
            <div className="commentSection">
                <form onSubmit={handleSubmit}>
                    <div className="commentTitle">Comment Something</div>
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
            </div>)}
            <div className="commentsContainer">
                {CurrComments.map((cover) => (
                    <div className="singleComment" key={cover._id}>
                        <p className="commentText">{cover.comment}</p>
                        <div className= "commentAuthor">{cover.author_name}</div>
                    </div>
                ))} 
            </div>
        </div>
    


    );
}
 
export default IssueFocus;