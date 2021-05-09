import React, { Component } from 'react'


type AdminState = {
    users: any[] | null
  };
  

  type AdminProps = {

  };

export default class Admin extends Component <AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {
          users: null 
        };
      }
    
      
    componentDidMount() {
        this.displayUsers()
    }

    displayUsers = () => {
        fetch("http://localhost:3000/admin/all-users", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") ?? "",
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            this.setState({users : json});
          })
          .catch((error) => console.error("Error:", error));
      };


    render() {
    
        if (this.state.users === null) {
            return <div style={{marginTop: '25px'}}>Loading</div>
          }

        return (
            <div>
              {this.state.users.map((user, index)=> (
                <div>{user.id}
                <div>{user.email}</div>
                </div>
              ))}
            </div>
        )
    }
}
