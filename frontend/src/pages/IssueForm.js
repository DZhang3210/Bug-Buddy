import { useState } from 'react'
import { useIssuesContext } from '../hooks/useIssuesContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const IssueForm = () => {
  const { dispatch } = useIssuesContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError('You must be logged in')
      return 
    }
    console.log(user)
    const issue = {
      title, author_name: user.firstName, description, tags,
      author_id: user.id, teamID: user.teamID, issue_id: 1
    }
    //console.log(issue)

    const response = await fetch('/api/issue/', {
      method: 'POST',
      body: JSON.stringify(issue),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bear ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setDescription('')
      setTags([])
      setEmptyFields([])
      //console.log('new issue added:', json)
      dispatch({type: "CREATE_ISSUE", payload: json})
      navigate('/')
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Issue</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className = {emptyFields.includes('title') ? 'error' : ''}
      />
      
      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className = {emptyFields.includes('description') ? 'error' : ''}
      />

      <button>Add Issue</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default IssueForm