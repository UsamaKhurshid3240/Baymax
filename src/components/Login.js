//imports
import React, { Component } from 'react'
import { login } from './UserFunctions'
import $ from 'jquery'
import{emailcheck} from './UserFunctions'
import "../components/style.scss";
import { Link ,withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {updatepass} from './UserFunctions';


class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            cpassword: '',
            id:'',
            bool:false
        }

        this.onChange = this.onChange.bind(this)
        this.onChangee = this.onChangee.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.forgetpass=this.forgetpass.bind(this);
        this.checkmail=this.checkmail.bind(this);
        this.fgnewpass=this.fgnewpass.bind(this);
        this.fgsub=this.fgsub.bind(this);
    }

  componentDidMount(){ 
    $('#content2').hide();
    $('#nwpass').hide();
    $('#cfnwpass').hide();
    $('#fgbutton').hide();
}

//onChange Password Field Vlaues
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
           
            cpassword: ''
          });
    }

    //onChange Field Value Eveent
    onChangee (e) {
        this.setState({ [e.target.name]: e.target.value })
        
    }
    //OnSumbit Form Func
    async  onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }
//login Fucntion Api Call
      login(user).then(res => {
           
            if (res=="Invalid username and password" || res=="No results found") {
                alert("Username or Password is Wrong");   
            }
            else{
              
                toast.success("Success Notification !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  setTimeout(()=>{
                   this.props.history.push(`/questioniar`)
                },1000);
            }
          
        })
    }

//Forgot Password FUcn
    forgetpass(){
        $('#content1').hide();
        $('#content2').show();
    }

//Email Exist or Not Check
    checkmail(){
        const newUser = {
  
            email: this.state.email,
            
          }
          emailcheck(newUser).then(res => {
          this.em=res.email
         
            if(this.em=="Not Found"){
             
              toast.error("Email Not Exists", {
                position: toast.POSITION.CENTER_CENTER
              });
              
            }
            else{
              toast.success("Email  Exists", {
                position: toast.POSITION.CENTER_CENTER
              });
              $('#nwpass').show();
              $('#cfnwpass').show();
          
            }
            
          })
    }
    
    //Set New Password(Forgot Pass)
    fgnewpass(){
        if(this.state.password!='' && this.state.cpassword!=''){
            if(this.state.password!=this.state.cpassword){
             alert("Password not Matched")
              this.setState({
                password:'',
                cpassword: ''
              });
            }
            else if(this.state.password==this.state.cpassword){
            toast.success("Password Matched", {
              position: toast.POSITION.CENTER_CENTER
            });
            $('#fgbutton').show();
            this.state.bool=true;
        }
    }
    }
    
    //Update User Password Api Call
    fgsub(){
        var t= localStorage.getItem('id');
        if(this.state.password!="" && this.state.cpassword!="" && this.state.bool==true){
            const updUserpass = {
              password:this.state.password,
             
              id:t
            }
            updatepass(updUserpass).then(res => {
              this.state.updateres=res;
              if(this.state.updateres=="Update Successsfully"){
                toast.success("Update Successfully", {
                  position: toast.POSITION.CENTER_CENTER
                });
                setTimeout(()=>{
             
                  this.props.history.push(`/login`);
                },1000);
              }else{
                alert("Error Update");
              }
                 
               })
              }
              else{
                alert("Password Field Empty");
              }
    }

   render () {
       return (
            <div className="App">
            <div className="imageDiv image1"></div>
            <div className="imageDiv image2 fadeInClass"></div>
            <div className="imageDiv image3 "></div>
            <div className="imageDiv image4 fadeInClass"></div>
            <div className="container" >
               
            <div className="row">
            <div className="col-12 col-sm-12 col-md-2 col-lg-3 "></div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-5 ">
           
            <div className="main w3-hover-opacity-off"><div className="content">
            <div className="container-fluid">
           
            <div id="content1">
            <div className="row">
          
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 ">
             <Link to='/' className="back-lnk">
            <i className="fas fa-backward back-btn"></i></Link>
            </div>
           
            <div className="col-12 col-sm-12 col-md-9 col-lg-9 "></div>
                </div>

                <fieldset className="fldst">
                <legend><h1>Login</h1></legend>
                <div className="row ">
         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
        
         </div>
         </div>
         
          <form noValidate onSubmit={this.onSubmit}>
          <div className="row rw1">
         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                           
                             <div className="form-group">
                                
                                 <input type="email"
                                    className="form-control  "
                                    name="email"
                                    placeholder=" "
                                    value={this.state.email}
                                    onChange={this.onChange} required
                                    autoComplete="off"/>
                                    
                                     <label className="form-control-placeholder" >Email </label>
                            </div>
                            </div>
                            </div>

                            <div className="row ">
         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                            <div className="form-group">
                                
                                <input type="password"
                                    className="form-control  "
                                    name="password"
                                    placeholder=" "
                                    value={this.state.password}
                                    onChange={this.onChange} required/>
                                     <label className="form-control-placeholder" >Password </label>
                            </div>
                            </div>
                            </div>
                            <div className="row ">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 "></div>
         <div className="col-12 col-sm-6 col-md-6 col-lg-6 ">
                            <a id="forgotpass"onClick={this.forgetpass}>Forgot password</a>
</div>
</div>
                            <div className="row ">
         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                            <button type="submit" className="btn btn-lg btn-primary btn-block log-btn">
                                Sign in
                            </button>
                            </div>
                            </div>

                            <div className="row ">
                         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
 <Link  to='/register'  ><p ><span className="p-txt">Dont have account?<span className="sign-btn">Signup</span></span></p>
           </Link>
          
           </div>
           </div>
                          
                          
                        </form>
                        </fieldset>
                        
                        
                        </div>
                        <ToastContainer />
                        
                        </div>
                      
                       
      </div>
     <div className="content">
            <div className="container-fluid">
     
      <div id="content2">
      <div className="row">
          
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 ">
           <Link to='/' className="back-lnk">
          <i className="fas fa-backward back-btn"></i></Link>
          </div>
         
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 "></div>
              </div>
     
          <fieldset className="fldst1">
              <legend>Forgot Password</legend>
          <div className="row">
          <div className="col-12  col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                                
                                <input type="email"
                                    className="form-control "
                                    name="email"
                                    placeholder=" "
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    onBlur={this.checkmail}
                                     required/>
                                     <label className="form-control-placeholder" >Email </label>
                            </div>
                            </div>
                            </div>

                            <div className="row">
          <div className="col-12  col-sm-12 col-md-12 col-lg-12">
                            <div id="nwpass" className="form-group">
                                
                                <input type="password"
                                    className="form-control "
                                    name="password"
                                    placeholder=" "
                                    value={this.state.password}
                                    onChange={this.onChange} 
                                   
                                    required/>
                                     <label className="form-control-placeholder" >New Password </label>
                            </div>
                            </div>
                            </div>
                            <div className="row">
          <div className="col-12  col-sm-12 col-md-12 col-lg-12">
                            <div   id="cfnwpass" className="form-group">
                                
                                <input type="password"
                                    className="form-control "
                                    name="cpassword"
                                    placeholder=" "
                                    value={this.state.cpassword}
                                    onChange={this.onChangee} 
                                    onBlur={this.fgnewpass}
                                    required/>
                                     <label className="form-control-placeholder" >Confirm New Password </label>
                            </div>
                            </div>
                            </div>
                            <div className="row">
          <div className="col-12  col-sm-12 col-md-12 col-lg-12">
                            <div   className="form-group">
                            <button id="fgbutton" type="submit" className="btn btn-lg btn-primary btn-block reg-btn"  onClick={this.fgsub}>
                                Register
                            </button>
                            </div>
                            </div>
                            </div>
                            </fieldset>
                        </div>
                       </div>
                       </div>
           

                        </div>
                        
</div>
<div className="col-12 col-sm-12 col-md-2 col-lg-3 "></div>
      </div>
      </div>
      </div>
    
        )
    }
}

    export default withRouter(Login)    


