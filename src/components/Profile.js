import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import $, { timers } from 'jquery'
import jwt from 'jwt-decode'
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from 'react-modal';
import {updatepass} from './UserFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {checkpassword} from'./UserFunctions';
import ReactCodeInput from 'react-verification-code-input';
import PinInput from "react-pin-input";
import Countdown from "react-countdown-now";
import OtpInputCard from 'react-otp-input';
import {emailcheck} from './UserFunctions';
import {updatee} from './UserFunctions';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            oldpassword: '',
            newpassword:'',
            email: '',
            dob:'',
            age:'',
            chk:true,
            updateres:'',
            chkmail:'',
            id:'',
            password:'',
        nwdob:new Date,
        gender:'',
           
          
        }
       this.gettoken();
       
        this.newpasss=this.newpasss.bind(this);
        this.changepass=this.changepass.bind(this);
        this.change=this.change.bind(this);
        this.update=this.update.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.oldpas=this.oldpas.bind(this);
        this.updatepass=this.updatepass.bind(this);
        this.newpass=this.newpass.bind(this);
       this.handledob=this.handledob.bind(this);
       this.edtdob=this.edtdob.bind(this);
       
    }

    gettoken(){
      var t= localStorage.getItem('usertoken')
      var p= localStorage.getItem('password')
      var decoded = jwt(t);
      this.state.first_name=decoded.identity.first_name;
      this.state.email=decoded.identity.email;
      this.state.chkmail=decoded.identity.email;
    this.state.id=decoded.identity.id;
   this.state.dob= decoded.identity.dob.slice(0,10);
this.state.gender=decoded.identity.gender;
  
      this.state.age=decoded.identity.age;
      console.log("usama"+this.state.email);
      console.log("usama"+this.state.first_name);
      console.log("usama"+this.state.dob);
      console.log("usama"+this.state.id);

    }

    componentDidMount(){
      $('#dobb').hide();
      $('#update-btn').hide();
      $('#content2').hide();
      $('#nwpasss').hide();
      $('#nwpassslbl').hide();
      $('#updatepass-btn').hide();
    }
    change(e){
     
      
        $('#update-btn').show();
       
          this.setState({ [e.target.name]: e.target.value })
      
      console.log("chanegpassword reg"+ this.state.chk);
    }
    oldpas(e){
      this.setState({ [e.target.name]: e.target.value })
    }
    newpass(e){
      this.setState({ [e.target.name]: e.target.value })
      $('#updatepass-btn').show();
    }

    updatepass(){
      if(this.state.newpassword!=""){
      const updUserpass = {
        password:this.state.newpassword,
       
        id:this.state.id
      }
      updatepass(updUserpass).then(res => {
        this.state.updateres=res;
           console.log(this.state.updateres);
           
          
         })
        }
        else{
          alert("Passwordfield empty");
        }
  }
 
  edtdob(){
    $('#dobb').show();
  }
changepass(){
  console.log("chanegpassword"+this.state.nwdob);
  
  this.state.chk=false;
  $('#content1').hide();
  $('#content2').toggle();

  

}

newpasss(){
  console.log(this.state.oldpassword);
  const newUser = {
    email: this.state.chkmail,
   
    password: this.state.oldpassword
}    
console.log(this.state.chkmail);
  checkpassword(newUser).then(res => {
   
        console.log(res);
        if(res=="Matched")
        {
          $('#nwpassslbl').show();
  $('#nwpasss').show();
        }
        else{
          alert("Password Wrong");
        }
        
       
      })

  
}
in(){
  console.log("in"+ this.state.password);
  const updUser = {first_name: this.state.first_name,
    dob: this.state.dob,
    email: this.state.email,
   
    id:this.state.id
  }
  updatee(updUser).then(res => {
    this.state.updateres=res;
       console.log(this.state.updateres);
       
      
     })
}
update(){
 
  if(this.state.email!=this.state.chkmail)
  {
    const newUser = {
    
      email: this.state.email,
      
    }
    console.log(this.state.email);
  
    emailcheck(newUser).then(res => {
    this.em=res
      console.log("mail"+this.em);
      if(this.em=="Not Found"){
        console.log("Not F")
        toast.error("Email Not Exists", {
          position: toast.POSITION.CENTER_CENTER
        });
      this.in();
      
      }
      else{
       alert("EmailExist");
        console.log("Found")
      }
      
    })
    
}
else{
  
  this.in();
 
}



}


onSubmit(){
  console.log(this.state.first_name);
  console.log(this.state.email);
  console.log(this.state.dob);

 
}

handledob = date => {
 
  this.setState({
    nwdob: date
  });
  $('#update-btn').show();
};


    render () {
        return (
  
             
          <div className="App">
          <div className="imageDiv image1"></div>
          <div className="imageDiv image2 fadeInClass"></div>
          <div className="imageDiv image3 "></div>
          <div className="imageDiv image4 fadeInClass"></div>
         
          <ToastContainer />

          <div className="container" >
               
               <div className="row">
               <div className="col-12 col-sm-12 col-md-2 col-lg-0 "></div>
               <div className="col-12 col-sm-12 col-md-8 col-lg-5 " >
              <div className="row">
              <div className="col-2 col-sm-2 col-md-2 col-lg-2"></div>
                <div className="col-10 col-sm-10 col-md-12 col-lg-12">
               <div className="mainn w3-hover-opacity-off"><div className="content">
                
               <div className="container">
              
 
<div className="flip-card flip-crd ">
  <div className="flip-card-inner">
    <div className="flip-card-front">
    <div className="container-fluid">
    <div className="row row-mrgn">
    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
      <fieldset className="fldst4">
     <legend className=""><h1 className="per">Personal</h1> </legend>
    <p> Hover me or Click me</p>
     </fieldset>
     </div>
     </div>
     </div>
    </div>
    <div className="flip-card-back w3-hover-opacity-off ">
   <div id="content1" >  
   <div className="container-fluid">
    
     <form >    
     <fieldset className="fldst5">
       <legend>Personal Info</legend>
    <div className="row row-mrgn">
    <div className="col-12 col-sm-3 col-md-3 col-lg-3"> Name </div>
        <div className="col-12 col-sm-8 col-md-8 col-lg-8"> 
                    
                        
        <input type="text"
                                    className="form-control"
                                   name="first_name"
                                    placeholder={this.state.first_name}
                                    defaultValue={this.state.first_name}
                                    onChange={this.change}  
                                    
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Email </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input type="text"
                                    className="form-control  "
                                   name="email"
                                    placeholder={this.state.email}
                                    defaultValue={this.state.email}
                                    
                                    onChange={this.change}
                                 
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Gender </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input type="text"
                                    className="form-control  "
                                   name="email"
                                    placeholder={this.state.gender}
                                    defaultValue={this.state.gender}
                                    readOnly={true}
                                    onChange={this.change}
                                 
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Dob </div>
        <div className="col-sm-8 col-md-7  col-lg-7"> 
                           
       {this.state.dob}
      <a> <i className="fas fa-edit" onClick={this.edtdob}>edit</i></a> 
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                         
                            <div id="dobb" className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Set Dob </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
        <DatePicker  className="form-control  "   name="dob"  selected={this.state.nwdob}
          value={this.state.nwdob}
        onChange={this.handledob} required/>             
                        
         
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Age </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input type="text"
                                    className="form-control  "
                                   name="age"
                                    placeholder={this.state.age}
                                    defaultValue={this.state.age}
                                    readOnly={true}
                                    autoComplete="off"/>      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                          

                            <div className="row row-mrgn">
   
        <div className="col-12 col-sm-12 col-md-12 col-lg-12"> 
                           
                        
        <button id="button" type="button" className=" btn-primary btn-block  " onClick={this.changepass}>
                               Change Password
                            </button>
                           
                            </div>
                           
                            </div>
                         

                          

                            <div className="row row-mrgn">
   
        <div className="col-12 col-sm-12 col-md-12 col-lg-12"> 
                           
                        
        <button id="update-btn" type="button" className="btn btn-lg btn-primary btn-block "  onClick={this.update}>
                                Update
                            </button>
                           
                            </div>
                           
                            </div>
                            </fieldset>
                            </form>
                         
                            </div>


                            </div>       

                            <div id="content2"> <div className="container-fluid">
                                 <div className="row row-mrgn">
    <div  className="col-sm-3 col-md-3 col-lg-3">   <a href="/profile" className="back-lnk">
            <i className="fas fa-backward back-btn" ></i></a> </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                            <fieldset className="fldst5">
  <legend>Change Password</legend>
                            <form >    
                         

    <div className="row row-mrgn">
    <div  id="oldpassslbl" className="col-sm-3 col-md-3 col-lg-3"> Old Password </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                    
                        
        <input  type="password"
        id="passs"
                                    className="form-control  "
                                   name="oldpassword"
                                    placeholder=""
                                   onChange={this.oldpas}
                            onBlur={this.newpasss}
                                    autoComplete="off" />     
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div  id="nwpassslbl" className="col-sm-3 col-md-3 col-lg-3"> New Password </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 

                            <input  type="password"
        id="nwpasss"
                                    className="form-control  "
                                   name="newpassword"
                                    placeholder=" "
                                    value={this.state.newpassword}
                                    onChange={this.newpass}
                                   
                         
                                    autoComplete="off" />
                                     </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                            <div className="row row-mrgn">
    
        <div className="col-12 col-sm-12 col-md-12 col-lg-12"> 
                            <button id="updatepass-btn" type="button" className=" btn-primary btn-block " onClick={this.updatepass} >
                                Update Password
                            </button>
                            </div>
                          
                            </div>
</form>
</fieldset>




                            </div>
</div>   
    </div>
  </div>

   




</div>
           </div>   
            </div> 
            </div>
            </div> 
            </div>  
          </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-5 status">
            <div className="row">
              <div className="col-2 col-sm-2 col-md-2 col-lg-2"></div>
                <div className="col-10 col-sm-10 col-md-12 col-lg-12">
               <div className="mainn w3-hover-opacity-off"><div className="content">
                
               <div className="container">
              
 
<div className="flip-card flip-crd ">
  <div className="flip-card-inner">
    <div className="flip-card-front">
    <div className="container-fluid">
    <div className="row row-mrgn">
    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
      <fieldset className="fldst4">
     <legend className=""><h1 className="per">Status</h1> </legend>
    <p> Hover me or Click me</p>
     </fieldset>
     </div>
     </div>
     </div>
    </div>
    <div className="flip-card-back w3-hover-opacity-off ">
   <div id="content1" >  
   <div className="container-fluid">
    
     <form >    
     <fieldset className="fldst5">
       <legend>Current Status</legend>
  
                            </fieldset>
                            </form>
                         
                            </div>


                            </div>       

                          
    </div>
  </div>

   




</div>
           </div>   
            </div> 
            </div>
            </div> 
            </div>  
              
           </div>  
           
             </div>  
             </div>  
{/* <div className="row row-content">

       <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">  <div className="container-fluid"><div className="mainn w3-hover-opacity-off ">
   <div className="clrrr"></div>
   <div>
<div className="flip-card flip-crd ">
  <div className="flip-card-inner">
    <div className="flip-card-front">
     <h1 className="crd-frnt-txt">Personal </h1>
    </div>
    <div className="flip-card-back w3-hover-opacity-off ">
   <div id="content1" className="content">  
   <div className="container-fluid">
     <form >    
    <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Name </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                    
                        
        <input type="text"
                                    className="form-control"
                                   name="first_name"
                                    placeholder={this.state.first_name}
                                    defaultValue={this.state.first_name}
                                    onChange={this.change}  
                                    
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Email </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input type="text"
                                    className="form-control  "
                                   name="email"
                                    placeholder={this.state.email}
                                    defaultValue={this.state.email}
                                    
                                    onChange={this.change}
                                 
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                         
                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> DOB </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input type="text"
                                    className="form-control  "
                                   name="dob"
                                    placeholder={this.state.dob}
                                    defaultValue={this.state.dob}
                                    onChange={this.change}
                                   
                                    
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3"> Age </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input type="text"
                                    className="form-control  "
                                   name="age"
                                    placeholder={this.state.age}
                                    defaultValue={this.state.age}
                                    readOnly={true}
                                    autoComplete="off"/>      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3">  </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <button id="button" type="button" className="btn btn-lg btn-primary btn-block  " onClick={this.changepass}>
                                Change Password
                            </button>
                           
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                         

                          

                            <div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3">  </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <button id="update-btn" type="button" className="btn btn-lg btn-primary btn-block "  onClick={this.update}>
                                Update
                            </button>
                           
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                            </form>
                            </div>

<div id="content2">
<a href="/profile" className="back-lnk">
            <i className="fas fa-backward back-btn" ></i></a>
                            <div className="row row-mrgn">
    <div id="oldpassslbl" className="col-sm-3 col-md-3 col-lg-3"  > Old Password </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input  type="password"
        id="passs"
                                    className="form-control  "
                                   name="oldpassword"
                                    placeholder=""
                                   onChange={this.oldpas}
                            onBlur={this.newpasss}
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>

                            <div className="row row-mrgn">
    <div id="nwpassslbl" className="col-sm-3 col-md-3 col-lg-3 " > New Password </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <input  type="password"
        id="nwpasss"
                                    className="form-control  "
                                   name="newpassword"
                                    placeholder=" "
                                    value={this.state.newpassword}
                                    onChange={this.newpass}
                                   
                         
                                    autoComplete="off" />      
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                           < div className="row row-mrgn">
    <div className="col-sm-3 col-md-3 col-lg-3">  </div>
        <div className="col-sm-8 col-md-8 col-lg-8"> 
                           
                        
        <button id="updatepass-btn" type="button" className="btn btn-lg btn-primary btn-block " onClick={this.updatepass} >
                                Update Password
                            </button>
                           
                            </div>
                            <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            </div>
                            </div>
                            </div>             
    </div>
  </div>
</div></div>
    
   </div></div>
       <div className="col-sm-12 col-md-6 col-lg-6 "> <div className="mainn w3-hover-opacity-off main1">
       <div className="clrrr"></div>
   <div><div className="flip-card flip-crd ">
  <div className="flip-card-inner">
    <div className="flip-card-front">
    <h1 className="crd-frnt-txt" >Status </h1>
    </div>
    <div className="flip-card-back w3-hover-opacity-off ">
      <h1>{this.state.first_name}</h1> 
      <p>{this.state.first_name}</p> 
      <p>We love that guy</p>
    </div>
  </div>
</div></div>
  
                </div></div> */}
     
          {/* <div className="col-sm-4 col-md-10 col-lg-4 ">
           
           
                                     
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
          
         
       <div id="app"></div> 
  
  </div>
  
                              
                              <button id="button" type="submit" className="btn btn-lg btn-primary btn-block reg-btn" disabled={!this.state.bool} onClick={this.onSubmit}>
                                  Register
                              </button>
                            
        
                             </form>
                             
                            </div>
                    </div>
                </div>  
          </div>
        </div> */}
        {/* </div>
      </div> */}
      </div>
        
          
       

        )
    }
}

export default Profile