//imports
import React, { Component,useState } from 'react'
import { register } from './UserFunctions'
import { sendmail } from './UserFunctions'
import{emailcheck} from './UserFunctions'
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
import PinInput from "react-pin-input";

export class Register extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cpassword:'',
            dob: new Date(),
            code:'',
            cd:'',
            disable:true,
            pin:'',
            ch:false,
            i:1,
            bool:false,
            selectedOption: '',
          
        }
      
        //Funct Declaration
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.passcheck = this.passcheck.bind(this);
        this.codec=this.codec.bind(this);
        this.timer=this.timer.bind(this);
        this.regis=this.regis.bind(this);
        this.emailchek=this.emailchek.bind(this);
        this.radioChange = this.radioChange.bind(this);
    }
   
  
//Component Did Mount
      componentDidMount(){
        
        $('#content2').hide();
        
        $(document).ready(function(){
         
        $('#button').click( function(e) {
 
    });
 
});
    }//end of didmount

    //Register Func Api Call
regis(){
 
  const newUser = {
    first_name: this.state.first_name,
    dob: this.state.dob,
    email: this.state.email,
    password: this.state.password,
    gender: this.state.selectedOption
}    
  register(newUser).then(res => {
    if(res=="Registered Successfully"){
    toast.success("Registeres Successfully", {
      position: toast.POSITION.CENTER_CENTER
    });
    setTimeout(()=>{
      this.props.history.push(`/login`);
    },1000);
  }else{
    toast.error("Error Register", {
      position: toast.POSITION.CENTER_CENTER
    });
  }
      })
}

//Set Timer Email Verification Code
 timer= () => {
  
      
         $(document).ready(function($) {

          if (window.history && window.history.pushState) {
        
            document.addEventListener("keydown", function(event) 
            {
              if (event.key == "Backspace") 
              {
                console.log("Backspace Pressed");
               
              }
            })
            
            $(window).on('popstate', function() {
              
              onTimeout();
            });
            document.getElementById('nntn').onclick = function(){
              onTimeout();
          }
          document.getElementById('nntn').onclick = function(){
            
      
          onTimeout();
        
      }
          }
        });
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 150;
const ALERT_THRESHOLD = 50;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 50;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;  

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
//Timer start Func
startTimer();
var btn = document.createElement("BUTTON");
  btn.innerHTML = "Resend Code";
  btn.className="resend-btn";
  btn.onclick =function(){
    this.timer();
const newUser = {
  
    email: this.state.email,
    
  }
 //Email ReSent to Given Email Api Call
  sendmail(newUser).then(res => {
  this.cd=res
  if(this.cd!=""){
    toast.success("Sent", {
      position: toast.POSITION.CENTER_CENTER
    });
  }else{
    toast.error("Not Sent", {
      position: toast.POSITION.CENTER_CENTER
    });
  }
  })
 
 
  }.bind(this); 
function onTimesUp() {
  
  clearInterval(timerInterval);
  document.getElementById("app").appendChild(btn);
}
function onTimeout() {
  
  clearInterval(timerInterval);
 
}

function startTimer() {

  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

      }
//Radio Button Value Change
radioChange(e) {
  this.setState({
    selectedOption: e.currentTarget.value
  });
  
}
//onSubmit Form Timer Start if all fields are filled
 onSubmit (e) {
  e.preventDefault()
 if(this.state.first_name!="" && this.state.email!=""&& this.state.dob!=""&& this.state.selectedOption!=""&& this.state.password!="" && this.state.cpassword!=""){
  this.timer();
  
const newUser = {
  
  email: this.state.email,
  
}
//Email Sent to Given Email Api Call
sendmail(newUser).then(res => {
this.cd=res
if(this.cd!=""){
  toast.success("Sent", {
    position: toast.POSITION.CENTER_CENTER
  });
}else{
  toast.error("Not Sent", {
    position: toast.POSITION.CENTER_CENTER
  });
}
})
$('#content2').toggle();
$('#nntn').hide();
$('#content1').hide();
 }
 else{
   alert("Please Fill All Fields");
 }

}

//onChange Value
    onChangecode =  code => {     
      this.setState({code})
    };
    
    //onChange Value
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        
    }
//onChange Value DOB
    handleChange = date => {
        this.setState({
          dob: date
        });
        
      };
//Verification COde Check
      codec(e){
        this.code=this.pin.values.toString();
        var a = this.code.replace(/,/g,"");
        if(this.state.i==5){
          if(a==this.cd.substr(20,25)){
            $('#nntn').toggle();
          }
          else {
            if(a!=""){
            toast.error("Code Invalid", {
              position: toast.POSITION.CENTER_CENTER
            });
          }
          }
          
          this.state.i=1;
        }
        else{
          
          this.state.i++;

        }



      } 
//Password and confirm password check
     passcheck(e){
        if(this.state.password!='' && this.state.cpassword!=''){
        if(this.state.password!=this.state.cpassword){
          toast.error("Error:Password Not Match!", {
            position: toast.POSITION.CENTER_CENTER
          });
          this.setState({
            password:'',
            cpassword: ''
          });
        }
        else if(this.state.password==this.state.cpassword){
        toast.success("Password Matched", {
          position: toast.POSITION.CENTER_CENTER
        });
      }
    }   
      }
    
      //Email check Func It is already exist or not Api Call
      emailchek(e){
        e.preventDefault();
        const newUser = {
          email: this.state.email,         
        }
       emailcheck(newUser).then(res => {
        this.em=res.email
          if(this.em=="Not Found"){
          
            toast.success("Email Not Exists", {
              position: toast.POSITION.CENTER_CENTER
            });
            this.state.bool=true;
          }
          else{
            toast.error("Email Already Exists!", {
              position: toast.POSITION.CENTER_CENTER
            });
          this.setState({ email: "" });
          }
          
        })
      }


      render () {
      
        return (
            <div className="App">
            <div className="imageDiv image1"></div>
            <div className="imageDiv image2 fadeInClass"></div>
            <div className="imageDiv image3 "></div>
            <div className="imageDiv image4 fadeInClass"></div>
            <div className="container" >
                
            <ToastContainer />
            <div className="row">
            <div className="col-12 col-sm-12 col-md-2 col-lg-3 "></div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-5 ">                            
            <div className="main w3-hover-opacity-off">
            <div id="content2" className="content ">   
                 <div className="container-fluid">
                 <div className="row ">         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">       
         </div>
         </div>
            <fieldset className="fldst3">
  <legend><h4>Email Sent to {this.state.email}</h4>  </legend>
  <div className="row ">                       
                         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
  <div id="app" className="countdown "></div></div>
  </div>
         <PinInput      
          length={5}
          focus
          ref={p => (this.pin = p)}
          type="numeric"
         onChange={this.codec}    
        />
                                     <button id="nntn" className="send-btn" onClick={this.regis}>send</button>
                                   
                                     <div id="app-btn"></div>
                 </fieldset>     
                 </div>

</div>
<div id="content1" className="content">
<div className="row">
          
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 ">
           <Link to='/' className="back-lnk">
          <i className="fas fa-backward back-btn"></i></Link>
          </div>
          </div>
          <div className="container-fluid">
          <fieldset className="fldst">
         <legend> <h1>Register</h1></legend>
              <div className="row ">
                 <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">       
         </div>
         </div>
        <div className="container-fluid">
        <form  >
          <div className="row rw2">
         
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 "> 
                             <div className="form-group">   
                                <input type="text"
                                id="name"
                                    className="form-control  "
                                    name="first_name"
                                    placeholder=""
                                    value={this.state.first_name}
                                    onChange={this.onChange} 
                                    autoComplete="off" required/>
                                       <label className="form-control-placeholder" htmlFor="name">Nick Name</label>
                            </div>
                           </div>
                           </div>      
                            <div className="row ">    
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">                 
                            <div className="form-group">                            
                                <input  type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder=""
                                    value={this.state.email}
                                    onBlur={this.emailchek}
                                    onChange={this.onChange} 
                                    autoComplete="off" required/>
                                     <label className="form-control-placeholder" htmlFor="email">Email</label>
                            </div>
                            </div>
                            </div>
                          <div className="row ">
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                            <div className="form-group">                           
                                <input type="password"
                                    className="form-control "
                                    name="password"
                                    placeholder=" "
                                    value={this.state.password}
                                    onChange={this.onChange} required/>
                                    <label className="form-control-placeholder" htmlFor="password">Password </label>
                            </div>
</div>
</div>
                            <div className="row ">      
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">
                            <div className="form-group">                             
                               <input id="c" type="password"
                                    className="form-control "
                                    name="cpassword"
                                    placeholder=" "
                                    value={this.state.cpassword}
                                    onBlur={this.passcheck}
                                    onChange={this.onChange} required />
                                      <label className="form-control-placeholder" htmlFor="cpassword">Confirm Password </label>                                    
                            </div>
                            </div>
                            </div>
                            <div className="row ">
                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 "><span className="gen-txt">Dob</span></div>
         <div className="col-12 col-sm-12 col-md-10 col-lg-10 ">
        <DatePicker  className="form-control  "   name="dob"  selected={this.state.dob}
          value={this.state.dob}
        onChange={this.handleChange} required/>
                         </div>
                         </div>
                         <div className="row gen-rw">
                         <div className="col-12 col-sm-12 col-md-2 col-lg-2 "><span className="gen-txt">Gender</span></div>
         <div className="col-12 col-sm-12 col-md-10 col-lg-10 ">
                            <div className="form-group">
                            <input type="radio"
               value="Male"
               checked={this.state.selectedOption === "Male"}
               onChange={this.radioChange}  required/>Male
        <input type="radio"
        className="female"
               value="Female"
               checked={this.state.selectedOption === "Female"}
               onChange={this.radioChange} required/>Female                 
      </div>
      </div>
      </div>
                         <div className="row ">        
         <div className="col-12 col-sm-12 col-md-12 col-lg-12 ">   
                            <button id="button" type="submit" className="btn btn-lg btn-primary btn-block " disabled={!this.state.bool} onClick={this.onSubmit}>
                                Register
                            </button>                                            
			</div>
      </div>
                           </form>                
                         </div>              
                         </fieldset>
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

export default Register