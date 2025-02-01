import { Navigate } from "react-router-dom"

const HomePrivateRoute = ({children}) => {
    const loginToken = localStorage.getItem('loginToken')
    return !loginToken? children:<Navigate to='/Welcome'/>
  
}

export default HomePrivateRoute