import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import $ from 'jquery'
class NavbarProfile extends Component {
    logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    componentDidMount(){
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
           
            
            
          } else if (scrollTop < 100) {
            $('#global-nav').removeClass('scrolled-nav');
          
            $('.navbar-nav').addClass('bbaar');
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
    render () {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
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
<div className="profile-pic-back ">
            <nav id="global-nav" className="navbar    navbar-expand-sm">
                  <div className="col-sm-12 col-md-8 col-lg-2  "></div>
                  <ul className="nav navbar-nav">
                  <a href="" className="mrg-bar" data-toggle="dropdown"><i className="fa fa-bars  menu"></i> </a>
                  <i className="fas fa-robot mrg-robo"></i>
                 
                 <a className="navbar-brand mrg-txt" href="#">
                 
                 BAYMAX
                 </a>
        <li className="dropdown">
          
         
          <ul className="dropdown-menu drp-mn">
            <li className="li-alg"><a href="#" className="txt-alg">Account Settings <span className="glyphicon glyphicon-cog pull-right"></span></a></li>
            <li className="divider"><hr></hr></li>
            <li className="li-alg"><a href="#" className="txt-alg">User stats <span className="glyphicon glyphicon-stats pull-right"></span></a></li>
            <li className="divider"><hr></hr></li>
            <li className="li-alg"><a href="#" className="txt-alg">Messages <span className="badge pull-right"> 42 </span></a></li>
            <li className="divider"><hr></hr></li>
            <li className="li-alg"><a href="#" className="txt-alg">Favourites Snippets <span className="glyphicon glyphicon-heart pull-right"></span></a></li>
            <li className="divider"><hr></hr></li>
            <li className="li-alg"><a href="#" className="txt-alg">Sign Out <span className="glyphicon glyphicon-log-out pull-right"></span></a></li>
          </ul>
        </li>
      </ul>
                 
  
 
</nav>

                  
<div className="w3-center w3-white w3-padding-64  mm">
 
 <div className="w3-xlarge w3-section iimg">
 <div className="container">
 <div className="col-sm-12 col-md-8 col-lg-8  ">

  
  </div>
 
   
 
 <h1 className="text-left">ABOUT</h1>
                   <div className="col-sm-8 mx-auto">
                   <fieldset> <p className="text-center">WELCOME</p></fieldset>
                   </div>
               
           </div>
 </div>

</div>





<footer className="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off f">
 <a href="#home" className="w3-button w3-light-grey"><i className="fa fa-arrow-up w3-margin-right"></i>To the top</a>
 <div className="w3-xlarge w3-section">
   <i className="fa fa-facebook-official w3-hover-opacity"></i>
   <i className="fa fa-instagram w3-hover-opacity"></i>
   <i className="fa fa-snapchat w3-hover-opacity"></i>
   <i className="fa fa-pinterest-p w3-hover-opacity"></i>
   <i className="fa fa-twitter w3-hover-opacity"></i>
   <i className="fa fa-linkedin w3-hover-opacity"></i>
 </div>
 <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" className="w3-hover-text-green">w3.css</a></p>
</footer>

</div>
 

    
          

      
            
    
   
        
            
      


            
    
            
        )
    }
}

export default withRouter(NavbarProfile)