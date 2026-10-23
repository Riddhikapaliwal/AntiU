import {Navigate} from 'react-router';

export default function ProtectedRoute({children}){
    const token= sessionStorage.getItem('token');

    if(!token)
            return <Navigate to="/login" replace/>

    return children;
}