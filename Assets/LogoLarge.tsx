import React, { Component } from 'react'


export default class LogoLarge extends Component {
    render() {
        
        const styles = {
            fonts: {
              fontSize: '4.2rem',
              fontFamily: 'Nunito',
              background: "radial-gradient(circle at 50% -20.71%, #a3a7ff 0, #7a8ffc 25%, #3c78f2 50%, #0063e8 75%, #0051de 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }
        }

        return (
            
            <div>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet"></link>
                <div style={styles.fonts}
                >Dublu</div>
                
            </div>
        )
    }
}
