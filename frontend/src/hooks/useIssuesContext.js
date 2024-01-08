import { IssuesContext } from "../context/IssuesContext"
import { useContext } from "react"

export const useIssuesContext = () => {
  const context = useContext(IssuesContext)

  if(!context) {
    throw Error('useIssuesContext must be used inside an WorkoutsContextProvider')
  }

  return context
}