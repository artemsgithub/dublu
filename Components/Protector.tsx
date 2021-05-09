import React, { Component, ReactChild } from 'react'
import { Route, Redirect } from 'react-router-dom'

type ProtectorProps = { 
    children: ReactChild  // everything passed into this key, is type Component (t.d)

} & Record<string, any>  // any other key, any other value, just no numbers




export default class Protector extends Component<ProtectorProps>{
    
    render() {
        // spread operator ..rest => all the other keys not listed, grab them and put them into the object called rest
        const {children, ...allTheRest } = this.props
        const token = localStorage.getItem("token") 
        console.log(token)
        if (!token) {
           return  <Redirect to="/" />
        }
        return (
            <>
            {/* return the route component and then render whatever is inside the protector component */}
            <Route {...allTheRest}>
                {children}
            </Route>       
            </>
        )
    }
}
