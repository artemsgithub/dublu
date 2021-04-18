import React, { Component, ReactChild } from 'react'
import { Route, Redirect } from 'react-router-dom'

type ProtectorProps = { 
    children: ReactChild  // everything passed into this key, is type Component (t.d)
    sessionToken: string
} & Record<string, any>  // any other key, any other value, just no numbers




export default class Protector extends Component<ProtectorProps>{
    
    render() {
        const {sessionToken, children, ...rest } = this.props
        const token = localStorage.getItem("token")
        console.log(token)
        console.log(sessionToken)
        return (
            <Route {...rest} render={(props) => (
                !!token
                  ? children
                  : <Redirect to='/' />
              )} />
        )
    }
}
