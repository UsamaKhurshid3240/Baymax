//imports
import React, { Component } from 'react';
import "../components/sidemenu.scss";
import $ from 'jquery'
import { Link} from 'react-router-dom';

class Sidemenu extends Component {
  
    constructor() {
        super()
        this.state = {
            showModal: false
        }
        //Function Declaration
        this.logout = this.logout.bind(this);
        this.yeslog = this.yeslog.bind(this);
        this.nolog = this.nolog.bind(this);
       
    }

//Logout Fucn
    logout(){
        $(".logoutconfirm").show();
    }

//Logout Confirmation 
//if Yes Fucn
    yeslog(){
localStorage.clear();
        this.props.history.push(`/`)
    }

//if No Fucn
    nolog(){
        $(".logoutconfirm").hide();
    }

    //ComponentDidMount
    componentDidMount(){       
           $(".logoutconfirm").hide();
        $(function() {
            $('.main-menu').hover(function() {
              $('.pf-cnt').css('transform', ' perspective(250vh) rotateY(-40deg)');
              $('.pf-cnt').css('animation', 'fade 0.5s ease 0.2s both');                    
            }, function() {
              // on mouseout, reset the background colour
              $('.pf-cnt').css('transform', 'none');
              $('.pf-cnt').css('animation', 'none');
            });
          });
    }
 
  render () {
    return (
        <div>
  
<nav className="main-menu w3-opacity w3-hover-opacity-off">
<div className="red-logo">
                    <a  >
                       <i className="fa fa-robot fa-2x robo-icon"></i>
                        <span className="fa-2x robo-txt">
                            BAYMAX
                        </span>
                    </a>
                </div>
            <ul>
            <li className="li-top">
                    <Link to="/profile">
                       <i className="fa fa-user fa-2x"></i>
                        <span className="nav-text">
                            Profile
                        </span>
                    </Link>
                </li>
                <li className="li-top">
                    <Link to="/status">
                        <i className="fa fa-table fa-2x"></i>
                        <span className="nav-text">
                           Status
                        </span>
                    </Link>
                </li>
                
                <li className="li-top">
                <Link  to='/chat'><i className="fa fa-comments fa-2x"></i>
                        <span className="nav-text">
                            Chat
                        </span>
           </Link>                  
               </li>                
            </ul>
            <ul className="logout">
                <div className="logoutconfirm">Are You Sure to Logout : <br></br><a href="#" className="yeslog" onClick={this.yeslog}>Yes</a> <a href="#" className="nolog" onClick={this.nolog}>No</a></div>               
                <li >
                   <a href="#"  onClick={this.logout}>
                         <i className="fa fa-power-off fa-2x"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>      
        </div>
  
    );
  }

}


export default Sidemenu