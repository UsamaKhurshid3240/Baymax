//imports
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import $ from 'jquery'
import "../components/style.scss";
import {contactmail} from'./UserFunctions';
import { ToastContainer, toast } from 'react-toastify';

class Navbar extends Component {
  
  constructor() {
    super()
    this.state = {
    name:'',
    email: '',
    message: ''
  
  }
   this.onChange=this.onChange.bind(this);
   this.contmail=this.contmail.bind(this);
 
}
//Contact Form Func Api Call
  contmail(){
   
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
      
    }
    contactmail(newUser).then(res => {
    if(res.result=="Sent Mail"){
     this.state.name="";  
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT
      });
     
     
    }else{
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
        
      })
  }

  //onChange field values
onChange (e) {
  this.setState({ [e.target.name]: e.target.value })
  
}

//ComponentDidMount
    componentDidMount(){
      
      this.login();
  
    $(document).ready(function(){
        var scrollTop = 0;
        $(window).scroll(function(){
          scrollTop = $(window).scrollTop();
           $('.counter').html(scrollTop);
          
          if (scrollTop >= 100) {
            $('#global-nav').addClass('scrolled-nav');
            $('.bbar').addClass('bb');
            
          } else if (scrollTop < 100) {
            $('#global-nav').removeClass('scrolled-nav');
            $('.bbar').removeClass('bb');
          } 
          
        }); 
        
      });


//About Card Animations
$(function($) {
  
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {
    
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');
    
    // Unbind scroll handler if we have no animatables
    if ($animatables.length == 0) {
      $(window).off('scroll', doAnimations);
    }
    
    // Check all animatables and animate them if necessary
		$animatables.each(function(i) {
       var $animatable = $(this);
			if (($animatable.offset().top + $animatable.height() - 20) < offset) {
        $animatable.removeClass('animatable').addClass('animated');
      }
      
    });

	};
  
  // Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);
  $(window).trigger('scroll');
});
    }

    //Scroll Animation
    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

//Login Func
      login(){
        var t= localStorage.getItem('usertoken');
        var initStatus= localStorage.getItem('InitialStatus');
        if(t!=null){
        if(initStatus!=null){
        this.props.history.push(`/profile`);
        }                                                //Checks if token exist and initial status is exist then move to profile page otherwise move to the home page
        else{
          this.props.history.push(`/questioniar`);
        }
        }  
        else{
          this.props.history.push(`/`);
        }
      }
    
    render() {    
    return (

       
<div className="pic ">
            <nav id="global-nav" className="navbar    navbar-expand-lg">
                  <div className=" col-sm-1 col-md-12 col-lg-3  "></div>                    
  <a className="navbar-brand  " href="#">
  <i className="fas fa-robot "></i>
  BAYMAX
  </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    <i className="fa fa-bars bbar"></i>
  </button>
  <div className="collapse navbar-collapse " id="navbar-list-2">
  <div className="col-sm-12 col-md-8 col-lg-6  "></div>
    <ul className="navbar-nav act">
      <li className="nav-item ">
       
        <Link to="/login" className="nav-link " >
                        Login
                    </Link>
      </li>
      <li className="nav-item ">
      <Link to="/register" className="nav-link reg-lnk">
                        Register
                    </Link>
      </li>
      
    </ul>
  </div>
</nav>

                  
<div className="w3-center w3-white w3-padding-64  mm">
 
 <div className="w3-xlarge w3-section iimg">
 <div className="container">
 <div className="col-sm-12 col-md-8 col-lg-8  ">
  <div className="robo-pic1"></div>
  
  </div>
 
 <div className="row">   
 
  <div className="col-lg-12 col-md-10 col-sm-12">
  <div className="wrapper">
    
  <div className="row">  <div className="block animatable bounceIn about"><h1>ABOUT</h1></div></div> 
 
    <div className="row"> 
     
    <div className="block animatable bounceInLeft"><p>Hello, welcome to Baymax, Your Interactive Stress Manager. To get started press (Register Button) or if you already have an account (Login Button).</p></div>
    <div className="block animatable bounceInRight"> <h2 className="abt-hd">Our Mission</h2><p>
                       To provide our users with an assistant (aka Chat-bot) to (monitor, identify, resolve) stress </p></div>
    
   
    </div>
    
   
    <div className="row">  
    
   
    <div className="block animatable fadeInDown"><h2 className="abt-hd">Why (monitor, identify, resolve) stress?</h2><p>


    
You are important. You are necessary. But since society is a bitch and it will knock you down. Baymax is there for you when life gives you shit, it is not perfect but it will try to help you get through.
</p></div>
    <div className="block animatable fadeInUp">  <h2 className="abt-hd">What is Baymax?</h2><p>


  
Baymax is an AI (Artificial Intelligence) chatbot which interacts and learns from each user. It keeps a record of each interactions to develop a more better approach to help you, this history will not be shared or sold to anyone it will be only be used for Baymax to learn and grow.
It will be there for you when you’re feeling disconnected.
</p></div>
    </div>
    <div className="row">  
   
    
    <div className="block animatable bounceIn"> <h2 className="abt-hd">How does Baymax work?</h2><p>


   
Baymax learns from each user and gets better in identifying and resolving their stress (more specifically it is designed for patients suffering from PTSD). It tracks your mood by analyzing your emotions through your webcam but this can be turned of if required. It also provides you with a graph or scale to display your mood based on its interactions with you, which can be viewed when required and it will also be displayed to you on a monthly basis to display your progress.
</p></div>
    
    
    
    
    <div className="block animatable bounceIn"><h2 className="abt-hd">Important Notice!</h2><p>


    
It is not a complete replacement of a professional so if required it will contact concerned authorities.
</p></div>
    </div>
    <div className="row">  
   
    <div className="block animatable fadeIn"><p>

???

</p></div>
   <div className="block animatable fadeBgColor">fadeBgColor</div>

   </div>
   
    
  </div>
  
    <fieldset  className="fldst">
    <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="contact animatable fadeIn" id="contact">CONTACT
      <div className="row  cntct">
    <div className="col-lg-5 col-md-12 col-sm-12"><h4><i className="fa fa-map-marker" ></i>Pakistan, Islamabad</h4>
    <h4><i className="fa fa-phone-square" ></i>Phone: +923475052262</h4>
    <h4><i className="fa fa-envelope" ></i>Email: baymaxun@gmail.com</h4>
    </div>
    <div className="col-lg-6 col-md-12 col-sm-12"> <div className="row em-nm-inp"> <div className="col-sm-12 col-md-12 col-lg-6">


<input type="text"
  className="form-control em-nm-inp "
  name="name"
  placeholder="Name"
  onChange={this.onChange} 

  autoComplete="off" />
</div>
<div className="col-sm-12 col-md-12 col-lg-6">


<input type="email"
  className="form-control  em-nm-inp"
  name="email"
  placeholder="Email"
  onChange={this.onChange} 
  autoComplete="off"/>
</div>
<div className="col-sm-12 col-md-12 col-lg-12">


<input type="text"
  className="form-control em-nm-inp "
  name="message"
  placeholder="Message"
  onChange={this.onChange} 
  autoComplete="off"/>
</div>
<div className="col-sm-12 col-md-12 col-lg-12">
<button id="button" type="button" className=" btn-dark btn-block  " onClick={this.contmail}>
                                         Send
                            </button>
                            </div>
</div>
</div>
    </div>
    </div>
      </div>
      </div>
                   </fieldset>
           </div>
         
 </div>

</div>
</div>

</div>
<div className="row">
<div className="col-lg-12 col-md-12 col-sm-12"><div className="immgg"></div></div>
</div>
<div className="col-lg-12 col-md-12 col-sm-12">
<footer className="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off f">
 <a  className="w3-button w3-light-grey" onClick={this.topFunction}><i className="fa fa-arrow-up w3-margin-right"></i>To the top</a>
 <div className="w3-xlarge w3-section">
  <h4>Baymax.pk</h4>
 </div>
 
</footer>
</div>
<ToastContainer />
</div>
     
        )
    }
}

export default withRouter(Navbar)