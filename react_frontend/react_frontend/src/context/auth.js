import {createContext, useReducer, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')) {
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'))
    if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
        console.log('expired token')
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (e) => {},
    logout: () => {},
  })

export default AuthContext;

function authReducer(state, action) {

    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT': 
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    // let [authToken, setAuthToken] = useState(null)
    // let [user, seuntUser] = useState(null)
    let navigate = useNavigate()

    let login = async(e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/authenticate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        })
        let data = await response.json()
        if(response.status===200){
            localStorage.setItem('jwtToken', data.access)
            dispatch({
                type: 'LOGIN',
                payload: jwt_decode(data.access)
            })
            navigate('/employees')
        }else{
            alert('Something is wrong')
        }

        
    }

    let logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({
            type: 'LOGOUT'
        })
    }

   

    return (
        <AuthContext.Provider value={{user: state.user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}