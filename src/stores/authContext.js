import { createContext, useEffect, useReducer, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget'

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

useEffect(() => {
    netlifyIdentity.on('login', () => {
        setUser(user)
        netlifyIdentity.close()
        console.log('login event')
    })

    // init netlify identity connection
    netlifyIdentity.init()
}, [])

const login = () => {
    netlifyIdentity.open()
}

const context = { user, login }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

