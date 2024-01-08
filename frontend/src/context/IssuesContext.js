import { createContext, useReducer } from 'react'

export const IssuesContext = createContext()

export const issuesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISSUES':
      return { 
        issues: action.payload, 
        currentIssue: state.currentIssue
      }
    case 'CREATE_ISSUE':
      return { 
        issues: [action.payload, ...state.issues],
        currentIssue: state.currentIssue
      }
    case 'DELETE_ISSUE':
        return {
            issues: state.issues.filter((w)=>w._id !== action.payload._id),
            currentIssue: state.currentIssue
        }
    case 'CURR_ISSUE':
       return{
          issues: state.issues,
          currentIssue: action.payload.issueID
       }
    default:
      return state
  }
}

export const IssuesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issuesReducer, { 
    issues: null, currentIssue: null
  })
  
  return (
    <IssuesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </IssuesContext.Provider>
  )
}