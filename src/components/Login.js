import React, { Component } from 'react'
import { login } from './UserFunctions'
import NavBar from './NavBar'
import $ from 'jquery'
import jwt from 'jwt-decode'
import{emailcheck} from './UserFunctions'
import "../components/style.scss";
import config from '../components/config';
import { Link ,withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {updatepass} from './UserFunctions';
//import jwt from 'jwt-decode'
class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
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
    // var t= localStorage.getItem('usertoken')
    // var decoded = jwt(t);
    
    // console.log(decoded.identity.dob);
    // console.log(decoded.identity.first_name);
    // console.log(decoded.identity.email);
    // console.log(decoded.identity.password);
    // console.log(decoded.identity.age);
      //fb login
       // Load the required SDK asynchronously for facebook, google and linkedin
       (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    window.fbAsyncInit = function() {
        window.FB.init({
          appId      : config.facebook,
          cookie     : true,  // enable cookies to allow the server to access the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use version 2.1
        });
    };

//Google Login
    (function() {
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    })();  


    //lnkdn login
    (function() {
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = "http://platform.linkedin.com/in.js?async=true";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    })();   
  }
    
  
  //google login

   //Triggering login for google
   googleLogin = () => {
    let response = null;
    
    window.gapi.auth.signIn({
        callback: function(authResponse) {
            this.googleSignInCallback( authResponse )
        }.bind( this ),
        clientid: config.google, //Google client Id
        cookiepolicy: "single_host_origin",
        requestvisibleactions: "http://schema.org/AddAction",
        scope: "https://www.googleapis.com/auth/plus.login email"
    });
}

googleSignInCallback = (e) => {
    console.log( e )
    if (e["status"]["signed_in"]) {
        window.gapi.client.load("plus", "v1", function() {
            if (e["access_token"]) {
                this.getUserGoogleProfile( e["access_token"] )
            } else if (e["error"]) {
                console.log('Import error', 'Error occured while importing data')
            }
        }.bind(this));
    } else {
        console.log('Oops... Error occured while importing data')
    }
}

getUserGoogleProfile = accesstoken => {
    var e = window.gapi.client.plus.people.get({
        userId: "me"
    });
    e.execute(function(e) {
        if (e.error) {
            console.log(e.message);
            console.log('Import error - Error occured while importing data')
            return
        
        } else if (e.id) {
            //Profile data
            alert("Successfull login from google : "+ e.displayName )
            console.log( e );
            return;
        }
    }.bind(this));
}

//fb login
  facebookLogin = () => {
    /*window.FB.login(
        this.checkLoginState(), 
        { scope : 'email, public_profile' } //Add scope whatever you need about the facebook user
    ); */
    
    window.FB.login(
        function(resp){
            this.statusChangeCallback(resp);
        }.bind(this),{ scope : 'email,user_location,public_profile' });
}

checkLoginState() {
    alert("Checking Login Status")
    console.log( "Checking login status..........." );
    
    window.FB.getLoginStatus(function(response) {
        alert("FB Callback")
        console.log("----------->")
        console.log(response)
        this.statusChangeCallback(response);
    }.bind(this));
}

statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        alert( "Connected to facebook. Retriving user from fb" );
        // Logged into your app and Facebook.
        this.fetchDataFacebook();
        //this.nn();
    } else if (response.status === 'not_authorized') {
        console.log('Import error', 'Authorize app to import data', 'error')
    } else {
        console.log('Import error', 'Error occured while importing data', 'error')
    }
}

fetchDataFacebook = () => {
    console.log('Welcome!  Fetching your information.... ');
  
    window.FB.api('/me', function(user) {
        console.log( user );
        console.log('Successful login from facebook : ' + user.name+user.email);
        alert( 'Successful login for: ' + user.name );
    
    });
}

nn(){
    this.props.history.push(`/questioniar`)
}

//Trigger Login for LinkedIn
linkedinLogin = () => {
    window.IN.init({
        api_key : config.linkedin
    });
    setTimeout(function(){
            this.getUserDetails()
        }.bind(this),1000);   
    console.log( "Loaded" )
}

getUserDetails = () => {
    window.IN.User.authorize( function(){ 
        window.IN.API.Profile("me")
            .fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl"])
            .result(function(result) {
                console.log(result);
                alert("Successfull login from linkedin : "+ result.values[0].firstName + " " + result.values[0].lastName);
            })
            .error(function(err) {
                console.log('Import error - Error occured while importing data')
            });
    });
}

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
           
            cpassword: ''
          });
    }

    onChangee (e) {
        this.setState({ [e.target.name]: e.target.value })
        
    }
    async  onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

      login(user).then(res => {
           
            if (!res.error) {
               toast.success("Success Notification !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                   this.props.history.push(`/profile`)
                 
            }
            else{
                toast.error("Error!", {
                    position: toast.POSITION.CENTER_CENTER
                  });
            }
        })
    }

    forgetpass(){
        $('#content1').hide();
        $('#content2').show();
    }

    checkmail(){
        const newUser = {
  
            email: this.state.email,
            
          }
          console.log(this.state.email);
  
          emailcheck(newUser).then(res => {
          this.em=res.email
            console.log("mail"+this.em);
            if(this.em=="Not Found"){
              console.log("Not F")
              toast.error("Email Not Exists", {
                position: toast.POSITION.CENTER_CENTER
              });
              
            }
            else{
              toast.success("Email Already Exists", {
                position: toast.POSITION.CENTER_CENTER
              });
              $('#nwpass').show();
              $('#cfnwpass').show();
             
             
              console.log("Found")
            }
            
          })
    }
    
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
    
    fgsub(){
        var t= localStorage.getItem('id');
        console.log(t);
   
        if(this.state.password!="" && this.state.cpassword!="" && this.state.bool==true){
            const updUserpass = {
              password:this.state.password,
             
              id:t
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
   render () {
       return (
            // <div className="container">
            //     <div className="row">
            //         <div className="col-md-6 mt-5 mx-auto">
            //             <form noValidate onSubmit={this.onSubmit}>
            //                 <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            //                 <div className="form-group">
            //                     <label htmlFor="email">Email Address</label>
            //                     <input type="email"
            //                         className="form-control"
            //                         name="email"
            //                         placeholder="Enter Email"
            //                         value={this.state.email}
            //                         onChange={this.onChange} />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="password">Password </label>
            //                     <input type="password"
            //                         className="form-control"
            //                         name="password"
            //                         placeholder="Enter Password"
            //                         value={this.state.password}
            //                         onChange={this.onChange} />
            //                 </div>

            //                 <button type="submit" className="btn btn-lg btn-primary btn-block">
            //                     Sign in
            //                 </button>
            //             </form>
            //         </div>
            //     </div>
            // </div>

            
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
                {/* <div className="row">
            <div className="col-12 col-sm-12 col-md-2 col-lg-2 "></div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 ">
                <div className=""><legend><h1>Login</h1></legend></div>
                </div>
                <div className="col-12 col-sm-12 col-md-2 col-lg-2 "></div>
                </div> */}
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
                                    
                                     <label className="form-control-placeholder" htmlFor="email">Email </label>
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
                                     <label className="form-control-placeholder" htmlFor="password">Password </label>
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
                                     <label className="form-control-placeholder" htmlFor="password">Email </label>
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
                                     <label className="form-control-placeholder" htmlFor="password">New Password </label>
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
                                     <label className="form-control-placeholder" htmlFor="password">Confirm New Password </label>
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
<div className="col-12 col-sm-12 col-md-2 col-lg-3 ">here</div>
        {/* <div className="content">
          <div className="soc">
            
            
        <div className="fb"><button className="fb-btn"> <i className=" fa fa-facebook  fb-icn"></i></button></div>
        <div className="ggl"><button className="ggl-btn"> <i className=" fa fa-google ggl-icn"></i></button></div>
        <div className="lnk"><button className="lnk-btn"> <i className=" fa fa-linkedin lnk-icn"></i></button></div>
       
          </div>
          <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                             <div className="form-group">
                                 <label htmlFor="email">Email Address</label>
                                 <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                        </form>
      </div> */}
      </div>
      
      </div>
      </div>
    
        )
    }
}

    export default withRouter(Login)    


