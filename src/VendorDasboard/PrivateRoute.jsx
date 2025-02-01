
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const loginToken = localStorage.getItem('loginToken')
  return loginToken?children:<Navigate to='/'/>
    
}

export default PrivateRoute