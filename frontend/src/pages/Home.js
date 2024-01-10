import {useEffect} from 'react'
import IssueDetails from '../components/IssueDetails'
import {useIssuesContext} from '../hooks/useIssuesContext'
import { useAuthContext } from '../hooks/useAuthContext' 
import { FaStar, FaList, FaCheck } from 'react-icons/fa';


const Home = () => {
    
    const { issues, dispatch } = useIssuesContext()
    const {user} = useAuthContext()
    useEffect(() => {
        
        console.log('User: ', user)
        const fetchIssues = async () => {
        const response = await fetch('/api/issue/general/'+user.teamID,{
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
    }, [dispatch, user])

    return(
        <div className="listed-issues">
            <div>
                <FaList className="fa-list" /> Current Issues
            </div> 
            <div className="home">
                <div className="workouts">
                    {issues && issues.map(
                        (issue) => (
                            <IssueDetails key={issue._id} issue={issue}/>
                        )
                    )}
                </div>
            </div>
        </div>

    )
}
export default Home