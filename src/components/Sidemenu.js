import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "../components/sidemenu.scss";
import ReactModal from 'react-modal';
import $ from 'jquery'
import { Link ,withRouter} from 'react-router-dom';
class Sidemenu extends Component {
  
    constructor() {
        super()
        this.state = {
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
       
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }

    
  
    handleOpenModal () {
      console.log("hdhsfhdsd");
      this.setState({ showModal: true });
      
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    componentDidMount(){
      
         
           
        
      
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
                <li>
                   <a href="#">
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