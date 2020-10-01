  //import Libraries
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  import jwt from 'jwt-decode'
  import { bot } from './UserFunctions';
  import $ from 'jquery'
  import {withRouter} from 'react-router-dom';
  import{status} from './UserFunctions'
  import "react-datepicker/dist/react-datepicker.css";
  import 'react-toastify/dist/ReactToastify.css';

  class Settings extends Component {
    constructor() {
      super()
      this.state = {
        textarea: '',
        id:''
      }

      var currentCallback;

      // override default browser alert
      window.alert = function (msg, callback) {
        $('.message').text(msg);
        $('.customAlert').css('animation', 'fadeIn 0.3s linear');
        $('.customAlert').css('display', 'inline');
        setTimeout(function () {
          $('.customAlert').css('animation', 'none');
        }, 300);
        currentCallback = callback;
      }

      $(function () {

        // add listener for when our confirmation button is clicked
        $('.confirmButton').click(function () {
          $('.customAlert').css('animation', 'fadeOut 0.3s linear');
          setTimeout(function () {
            $('.customAlert').css('animation', 'none');
            $('.customAlert').css('display', 'none');
          }, 300);

          //currentCallback();
          $(".imageDiv").show();
          $("#bot-box").show();
          $("#top-container").show();
        })

     
        // our custom alert box
        setTimeout(function () {
          let reason = prompt("Reason?", "");
          localStorage.setItem('Reason', reason)
          alert("To start Chat Say Hello!");
        }, 1000);
      });

        this.endsess=this.endsess.bind(this);
        }
      endsess(){
        $('#End').hide();
    var t= localStorage.getItem('usertoken')
    var date=[];
    var statu=[];
    var decoded = jwt(t);
    const senderID = {
    userid: decoded.identity.id

  }  

  status(senderID).then(response => {
 
    for(var i=0;i<response.result.length;i++){

        date.push(response.result[i].date.slice(5,16));
       
        statu.push(response.result[i].status);
      }
    
      localStorage.setItem("dat", JSON.stringify(date));
      localStorage.setItem("sta", JSON.stringify(statu));
 
  })
  setTimeout(()=>{
    this.props.history.push(`/status`);
  },2000);
  }
    componentDidMount() {
      $("#loading-wave").hide();
      $('#End').hide();
      //Make the DIV element draggagle:
      dragElement(document.getElementById("mydiv"));

      function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          /* if present, the header is where you move the DIV from:*/
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
      $(".imageDiv").hide();
      $("#top-container").hide();
      $("#bot-box").hide();
      $(document).ready(function ($) {
        window.addEventListener("beforeunload", (ev) => {

          ev.preventDefault();
          return ev.returnValue = 'Are you sure you want to close?';

        });
       
      });
  
      
        

      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Check out the final version LIVE on Github!

      class App extends Component {

        constructor(props) {
          super(props); _defineProperty(this, "updateTimer",

            () => {

              this.setState({
                overlayStatus: 'active'
              });

            }); _defineProperty(this, "updateUserMessages",

              newMessage => {

                // Create a new array from current user messages
                var updatedUserMessagesArr = this.state.userMessages;

                // Create a new array from current bot messages
                var updatedBotMessagesArr = this.state.botMessages;

                // Render user message and bot's loading message
                this.setState({
                  userMessages: updatedUserMessagesArr.concat(newMessage),
                  botLoading: true
                });

                var t = localStorage.getItem('usertoken')
              
                var decoded = jwt(t);
                this.state.id = decoded.identity.id;
                const newUser = {
                  sender:this.state.id,
                  message: newMessage,

                }
                
                bot(newUser).then(res => {


                  var botResponse = res[0].text;
                
                  if(botResponse=="Bye"||botResponse=="Alright then take care. Let's talk again sometime :)"){
                    setTimeout(()=>{
                    $('#bot-box').hide();
                    },800);
                    $("#loading-wave").show();
                    setTimeout(()=>{
                      $('#End').show();  
                      $("#loading-wave").hide();
                    },7000);
                          

                  }
                  // Update state with both user and bot's latest messages
                  this.setState({
                    botMessages: updatedBotMessagesArr.concat(botResponse),
                    botLoading: false
                  });


                });


              });

          var t = localStorage.getItem('usertoken')

          var decoded = jwt(t);

          var botGreeting = "Hi " + decoded.identity.first_name;
          this.state = { userMessages: [], botMessages: [], botGreeting, botLoading: false, overlayStatus: '', timer: { minutes: 30, seconds: 0 } };

        }

        showMessages() {

          var userConvo = this.state.userMessages;

          // Show initial bot welcome message
          if (this.state.userMessages.length === 0) {
            return;
          }

          var updatedConvo = userConvo.map((data, index) => {

            var botResponse = this.state.botMessages[index];

            return (
              React.createElement("div", { className: "conversation-pair", key: 'convo' + index },
                React.createElement(UserBubble, { message: data, key: 'u' + index }),
                React.createElement(BotBubble, { message: botResponse, key: 'b' + index })));

          });

          return updatedConvo;

        }

        render() {

          return (

                React.createElement("div", { id: "app-container" },
                React.createElement("div", { className: "convo-container" },
                React.createElement(BotBubble, { message: this.state.botGreeting, key: "bot-00" }),
                this.showMessages()),
                React.createElement(UserInput, { userMessage: this.state.userMessage, updateUserMessages: this.updateUserMessages })));

        }
      } 


      class UserBubble extends React.Component {

        render() {
          var t = localStorage.getItem('usertoken')

          var decoded = jwt(t);

          var letter = decoded.identity.email.charAt(0).toUpperCase();

          var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
          return (
            React.createElement("div", { className: "user-message-container" },

              React.createElement("div", { className: "user-avt" }, <span className="lett">{letter}</span>),
              React.createElement("div", { className: "chat-bubble user" }, this.props.message, <div className="user-tme">{time}</div>)
            )
          );


        }
      }

      class BotBubble extends React.Component {
        constructor(...args) {
          super(...args); _defineProperty(this, "componentDidMount",

            () => {

              var lastBubble = this.refs.chatBubble;
              lastBubble.scrollIntoView(true);
            });
        }

        render() {

          var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
          return (
            React.createElement("div", { className: "bot-message-container" },
              React.createElement("div", { className: "img-avatar-container" },
                React.createElement("img", { className: "bot-avatar", src: "https://www.mytravelresearch.com/wp-content/uploads/2017/09/Travel-Chatbots.jpg", alt: "bot avatar" })),


              React.createElement("div", { className: "chat-bubble bot", ref: "chatBubble" }, this.props.message ? this.props.message : <div id="wave">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>

              </div>, <span className="tme">{time}</span>

              )
            )
          );
        }
      }


      class UserInput extends React.Component {
        constructor(...args) {
          super(...args); _defineProperty(this, "handleChange",

            event => {

              if (event.key === 'Enter') {
                var userInput = event.target.value;

                // update state on parent component
                this.props.updateUserMessages(userInput);
                event.target.value = '';
              }
            });
        }

        render() {
          var submitIcon = <svg onClick={this.handleClick} id="submit-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon fill="#7c7c82" points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg>
          return (
            <div className="input-wrapper">
              <div className="input-container">
                <input id="chat" ref={(input) => { this.chatInput = input; }} type="text" onKeyPress={this.handleChange} placeholder="Type and press 'enter' to chat" />
                {submitIcon}
              </div>
            </div>

          );


        }
      }


      ReactDOM.render(React.createElement(App, null), document.getElementById('bot-box'));

    }


    render() {


      return (


          <div className="App">
          <div className="imageDiv image1"></div>
          <div className="imageDiv image2 fadeInClass"></div>
          <div className="imageDiv image3 "></div>
          <div className="imageDiv image4 fadeInClass"></div>
          <div id="mydiv">
            <div id="mydivheader">Facial Recognizition Demo By USAMA</div>
            <iframe width="560" height="415" src="http://127.0.0.1:5000/" className="frm"></iframe>
          </div>
          <div className='customAlert'>
            <p className='message'></p>
            <input type='button' className='confirmButton sayhello' value='Say Hello' />
          </div>
          <div id="top-container"></div>
          <div id="bot-box">
          </div>
          <div id="End">
          <input type='button' className='confirmButton endSession ' value='SESSION END ClLICK ME' onClick={this.endsess} />
          </div>
          <div id="loading-wave" className="col-sm-2">
      <div className="sp sp-wave"></div>
      <h5>SESSION END</h5>
    </div>
        </div>

      )
    }

  }

  export default withRouter(Settings)