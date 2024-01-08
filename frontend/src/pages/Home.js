import {useEffect} from 'react'
import IssueDetails from '../components/IssueDetails'
import {useIssuesContext} from '../hooks/useIssuesContext'
import { useAuthContext } from '../hooks/useAuthContext' 
import { FaStar, FaList, FaCheck } from 'react-icons/fa';

const Home = () => {

    //const [workouts, setWorkouts] = useState(null)
    // useEffect(()=> {
    //     const fetchWorkouts = async () =>{
    //         const response = await fetch('/api/workouts')
    //         const json = await response.json()
            
    //         if(response.ok) setWorkouts(json)
    //     }
    //     fetchWorkouts()
    // }, [])
    
    const { issues, dispatch } = useIssuesContext()
    const {user} = useAuthContext()

    useEffect(() => {
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
        <div className = "home">
            {/* <div><FaStar/>Starred</div>
            <div><FaList/>All</div>
            <div><FaCheck/>Resolved</div> */}
            <div className = "workouts">
                {issues && issues.map(
                    (issue) => (
                        <IssueDetails key = {issue._id} issue = {issue}/>
                    )
                )}
            </div>
        </div>
    )
}
export default Home