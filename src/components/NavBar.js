import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import $ from 'jquery'
import "../components/style.scss";
class Navbar extends Component {
  
  constructor() {
    super()
  this.state = {
     
  }
   
 
}
  
    logOut (e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push(`/`);
        this.topFunction=this.topFunction.bind(this);
        
    }

   
    componentDidMount(){
      this.login();
        // When the user clicks on the button, scroll to the top of the document

        // window.onscroll = () => {
        //     const nav = document.querySelector('#navbar');
        //     if(this.scrollY <= 10) nav.className = ''; else nav.className = 'scroll';
        //   };
    //     window.onscroll = function() {myFunction()};
    //     function myFunction() {
    //         var navbar = document.getElementById("myNavbar");
    //         if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    //             navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-blue";
    //         } else {
    //             navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-blue", "");
    //         }
        
    // }

  
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


// var current_fs, next_fs, previous_fs; //fieldsets
// var left, opacity, scale; //fieldset properties which we will animate
// var animating; //flag to prevent quick multi-click glitches

// $(".next").click(function(){
// 	if(animating) return false;
// 	animating = true;
	
// 	current_fs = $(this).parent();
// 	next_fs = $(this).parent().next();
	
// 	//activate next step on progressbar using the index of next_fs
// 	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
// 	//show the next fieldset
// 	next_fs.show(); 
// 	//hide the current fieldset with style
// 	current_fs.animate({opacity: 0}, {
// 		step: function(now, mx) {
// 			//as the opacity of current_fs reduces to 0 - stored in "now"
// 			//1. scale current_fs down to 80%
// 			scale = 1 - (1 - now) * 0.2;
// 			//2. bring next_fs from the right(50%)
// 			left = (now * 50)+"%";
// 			//3. increase opacity of next_fs to 1 as it moves in
// 			opacity = 1 - now;
// 			current_fs.css({
//         'transform': 'scale('+scale+')',
//         'position': 'absolute'
//       });
// 			next_fs.css({'left': left, 'opacity': opacity});
// 		}, 
// 		duration: 800, 
// 		complete: function(){
// 			current_fs.hide();
// 			animating = false;
// 		}, 
		
// 	});
// });

// $(".previous").click(function(){
// 	if(animating) return false;
// 	animating = true;
	
// 	current_fs = $(this).parent();
// 	previous_fs = $(this).parent().prev();
	
// 	//de-activate current step on progressbar
// 	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
// 	//show the previous fieldset
// 	previous_fs.show(); 
// 	//hide the current fieldset with style
// 	current_fs.animate({opacity: 0}, {
// 		step: function(now, mx) {
// 			//as the opacity of current_fs reduces to 0 - stored in "now"
// 			//1. scale previous_fs from 80% to 100%
// 			scale = 0.8 + (1 - now) * 0.2;
// 			//2. take current_fs to the right(50%) - from 0%
// 			left = ((1-now) * 50)+"%";
// 			//3. increase opacity of previous_fs to 1 as it moves in
// 			opacity = 1 - now;
// 			current_fs.css({'left': left});
// 			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
// 		}, 
// 		duration: 800, 
// 		complete: function(){
// 			current_fs.hide();
// 			animating = false;
// 		}, 
		
// 	});
// });

// $(".submit").click(function(){
// 	return false;
// })


    }

    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }


      login(){

        var t= localStorage.getItem('usertoken');
        if(t!=null){
        this.props.history.push(`/profile`);
        }  
        else{
          this.props.history.push(`/`);
        }
      }
    render () {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link" >
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="#" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        return (

        

//            <div className="pic">
 
// <div className="w3-top">
//   <div className="w3-bar" id="myNavbar">
//     <a className="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right" href="javascript:void(0);" onclick="toggleFunction()" title="Toggle Navigation Menu">
//       <i className="fa fa-bars"></i>
//     </a>
   
//     <a href="/login" className="w3-bar-item w3-button">HOME</a>
//     <a href="#about" className="w3-bar-item w3-button w3-hide-small"><i className="fa fa-user"></i> ABOUT</a>
//     <a href="#portfolio" className="w3-bar-item w3-button w3-hide-small"><i className="fa fa-th"></i> PORTFOLIO</a>
//     <a href="#contact" className="w3-bar-item w3-button w3-hide-small"><i className="fa fa-envelope"></i> CONTACT</a>
//     <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-hover-red">
//       <i className="fa fa-search"></i>
//     </a>
//   </div>

//   <div id="navDemo" className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium">
//     <a href="#about" className="w3-bar-item w3-button" onclick="toggleFunction()">ABOUT</a>
//     <a href="#portfolio" className="w3-bar-item w3-button" onclick="toggleFunction()">PORTFOLIO</a>
//     <a href="#contact" className="w3-bar-item w3-button" onclick="toggleFunction()">CONTACT</a>
//     <a href="#" className="w3-bar-item w3-button">SEARCH</a>
//   </div>
// </div>

// </div>

// <div class="row">
//     <div class="col-md-6 col-md-offset-3">
//         <form id="msform">
           
//             <ul id="progressbar">
//                 <li class="active">Personal Details</li>
//                 <li>Social Profiles</li>
//                 <li>Account Setup</li>
//             </ul>
          
//             <fieldset>
//                 <h2 class="fs-title">Personal Details</h2>
//                 <h3 class="fs-subtitle">Tell us something more about you</h3>
//                 <input type="text" name="fname" placeholder="First Name"/>
//                 <input type="text" name="lname" placeholder="Last Name"/>
//                 <input type="text" name="phone" placeholder="Phone"/>
//                 <input type="button" name="next" class="next action-button" value="Next"/>
//             </fieldset>
//             <fieldset>
//                 <h2 class="fs-title">Social Profiles</h2>
//                 <h3 class="fs-subtitle">Your presence on the social network</h3>
//                 <input type="text" name="twitter" placeholder="Twitter"/>
//                 <input type="text" name="facebook" placeholder="Facebook"/>
//                 <input type="text" name="gplus" placeholder="Google Plus"/>
//                 <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
//                 <input type="button" name="next" class="next action-button" value="Next"/>
//             </fieldset>
//             <fieldset>
//                 <h2 class="fs-title">Create your account</h2>
//                 <h3 class="fs-subtitle">Fill in your credentials</h3>
//                 <input type="text" name="email" placeholder="Email"/>
//                 <input type="password" name="pass" placeholder="Password"/>
//                 <input type="password" name="cpass" placeholder="Confirm Password"/>
//                 <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
//                 <input type="submit" name="submit" class="submit action-button" value="Submit"/>
//             </fieldset>
//         </form>
       
//         <div class="dme_link">
//             <p><a href="http://designify.me/code-snippets-js/" target="_blank">More Code Snippets</a></p>
//         </div>
       
// </div>
// </div> 




 
            // <nav id="myNavbar " className="navbar navbar-expand-lg navbar-dark bg-dark rounded w3-bar">
            //     <button className="navbar-toggler"
            //         type="button"
            //         data-toggle="collapse"
            //         data-target="#navbar1"
            //         aria-controls="navbar1"
            //         aria-expanded="false"
            //         aria-label="Toggle navigation">
            //         <span className="navbar-toggler-icon"></span>
            //     </button>

            //     <div className="collapse navbar-collapse justify-content-md-center"
            //         id="navbar1">
            //         <ul className="navbar-nav">
            //             <li className="nav-item">
            //                 <Link to="/" className="nav-link">
            //                     Home
            //                 </Link>
            //             </li>
            //         </ul>
            //         {localStorage.usertoken ? userLink : loginRegLink}
            //     </div>
            // </nav>
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
  <div className="col-lg-1 col-md-1"></div>
  <div className="col-lg-10 col-md-10 col-sm-12">
    <fieldset  className="fldst">
      <legend>
 <h1 className="text-left"><span className="abt-txt"> ABOUT</span></h1></legend>
                   <div className="">
                   <fieldset className="fldst"> <p className="text-center">Hello, welcome to Baymax, Your Interactive Stress Manager. To get started press (Register Button) or if you already have an account (Login Button).</p>
                   <br></br>
                   <div id="back-img" className="pic-div" ></div>
                   <p>
                       

Our Mission:
To provide our users with an assistant (aka Chat-bot) to (monitor, identify, resolve) stress </p>
<br></br>
<div id="back-img1" className="pic-div" ></div>
<p>


Why (monitor, identify, resolve) stress?
You are important. You are necessary. But since society is a bitch and it will knock you down. Baymax is there for you when life gives you shit, it is not perfect but it will try to help you get through.
</p>
<br></br>
<div id="back-img2" className="pic-div" ></div>
<p>


What is Baymax?
Baymax is an AI (Artificial Intelligence) chatbot which interacts and learns from each user. It keeps a record of each interactions to develop a more better approach to help you, this history will not be shared or sold to anyone it will be only be used for Baymax to learn and grow.
It will be there for you when you’re feeling disconnected.
</p>
<br></br>
<div id="back-img3" className="pic-div" ></div>
<p>


How does Baymax work?
Baymax learns from each user and gets better in identifying and resolving their stress (more specifically it is designed for patients suffering from PTSD). It tracks your mood by analyzing your emotions through your webcam but this can be turned of if required. It also provides you with a graph or scale to display your mood based on its interactions with you, which can be viewed when required and it will also be displayed to you on a monthly basis to display your progress.
</p>
<br></br>
<div id="back-img" className="pic-div" ></div>
<p>


Important Notice!
It is not a complete replacement of a professional so if required it will contact concerned authorities.
</p>
<br></br>
<div id="back-img4" className="pic-div" ></div>
<p>

P.S.
  (monitor, identify, resolve) should have an animation that shows them one by one or something like that do not place them with each other and you can change the mission or notice part but don’t mess with the Why part and I’m not kidding about this. You can also mess around with the line spacing and indentations.

</p></fieldset>
                   </div>
                   </fieldset>
           </div>
         
 </div>

</div>
</div>
<div className="col-lg-1 col-md-1"></div>
</div>


<div className="col-lg-12 col-md-12 col-sm-12">
<footer className="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off f">
 <a  className="w3-button w3-light-grey" onClick={this.topFunction}><i className="fa fa-arrow-up w3-margin-right"></i>To the top</a>
 <div className="w3-xlarge w3-section">
  
 </div>
 
</footer>
</div>
</div>
 

    
          

      
            
    
   
        
            
      


            
    
            
        )
    }
}

export default withRouter(Navbar)