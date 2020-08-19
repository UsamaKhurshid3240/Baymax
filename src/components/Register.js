import React, { Component,useState } from 'react'
import { register } from './UserFunctions'
import ReactDOM from 'react-dom'
import { sendmail } from './UserFunctions'
import{emailcheck} from './UserFunctions'
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
import ReactCodeInput from 'react-verification-code-input';
import PinInput from "react-pin-input";
import Countdown from "react-countdown-now";
import OtpInputCard from 'react-otp-input';


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
            showModal: false,
            showModa:false,
            code:'',
            cd:'',
            disable:true,
            pin:'',
            ch:false,
            i:1,
            bool:false,
            selectedOption: ''
          
        }
      
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.passcheck = this.passcheck.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.resend=this.resend.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.codec=this.codec.bind(this);
        this.timer=this.timer.bind(this);
        this.regis=this.regis.bind(this);
        this.emailchek=this.emailchek.bind(this);
        this.radioChange = this.radioChange.bind(this);
    }
   
  
    componentWillMount() {
        ReactModal.setAppElement('body');
    }

      componentDidMount(){
        
        $('#content2').hide();
        
        $(document).ready(function(){
         
        $('#button').click( function(e) {
        
       //  e.preventDefault(); // stops link from making page jump to the top
       
        $('#content2').toggle();
        $('#nntn').hide();
        $('#content1').hide();
        
    });
 
    
    
});
    }//end of didmount

regis(){
  console.log(this.state.selectedOption);
  this.props.history.push(`/login`);
  const newUser = {
    first_name: this.state.first_name,
    dob: this.state.dob,
    email: this.state.email,
    password: this.state.password,
    gender: this.state.selectedOption
}    
  register(newUser).then(res => {
  
          
          console.log("usama"+this.state.dob);
      })
}

 timer= () => {
  
         // Credit: Mateusz Rybczonec
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

startTimer();
var btn = document.createElement("BUTTON");
  btn.innerHTML = "Resend Code";
  btn.className="resend-btn";
  btn.onclick =function(){
    this.timer();
 console.log("usama"  );
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
// componentDidMount(){
//   const { Component, Fragment } = React;

// class CountDown extends Component {
//   state = {
//     remaining: {
     
//       minutes: 0,
//       seconds: 0
//     },
//     isExpired: false
//   };
//   // used to set and clear interval
//   timer;
//   // used to calculate the distance between "current date and time" and the "target date and time"
//   distance;

//   componentDidMount() {
//     this.setDate();
//     this.counter();
//   }

//   setDate = () => {
//     const { targetDate, targetTime } = this.props,
//       // Get todays date and time
//       now = new Date().getTime(),
//       // Set the date we're counting down to
//       countDownDate = new Date(targetDate + " " + targetTime).getTime();
    
//     // Find the distance between now and the count down date
//     this.distance = countDownDate - now;
    
//     // target date and time is less than current date and time
//     if (this.distance < 0) {
//       clearInterval(this.timer);
//       this.setState({ isExpired: true });
//     } else {
//       this.setState({
//         remaining: {
         
//           minutes: Math.floor((this.distance % (1000 * 60 * 60 )) / (1000 * 60 )),
//           seconds: Math.floor((this.distance % (1000 * 60)) / 1000)
//         },
//         isExpired: false
//       });
//     }
//   };

//   counter = () => {
//     this.timer = setInterval(() => {
//       this.setDate();
//     }, 1000);
//   };

//   render() {
//     const { remaining, isExpired } = this.state,
//     {targetDate, targetTime} = this.props;
    
//     return (
//       <Fragment>
//         {!isExpired && targetDate && targetTime ? (
//           <div className="counter">
//             {Object.entries(remaining).map((el, i) => (
//               <div key={i} className="entry">
//                 <div key={el[1]} className="entry-value">
//                   <span className="count top curr flipTop">{el[1] + 1}</spautoan>
//                   <span className="count top next">{el[1]}</span>
//                   <span className="count bottom next flipBottom">{el[1]}</span>
//                   <span className="count bottom curr">{el[1] + 1}</span>
//                 </div>
//                 <div className="entry-title">{el[0].toUpperCase()}</div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="alert-danger">Expired</p>
//         )}
//       </Fragment> 
//     );
//   }
// }


// const app = <CountDown targetDate="Oct 25, 2020" targetTime="05:00" />;

// ReactDOM.render(app, document.querySelector("#app"));

// }
resend(completed){
  //$('.content').toggle();
  

  console.log("resend");
 

}

  
radioChange(e) {
  this.setState({
    selectedOption: e.currentTarget.value
  });
  
}

 onSubmit (e) {
  e.preventDefault()
 
  this.timer();
  
//this.handleOpenModal()

const newUser = {
  
  email: this.state.email,
  
}
console.log(this.state.email);
sendmail(newUser).then(res => {
this.cd=res
  console.log("mail"+this.cd);
  
  console.log("splice"+this.cd.substr(20,25));
})


}
    onChangecode =  code => {
     
      this.setState({code})
      console.log(this.pin.values);
    };
    
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        
    }

    handleOpenModal(){
      this.setState({showModa:true});
    }

      
      handleCloseModal () {
        this.setState({ showModal: false });
      }


    handleChange = date => {
        this.setState({
          dob: date
        });
        
console.log(this.state.selectedOption);
      };

      codec(e){
        this.code=this.pin.values.toString();
         console.log("code"+this.code);
        var a = this.code.replace(/,/g,"");
        console.log(a);
        if(this.state.i==5){
          if(a==this.cd.substr(20,25)){
            $('#nntn').toggle();

            
            console.log("done");
           console.log("ff");
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
          console.log("i"+this.state.i);

        }

// console.log(this.pin.values);
// this.code=this.pin.values.toString();
// console.log("code"+this.code);
// var a = this.code.replace(/,/g,"");
// console.log(a);
// const newUser = {
//     first_name: this.state.first_name,
//     dob: this.state.dob,
//     email: this.state.email,
//     password: this.state.password
// }

// if(a==this.cd.substr(20,25)){
 
// console.log("done"+this.state.bool);
// console.log("ff"+a);
  
    
// this.handleCloseModal()
      //   register(newUser).then(res => {
            
      // toast.success("Success Notification !", {
      //   position: toast.POSITION.TOP_CENTER
      // });
      //       this.props.history.push(`/login`)
      //       console.log("usama"+this.state.dob);
      //   })
//     }
   

// else{
//   alert("Code Invalid");
//   toast.error("Error!", {
//     position: toast.POSITION.CENTER_CENTER
//   });
  
//     console.log("No done");
// }
// return this.state.code;



      } 

     passcheck(e){
        console.log("pass"+this.state.cpassword);
        console.log("pass"+this.state.first_name);
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
    
      emailchek(e){
        e.preventDefault();
        console.log("emailcheck");
        const newUser = {
  
          email: this.state.email,
          
        }
        console.log(this.state.email);

        emailcheck(newUser).then(res => {
        this.em=res.email
          console.log("mail"+this.em);
          if(this.em=="Not Found"){
            console.log("Not F")
            toast.success("Email Not Exists", {
              position: toast.POSITION.CENTER_CENTER
            });
            this.state.bool=true;
          }
          else{
          alert("Email Already exists")
            console.log("Found")
          }
          
        })
      }


      render () {
      

// Random component
const Completionist = () => <button id="button" type="button" className="resend" onClick={this.resend}>Resend</button>;
//Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
 
    return <button id="button" type="button" className="resend" onClick={() => this.resend(completed)}>Resend</button>;
  } else {
    // Render a countdown
    return <span><span id="min-left"className="timer">{minutes}</span>  <span className="timer">{seconds}</span></span>
  }
};


        
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
        //  onChange={this.onChangecode}
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
               onChange={this.radioChange}  />Male

        <input type="radio"
        className="female"
               value="Female"
               checked={this.state.selectedOption === "Female"}
               onChange={this.radioChange}/>Female
                    
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