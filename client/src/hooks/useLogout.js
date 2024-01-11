import {useAuthContext} from './useAuthContext'
import {useIssuesContext} from './useIssuesContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch:issuesDispatch} = useIssuesContext()
    const logout = () =>{
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        issuesDispatch({type:'SET_ISSUES', payload:null})
    }

    return {logout}
}
 