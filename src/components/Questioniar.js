//imports
import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import './questioniar.scss';
import $ from 'jquery'
import jwt from 'jwt-decode'
import {questionnaire} from './UserFunctions'
import{status} from './UserFunctions' 

class Questioniar extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            lname:'',
            Ans1:'',
            Ans2:'',
            Ans3:'',
            Ans4:'',
            Ans5:'',
            Ans6:'',
            Ans7:'',
            Ans8:'',
            Ans9:'',
            Ans10:'',
            Ans1to3:false,
            Ans5to7:false,
            finalstatus:''
        }
        this.onChangee=this.onChangee.bind(this);
        this.onSumit=this.onSumit.bind(this);
        

    }
    //onChnage field values
    onChangee (e) {
      this.setState({ [e.target.name]: e.target.value })
      
  }
  //Component Did Mount
    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email,
       
        })
        
//jQuery Previous Form to Next Animation
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

//onSubmit Questionnaire form
onSumit(){
  this.state.Ans1 = $('#ques1').val();
  this.state.Ans2 = $('#ques2').val();
  this.state.Ans3 = $('#ques3').val();
  this.state.Ans4 = $('#ques4').val();
  this.state.Ans5 = $('#ques5').val();
  this.state.Ans6 = $('#ques6').val();
  this.state.Ans7 = $('#ques7').val();
  this.state.Ans8 = $('#ques8').val();
  this.state.Ans9 = $('#ques9').val();
  this.state.Ans10 = $('#ques10').val();
  
  //Check Q:1-3 result is true ot not
  if ((JSON.parse(this.state.Ans1) && JSON.parse(this.state.Ans2) && !JSON.parse(this.state.Ans3)) || (JSON.parse(this.state.Ans1) && !JSON.parse(this.state.Ans2) && JSON.parse(this.state.Ans3)) || (!JSON.parse(this.state.Ans1) && JSON.parse(this.state.Ans2) && JSON.parse(this.state.Ans3)) ) {
   this.state.Ans1to3=true
  
} else if(this.state.Ans1=="true" && this.state.Ans2=="true" && this.state.Ans3=="true") {
  this.state.Ans1to3=true
 
}else{
   
}

//Check Q:5-7 result is true ot not
if ((JSON.parse(this.state.Ans5) && JSON.parse(this.state.Ans6) && !JSON.parse(this.state.Ans7)) || (JSON.parse(this.state.Ans5) && !JSON.parse(this.state.Ans6) && JSON.parse(this.state.Ans7)) || (!JSON.parse(this.state.Ans5) && JSON.parse(this.state.Ans6) && JSON.parse(this.state.Ans7))) {
  this.state.Ans5to7=true
 
} else if(this.state.Ans5=="true" && this.state.Ans6=="true" && this.state.Ans7=="true") {
  this.state.Ans5to7=true

}else{
 
}
//Compare result of Q;1-3 and Q:5-7
if((this.state.Ans1to3==true && this.state.Ans5to7==true) || JSON.parse(this.state.Ans1to3) && !JSON.parse(this.state.Ans5to7)|| !JSON.parse(this.state.Ans1to3) && JSON.parse(this.state.Ans5to7))
{this.state.finalstatus="An incident involving a life threatning event has occurred";
}else{
  //If true check Q:4 Ans
  if(this.state.Ans4=="true"){
    this.state.finalstatus="life threats";
  
  }else{
    //If false check Q:4 Ans
    if(this.state.Ans8=="true"){
      this.state.finalstatus="An incident has caused a serious injury";
    
    }else{
      //Check Q:9 and 10 are true or false
      if((this.state.Ans9=="true" && this.state.Ans10=="true") || JSON.parse(this.state.Ans9) && !JSON.parse(this.state.Ans10)|| !JSON.parse(this.state.Ans9) && JSON.parse(this.state.Ans10))
{this.state.finalstatus="Suffering from severe Post Trumatic Stress Disorder";

}else{
 
}

    }
  }
}

//Result Initial Status
if(this.state.finalstatus==""){
  this.state.finalstatus="No serious event has occured, it's just daily stress."
  
  localStorage.setItem('InitialStatus', "No serious event has occured, it's just daily stress.")
  
}else{
  localStorage.setItem('InitialStatus', this.state.finalstatus)
}

var t = localStorage.getItem('usertoken')
var decoded = jwt(t);

const userAns = {
 FinalAns:this.state.finalstatus,
 id: decoded.identity.id

}    
//Api call Initial Status Saved to DB
questionnaire(userAns).then(res => {

      if(res=="Successfully Saved"){
        this.props.history.push(`/profile`)
      }
      else{
        alert("ReSubmit")
      }
    })

    var t= localStorage.getItem('usertoken')
    var date=[];
    var statu=[];
var decoded = jwt(t);
const senderID = {

userid: decoded.identity.id

}  

//APi Call Fetch previous Result of user if Exists any 
status(senderID).then(response => {

    for(var i=0;i<response.result.length;i++){
        date.push(response.result[i].date.slice(5,16));
        statu.push(response.result[i].status);
      }
     
      localStorage.setItem("dat", JSON.stringify(date));
      localStorage.setItem("sta", JSON.stringify(statu));

})
 }
       
    render () {
        return (
          <div className="App">
          <div className="imageDiv image1"></div>
          <div className="imageDiv image2 fadeInClass"></div>
          <div className="imageDiv image3 "></div>
          <div className="imageDiv image4 fadeInClass"></div>
                    <form id="msform" >
                     
                        <ul id="progressbar">
                          <li className="active ">Life Threats</li>
                          <li>Life Threats</li>
                            <li>Life Threats</li>
                            <li>Serious Injury</li>
                            <li>Higher Problem</li>
                        </ul>
                      
                        <fieldset>
                            <h2 className="fs-title">General Information</h2>
                            <h3 className="fs-subtitle">Tell us something more about the project</h3>
                            <label id="ques">Have you ever served in a war zone, or have you ever served in
                                                   a noncombat job that exposed you to war-related casualties (for
                                                   example, as a medic or on graves registration duty?)  </label>
                            <select id="ques1" className="form-input" required><option value="false">Not True</option>
                           
                            <option value="true">True</option>
                            </select>
                            <label  id="ques">Have you ever been in a serious car accident, or a serious
                                                   accident at work or somewhere else?</label>
                            <select id="ques2" className="form-input" required><option value="false">Not True</option>
                            
                            <option value="true">True</option>
                            </select>       
              <input type="button" name="next" className="next action-button" value="Next" />
                        </fieldset>                      
                        <fieldset>
                        <h2 className="fs-title">General Information</h2>
                            <h3 className="fs-subtitle">Tell us something more about the project</h3>
                            <label  id="ques">Have you ever been in a major natural or technological disaster,
                                                  such as a fire, tornado, hurricane, flood, earthquake, orchemical
                                                  spill? </label>
                          <select id="ques3" className="form-input" required><option value="false">Not True</option>                  
                            <option value="true">True</option>
                            </select>
                            <label id="ques"> Have you ever had a life-threatening illness such as cancer, a heart
attack, leukemia, AIDS, multiple sclerosis, etc.? </label>
                          <select id="ques4" className="form-input" required><option value="false">Not True</option>
                            <option value="true">True</option>
                            </select>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                            <input type="button" name="next" className="next action-button" value="Next"/>
                        </fieldset>                     
                      <fieldset>
                      <h2 className="fs-title">General Information</h2>
                            <h3 className="fs-subtitle">Tell us something more about the project</h3>
                            <label  id="ques"> Before age 18, were you ever physically punished or beaten by a
                                                    parent, caretaker, or teacher so that: you were very frightened; or
                                                    you thought you would be injured; or you received bruises, cuts,
                                                    welts, lumps or other injuries?   </label>
                            <select id="ques5" className="form-input" required><option value="false">Not True</option>>
                            <option value="true">True</option>
                            </select>
                            <label  id="ques">Not including any punishments or beatings you already reported
                                                  in Question 5, have you ever been attacked, beaten, or mugged by
                                                  anyone, including friends, family members or strangers? </label>
                            <select id="ques6" className="form-input" required><option value="false">Not True</option>
                            <option value="true">True</option>
                            </select>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                            <input type="button" name="next" className="next action-button" value="Next"/>
                        </fieldset>
                        <fieldset>
                        <h2 className="fs-title">General Information</h2>
                            <h3 className="fs-subtitle">Tell us something more about the project</h3>
                        <label  id="ques">Has anyone ever made or pressured you into having some type of
unwanted sexual contact?  </label>
                          <select id="ques7" className="form-input" required><option value="false">Not True</option>
                            <option value="true">True</option>
                            </select>
                            <label  id="ques"> Have you ever had a life-threatening illness such as cancer, a heart
attack, leukemia, AIDS, multiple sclerosis, etc.? </label>
                          <select id="ques8" className="form-input" required><option value="false">Not True</option>
                            <option value="true">True</option>
                            </select>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                            <input type="button" name="next" className="next action-button" value="Next"/>
                            </fieldset>
                        <fieldset>
                            <h2 className="fs-title">Submit project</h2>
                            <h3 className="fs-subtitle">Fill in your credentials to authorize submission</h3>
                            <label  id="ques">Have you ever been in any other situation in which you were
                                                    seriously injured, or have you ever been in any other situation in
                                                    which you feared you might be seriously injured or killed? </label>
                            <select id="ques9" className="form-input" required><option value="false">Not True</option>
                            <option value="true">True</option>
                            </select>
                            <label  id="ques">Has a close family member or friend died violently, for example, in
                                                    a serious car crash, mugging, or attack? </label>
                            <select id="ques10" className="form-input" required><option value="false">Not True</option>
                            <option value="true">True</option>
                            </select>
                            <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                           <input type="button"  className="submit action-button" value="Submit"  onClick={this.onSumit} />
                        </fieldset>
                    </form>
                   </div>
                
             
         
     
       

        )
    }
}

export default Questioniar