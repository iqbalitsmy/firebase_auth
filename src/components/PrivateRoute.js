import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// export default function PrivateRoute() {

//     const { currentUser } = useAuth()

// //   return (
// //     // <Route
// //     //   {...rest}
// //     //   render={props => {
// //         // return currentUser ? <Component {...props}/> : <Navigate to="/login" />
// //     //   }}
// //     //   ></Route>
    
// //   )

// }
export default function PrivateRoute({ children }) {
    let location = useLocation();
    const { currentUser } = useAuth();
  
    // return children;
    return currentUser ? children : <Navigate to="/login" state={{ from: location}} replace />;
  }
