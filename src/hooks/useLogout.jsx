import { useAuthContext } from './useAuthContext'


export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        //removing user from localstorage
        localStorage.removeItem('user')

        //dispatching logout action
        dispatch({type: 'LOGOUT'})
    }
    
    return {logout}
}