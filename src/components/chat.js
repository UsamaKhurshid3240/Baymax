  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  import jwt_decode from 'jwt-decode'
import {bot} from './UserFunctions';
  import $ from 'jquery'
  import jwt from 'jwt-decode'
  import "../components/chat.scss";
  import ReactModal from 'react-modal';
  import Modal from 'react-modal';
  import { BrowserRouter as Router, Route,withRouter,Link } from 'react-router-dom'

  class Chat extends Component {
      constructor() {
          super()
          this.state = {
            expanded: false,
            showModal: false,
            txt:'',
            img:'',
            name:'',
         
          }
          this.handleOpenModal = this.handleOpenModal.bind(this);
          this.handleCloseModal = this.handleCloseModal.bind(this);
       this.txxt=this.txxt.bind(this);

       var t= localStorage.getItem('usertoken')
       var p= localStorage.getItem('password')
       var decoded = jwt(t);
       this.state.name=decoded.identity.first_name;
      
   
       
      }

      txxt(){
        console.log(this.state.txt);
      }
      componentWillMount() {
        ReactModal.setAppElement('body');
    }

   
  
    handleOpenModal () {
      
    $('#content').hide();
      console.log("hdhsfhdsd");
      this.setState({ showModal: true });
      
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    onChange (e) {
      this.setState({ [e.target.name]: e.target.value })
      
  }

  componentDidMount(){

 
  
  //Thanks to the following for help:
  // * https://codepen.io/johnludena/pen/JvMvzB
  // * https://codepen.io/jenning/pen/JZzeJW

  var data = {
      headerText: "BAYMAX✨",
      pText: "I'm one (1) cute bot!",
    
      userMessages: [],
      botMessages: [],
      botGreeting: "oh hi!"+this.state.name,
      botLoading: true
     
    };
   
    
    class App extends React.Component {
      constructor(props) {
        super(props);
    
        this.state = data;

        
      }
    componentDidMount(){
     
    }

updateUserMessages = newMessage => {
  
  if (!newMessage){
    return;  
  }
  
  var updatedMessages = this.state.userMessages;

  var updatedBotMessages = this.state.botMessages;
  
    
  this.setState({
    userMessages: updatedMessages.concat(newMessage),
    botLoading: true
  });
  console.log(this.state.botLoading);
      const newUser = {
  
          message: newMessage,
          
        }
      
        console.log(newMessage)
                bot(newUser).then(res => {
                 
                  var botResponse = res[0].text;
          this.setState({
            botMessages: updatedBotMessages.concat(botResponse),
            botLoading: false
          });
          console.log(this.state.botLoading);
    
                    });
                   
                   
                  }
  
    scrollBubble = element => {
      if (element != null) {
        element.scrollIntoView(true);
      }
    };
      showMessages = () => {
      
        var userMessages = this.state.userMessages;
        var botMessages = this.state.botMessages;
    
        var allMessages = [];
   
        
        var i = 0;
        for (; i < userMessages.length; i++) {
          if (i === userMessages.length - 1) {
            //if bot replied to last message
            if (botMessages[i]) {
              allMessages.push(<UserBubble message={userMessages[i]} />);
              allMessages.push(
                <BotBubble message={botMessages[i]} thisRef={this.scrollBubble} />
              );
            } else {
              
              allMessages.push(
                <UserBubble message={userMessages[i]} thisRef={this.scrollBubble} />
                
              );
            }
            break;
          }
        
          allMessages.push(<UserBubble message={userMessages[i]} />);
          allMessages.push(<BotBubble message={botMessages[i]} />);
        }
    
        allMessages.unshift(
          <BotBubble
            message={this.state.botGreeting}
            thisRef={i === 0 ? this.scrollBubble : ""}
          />
        );
    
        return <div className="msg-container">{allMessages}</div>;
      };
    
      onInput = event => {
   

        if (event.key === "Enter") {
          var userInput = event.target.value;
    
          this.updateUserMessages(userInput);
          event.target.value = "";
        }
        
        if (event.target.value!=""){
          event.target.parentElement.style.background = 'rgba(69,58,148,0.6)';
        }
        else{
          event.target.parentElement.style.background = 'rgba(255, 255, 255, 0.6)';
        }
      };
    
      onClick = () => {
        var inp = document.getElementById("chat");
        var userInput = inp.value;
        
    
        this.updateUserMessages(userInput);
        inp.value = "";
      };

      render() {
        return (
          
          <div className="app-container">

            {/* <Header
              headerText={this.state.headerText}
              pText={this.state.pText}
              p2Text={this.state.p2Text}
            /> */}
            <div className="chat-container">
        
              <ChatHeader />
              {this.showMessages()}
              <UserInput onInput={this.onInput} onClick={this.onClick} />
            </div>
          </div>
        );
      }
    }
    
    class UserBubble extends React.Component {
      constructor() {
        super()
        this.state = {
          letter:''
        }

        var t= localStorage.getItem('usertoken')
        var decoded = jwt(t);
        

        this.state.letter=decoded.identity.email.charAt(0).toUpperCase();
        }
    
    
     
      render() {
        return (
          <div className="user-message-container" ref={this.props.thisRef}>
            <div className="user-avatar" >{this.state.letter}</div>

            <div className="chat-bubble user">
            
              {this.props.message}
            </div>
          </div>
        );
      }
    }
    
    class BotBubble extends React.Component {
    componentDidMount(){
   
    }
      render() {
        return (
          <div className="bot-message-container" ref={this.props.thisRef}>
            <div className="bot-avatar" />
            
            <div className="chat-bubble bot">
                         {this.props.message}
              
            </div>
          </div>
        );
      }
    }
    
   
    
    var ChatHeader = props => {
      return (
        <div className="chat-header">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      );
    };
    
    var UserInput = props => {
      return (
        <div className="input-container">
          <input
            id="chat"
            type="text"
            onKeyPress={props.onInput}
            placeholder="type something"
            autoComplete="off"
          />
          <button className="input-submit" onClick={props.onClick} />
        </div>
      );
    };
    
    ReactDOM.render(<App />, document.getElementById("main-div"));
    
    
   



    class SidebarRectangle extends React.Component {
      constructor() {
        super()
        this.state = {
          expanded: false,
          showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillMount() {
      ReactModal.setAppElement('body');
  }

 
  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
        first_name: decoded.identity.first_name,
        last_name: decoded.identity.last_name,
        email: decoded.identity.email,
   
    })

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });

  }

  handleOpenModal () {
    console.log("hdhsfhdsd");
    this.setState({ showModal: true });
    
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

      render(){
        return (
          <div className={this.props.active ? "square-left active" : "square-left hide"}>
            {/* {sidebarOptions.map((option, index) => {
              return (
                <div key={index} className="sidebar-element">
    <i className={"fa "+ option.icon} aria-hidden="true"></i><a onClick={this.handleOpenModal}>{option.name}</a></div>
                )
            })} */}
            <a href="/"><i className="fa fa-home">Home</i> </a>
            <a onClick={this.handleOpenModal}><i className="fa fa-user">Profile </i></a>
           
            <a to="/settings"><i className="fa fa-cogs">Settings</i> </a>
  
            <a href="/status"><i className="fa fa-check">Status </i> </a>


               <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           className="Modal"
           overlayClassName="Overlay"
           onRequestClose={this.handleCloseModal}
        >
         
    
<div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
    <div className="side">
   
   <div className="avatar-upload">
      
       <div className="avatar-preview  ">
           <div id="imagePreview" >
           </div>
       </div>
   </div></div>
   <div className="pf-txt">
     <h2 className="name-txt">usama </h2>
     <h2 className="name-txt">usama </h2>
     <h2 className="name-txt">usama </h2>
     <h2 className="name-txt">usama </h2>
   </div>
    </div>
    <div className="flip-card-back">
    <div className=" back-avt"> </div>
    <div className="edt">
    <a href="/settings" id="edt-btn"  className="edit-btn"  ><i className="fas fa-edit"></i>Edit</a>
    
    </div>
    <div className="cls">
    <a className="close-btn" onClick={this.handleCloseModal}><i className="far fa-window-close">Close</i></a>
    </div>
    </div>
  </div>
  </div>          
  
  
{/*     
  <div className="card-container">
  <div className="card">
  
               
            
          
    <div className="side">
   
    <div className="avatar-upload">
       
        <div className="avatar-preview  ">
            <div id="imagePreview" >
            </div>
        </div>
    </div></div>
    <div className="pf-txt">
      <h2 className="name-txt">usama </h2>
      <h2 className="name-txt">usama </h2>
      <h2 className="name-txt">usama </h2>
      <h2 className="name-txt">usama </h2>
    </div>
    <div className=" back-avt"> </div>
    <div className="edt">
    <a id="edt-btn"  className="edit-btn" onClick={this.editmodal} ><i className="fas fa-edit"></i>Edit</a>
    
    </div>
    <div className="cls">
    <a className="close-btn" onClick={this.handleCloseModal}><i className="far fa-window-close">Close</i></a>
    </div>
  </div>
</div> */}

                                   

         
        </ReactModal>

       
          </div>
        )
      }
    }
    class MainRectangle extends React.Component {
      constructor(){
        super();
        this.state = {
          active: false
        };
        this.expandSidebar = this.expandSidebar.bind(this);
      }
      expandSidebar(){
        this.setState({active: !this.state.active});
        console.log(this.state.active);
      }
      render(){
        return (
        <div className="center">
          <SidebarRectangle active={this.state.active} />
    
        
              <span className="header-notification clickable" onClick={this.expandSidebar}><i className="fa fa-bars" aria-hidden="true">Menu</i></span>
            
            
          
    
          </div>
      
        )
      }
    }
    class Application extends Component {
      render() {
        return(
          <div>
            <MainRectangle />
          </div>
          )
      }
    }
    
    ReactDOM.render(<Application />, document.getElementById('p'));

  }
          


      render () {
          return (
          <div className="back">
              
              <div className="background"></div>
              <div id="main-div"></div>
              
              <div id="p"></div>
            
              </div>
              
          )
      }
  }

  export default withRouter(Chat)