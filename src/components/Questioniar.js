import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import './questioniar.scss';
import $ from 'jquery'
import Landing from './Landing';
import { Link } from 'react-router-dom';
class Questioniar extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            lname:''
        }
        this.onChangee=this.onChangee.bind(this);
        this.onSumit=this.onSumit.bind(this);
      

    }
    onChangee (e) {
      this.setState({ [e.target.name]: e.target.value })
      
  }
    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email,
       
        })

       
        
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
	
	});
});

      
       
    }

   
onSumit(){
  console.log(this.state.lname);
   
 }
       
    render () {
        return (
  
           
           
           
          <div className="App">
          <div className="imageDiv image1"></div>
          <div className="imageDiv image2 fadeInClass"></div>
          <div className="imageDiv image3 "></div>
          <div className="imageDiv image4 fadeInClass"></div>
                    <form id="msform"  onSubmit={this.onSumit}>
                     
                        <ul id="progressbar">
                          <li className="active ">General Information</li>
                          <li>TRIP Information</li>
                            <li>Physical and Financial Status</li>
                            <li>Submit</li>
                        </ul>
                      
                        <fieldset>
                            <h2 className="fs-title">General Information</h2>
                            <h3 className="fs-subtitle">Tell us something more about the project</h3>
                            <label htmlFor="fname">Project Title</label>
                            <input type="text" name="fname" placeholder="Project Title" />
                            <label htmlFor="fname">Description</label>
                          <textarea name="lname" placeholder="Description"onChange={this.onChangee}></textarea>
                          <label htmlFor="fname">Basis for Implementation</label>
                            <input type="text" name="fname" placeholder="Basis for implementation"/>
                            <label htmlFor="fname">Program or Project</label>
                          <select className="form-input"><option>Program</option>
                            <option>Project</option></select>
                            
                          
               
          
              <input type="button" name="next" className="next action-button" value="Next" />
                        </fieldset>
                      
                        <fieldset>
                            <h2 className="fs-title">TRIP Information</h2>
                            <h3 className="fs-subtitle">Your presence on the social network</h3>
                            <input type="text" name="twitter" placeholder="Twitter"/>
                            <input type="text" name="facebook" placeholder="Facebook"/>
                            <input type="text" name="gplus" placeholder="Google Plus"/>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                            <input type="button" name="next" className="next action-button" value="Next"/>
                        </fieldset>
                      
                      <fieldset>
                            <h2 className="fs-title">Physical and Financial Status</h2>
                            <h3 className="fs-subtitle">Your presence on the social network</h3>
                            <input type="text" name="twitter" placeholder="Twitter"/>
                            <input type="text" name="facebook" placeholder="Facebook"/>
                            <input type="text" name="gplus" placeholder="Google Plus"/>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                            <input type="button" name="next" className="next action-button" value="Next"/>
                        </fieldset>
                      
                        <fieldset>
                            <h2 className="fs-title">Submit project</h2>
                            <h3 className="fs-subtitle">Fill in your credentials to authorize submission</h3>
                            <input type="text" name="email" placeholder="Username"/>
                            <input type="password" name="pass" placeholder="Password"/>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                           <input type="submit"  className="submit action-button" value="Submit" />
                        </fieldset>
                    </form>
                   </div>
                
             
         
     
       

        )
    }
}

export default Questioniar