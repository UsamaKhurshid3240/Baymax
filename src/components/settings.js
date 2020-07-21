import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import jwt_decode from 'jwt-decode'

import $ from 'jquery'
import "../components/chat.scss";
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';



import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactCodeInput from 'react-verification-code-input';
import PinInput from "react-pin-input";
import Countdown from "react-countdown-now";
import OtpInputCard from 'react-otp-input';
class Settings extends Component {
    constructor() {
        super()
        this.state = {
          
        }
    }


    render () {
        return (
        <div className="back">
             <div className="base-container" >
    
    <div className="col-sm-4 col-md-10 col-lg-4 ">
     
     
                               
     <div className="main w3-hover-opacity-off">

    <div className="content">
        
        <div className="row rw-mr">
        <Link to='/' className="back-lnk">
        <i className="fas fa-backward back-btn"></i></Link>
        <div className="head reg-hd"><h1>Update Profile</h1></div>
            </div>
    
      <div className="row rw">
          
      <div className="col-sm-4 col-md-10 col-lg-10 ">
    
      <form  >
                         
                         <div className="form-group">
                       
  
                            <input type="text"
                            id="name"
                                className="form-control in-css "
                                name="first_name"
                                placeholder=""
                                value={this.state.first_name}
                                onChange={this.onChange} 
                                autoComplete="off" required/>
                                   <label className="form-control-placeholder" htmlFor="name">Nick Name</label>
                        </div>
                       
    
   
 
                     
                        <div className="form-group">
                            
                            <input  type="email"
                                className="form-control in-css"
                                name="email"
                                placeholder=""
                                value={this.state.email}
                                onBlur={this.emailchek}
                                onChange={this.onChange} 
                                autoComplete="off" required/>
                                 <label className="form-control-placeholder" htmlFor="email">Email</label>
                        </div>
                        
                        <div className="form-group">
                            
                            <input type="password"
                                className="form-control in-css"
                                name="password"
                                placeholder=" "
                                value={this.state.password}
                                onChange={this.onChange} required/>
                                <label className="form-control-placeholder" htmlFor="password">Password </label>
                        </div>

                        <div className="form-group">
                            
                            <input id="c" type="password"
                                className="form-control in-css"
                                name="cpassword"
                                placeholder=" "
                                value={this.state.cpassword}
                                onBlur={this.passcheck}
                                onChange={this.onChange} required />
                                  <label className="form-control-placeholder" htmlFor="cpassword">Confirm Password </label>
                                
                        </div>
                        <div className="form-group"> <p className="dob">dob</p>  
    <DatePicker  className="form-control in-css sm-dt"   name="dob"  selected={this.state.dob}
      value={this.state.dob}
    onChange={this.handleChange} required/>
    
   
   {/* <div id="app"></div> */}

</div>

                        
                        <button id="button" type="submit" className="btn btn-lg btn-primary btn-block reg-btn" disabled={!this.state.bool} onClick={this.onSubmit}>
                            Register
                        </button>
                      
  
                       </form>
                       
</div>
</div>
</div>
</div>
</div>
</div>
         
            </div>
        )
    }
}

export default Settings