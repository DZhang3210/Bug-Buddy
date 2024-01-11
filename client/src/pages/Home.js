import {useEffect, useState} from 'react'
import IssueDetails from '../components/IssueDetails'
import {useIssuesContext} from '../hooks/useIssuesContext'
import { useAuthContext } from '../hooks/useAuthContext' 
import { FaStar, FaList, FaCheck } from 'react-icons/fa';


const Home = () => {
    const [filter, setFilter] = useState('All')
    const [keyword, setKeyword] = useState('')
    const [showTeamID, setShowTeamID] = useState(false);
    const { issues, dispatch } = useIssuesContext()
    const {user} = useAuthContext()
    useEffect(() => {
        //console.log('User: ', user)
        const fetchIssues = async () => {
        const response = await fetch('http://localhost:4000/api/issue/general/'+user.teamID+"/"+filter+"/"+user.id+"/"+keyword,{
            headers: {
                'Authorization': `Bear ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_ISSUES', payload: json})
        }
        }
        if(user){
            fetchIssues()   
        }
    }, [dispatch, user, filter, keyword])

    return(
        <div className="listed-issues">
            <div className="button-group">
                <button className= {filter === "All" ?"group-button-active": "group-button"}
                onClick={()=>setFilter('All')}
                >All</button>
                <button className= {filter === "Watching" ?"group-button-active": "group-button"}
                onClick={()=>setFilter('Watching')}>
                Watching</button>
                <button className= {filter === "Current" ?"group-button-active": "group-button"}
                onClick={()=>setFilter('Current')}>
                Current</button>
                <button className= {filter === "Resolved" ?"group-button-active": "group-button"}
                onClick={()=>setFilter('Resolved')}>
                Resolved</button>
                <input className="search-input" 
                placeholder="Search..."
                onChange={(e)=>setKeyword(e.target.value)}
                value = {keyword}
                ></input>
                <div className="yourComponent">
                    <button onClick={() => setShowTeamID(!showTeamID)}>
                        {showTeamID ? 'Hide Team ID' : 'Show Team ID'}
                    </button>
                    {showTeamID && <div className="teamID">Team ID: {user.teamID}</div>}
                </div>
            </div>
            {/* <div>
                <FaList className="fa-list" /> Current Issues
            </div>  */}
            <div className="home">
                <div className="workouts">
                    {issues && issues.map(
                        (issue) => (
                            <IssueDetails key={issue._id} issue={issue} filter = {filter} keyword = {keyword}/>
                        )
                    )}
                </div>
            </div>
        </div>

    )
}
export default Home