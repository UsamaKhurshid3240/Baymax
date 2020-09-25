//imports
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import jwt from 'jwt-decode'

class NavbarProfile extends Component {
   
    constructor() {
        super()
        this.state = {
            email: '',
            message: '',
            letter:""
        }
        var t= localStorage.getItem('usertoken')
        var decoded = jwt(t);
        this.state.first_name=decoded.identity.first_name;
        this.state.email=decoded.identity.email;;
       this.state.letter=this.state.email.charAt(0).toUpperCase();
      
    }

  componentDidMount(){ 
   

  }
        
  
    render () {
       
        return (
  
     <div className="top-menu w3-opacity w3-hover-opacity-off">

        <div className="row">
           
            <div className=" col-12 col-sm-12 col-md-12 col-lg-12">
           
            <div className="d-flex flex-row-reverse"> 
            <div className="p-2 ">baymax</div>
            <div className="p-2 ">

            <div className=" prf-pic"><span className="topnav-lett">{this.state.letter}</span></div></div>
            <div className="p-3 ">
          
           <span className="lg-mail">
           
           Welcome,{this.state.first_name}
           </span>
           </div>
            </div>
            </div>
       
        </div>
     </div>

        )
    }
}

export default withRouter(NavbarProfile)