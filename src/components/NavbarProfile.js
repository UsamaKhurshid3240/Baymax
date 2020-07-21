import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import $ from 'jquery'
import jwt from 'jwt-decode'
class NavbarProfile extends Component {
   
    constructor() {
        super()
        this.state = {
            email: '',
            first_name: '',
            letter:""
        }

        

        var t= localStorage.getItem('usertoken')
        var decoded = jwt(t);
        this.state.first_name=decoded.identity.first_name;
        this.state.email=decoded.identity.email;;
       this.state.letter=this.state.email.charAt(0).toUpperCase();
        console.log(this.state.email.charAt(0).toUpperCase());
        console.log(decoded.identity.email);
    }

  componentDidMount(){ 
   

  }
        
  
    render () {
       
        return (
  
     <div className="top-menu w3-opacity w3-hover-opacity-off">

                {/* <div className="prf-mail">  
           
            <div className="prf-pic">{this.state.letter}</div>
           
            <span className="email-baymax ">
            Welcome,{this.state.first_name}
            </span>
            </div>

            <li className="lgo">  
        <a  >
        <i className="fa fa-robot fa-2x  icn-baymax"></i>
        <span className="txt-baymax fa-2x">
        BAYMAX
        </span>
        </a></li> */}
        <div className="row">
            {/* <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className=" col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-sm-12 col-md-3 col-lg-3"></div> */}
            <div className=" col-12 col-sm-12 col-md-12 col-lg-12">
           
            <div className="d-flex flex-row-reverse"> 
            <div className="p-2 ">baymax</div>
            <div className="p-2 ">

            <div className=" prf-pic">{this.state.letter}</div></div>
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