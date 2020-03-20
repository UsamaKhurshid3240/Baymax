import React, { Component } from 'react'
import { register } from './UserFunctions'
import { sendmail } from './UserFunctions'
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
import ReactCodeInput from 'react-verification-code-input';
import PinInput from "react-pin-input";
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
           code:'',
            cd:'',
            disable:true
        }
      
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.passcheck = this.passcheck.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.codec=this.codec.bind(this);
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
   
    onChangecode = code => {
      this.setState({ code });
    };
    
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        
    }

  async onSubmit (e) {
        e.preventDefault()
      
        
      this.handleOpenModal()
      const newUser = {
        
        email: this.state.email,
        
    }
      sendmail(newUser).then(res => {
    this.cd=res
        console.log("mail"+this.cd);
        
        console.log("splice"+this.cd.substr(20,25));
    })
    

    }
    

    handleOpenModal () {
        this.setState({ showModal: true });
       
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }


    handleChange = date => {
        this.setState({
          dob: date
        });
      };

      codec(e){

 console.log("code"+this.state.code);

const newUser = {
    first_name: this.state.first_name,
    dob: this.state.dob,
    email: this.state.email,
    password: this.state.password
}
if(this.state.code==this.cd.substr(20,25)){
console.log("done");
console.log("ff"+this.state.code);
  
    
this.handleCloseModal()
        register(newUser).then(res => {
            
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });
            this.props.history.push(`/login`)
            console.log("usama"+this.state.dob);
        })
    }
   

else{
  
  toast.error("Error:Code Invalid!", {
    position: toast.POSITION.CENTER_CENTER
  });
    console.log("No done");
}
return this.state.code;



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
      
      
      render () {
        const { value } = this.state;
        return (
            // <div className="container">
            //     <div className="row">
            //         <div className="col-md-6 mt-5 mx-auto">
            //             <form noValidate onSubmit={this.onSubmit}>
            //                 <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            //                 <div className="form-group">
            //                     <label htmlFor="first_name">First Name</label>
            //                     <input type="text"
            //                         className="form-control"
            //                         name="first_name"
            //                         placeholder="Enter First Name"
            //                         value={this.state.first_name}
            //                         onChange={this.onChange} />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="last_name">Last Name</label>
            //                     <input type="text"
            //                         className="form-control"
            //                         name="last_name"
            //                         placeholder="Enter Last Name"
            //                         value={this.state.last_name}
            //                         onChange={this.onChange} />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="email">Email Address</label>
            //                     <input type="email"
            //                         className="form-control"
            //                         name="email"
            //                         placeholder="Enter Email"
            //                         value={this.state.email}
            //                         onChange={this.onChange} />
            //                 </div>
            //                 <div className="form-group">
            //                     <label htmlFor="password">Password </label>
            //                     <input type="password"
            //                         className="form-control"
            //                         name="password"
            //                         placeholder="Enter Password"
            //                         value={this.state.password}
            //                         onChange={this.onChange} />
            //                 </div>

            //                 <button type="submit" className="btn btn-lg btn-primary btn-block">
            //                     Register
            //                 </button>
            //             </form>
            //         </div>
            //     </div>
            // </div>


            <div className="App">
            <div className="imageDiv image1"></div>
            <div className="imageDiv image2 fadeInClass"></div>
            <div className="imageDiv image3 "></div>
            <div className="imageDiv image4 fadeInClass"></div>
            <div className="base-container" >
                
             
            
            <div className="col-sm-4 col-md-10 col-lg-4 ">
            
            <div className="main w3-hover-opacity-off"><div className="content">
              
            <div className="row rw-mr">
            <Link to='/' className="back-lnk">
            <i className="fas fa-backward back-btn"></i></Link>
            <div className="head reg-hd"><h1>Register</h1></div>
                </div>
        
          <div className="row rw">
              
          <div className="col-sm-4 col-md-10 col-lg-10 ">
       
          <form  onSubmit={this.onSubmit}>
                             
                             <div className="form-group">
                           
      
                                <input type="text"
                                id="name"
                                    className="form-control in-css "
                                    name="first_name"
                                    placeholder=""
                                    value={this.state.first_name}
                                    onChange={this.onChange} required/>
                                       <label className="form-control-placeholder" htmlFor="name">Nick Name</label>
                            </div>
                           
        
       
     
                         
                            <div className="form-group">
                                
                                <input  type="email"
                                    className="form-control in-css"
                                    name="email"
                                    placeholder=""
                                    value={this.state.email}
                                    onChange={this.onChange} required/>
                                     <label className="form-control-placeholder" htmlFor="email">Email</label>
                            </div>
                            
                            <div className="form-group">
                                
                                <input type="password"
                                    className="form-control in-css"
                                    name="password"
                                    placeholder=" "
                                    value={this.state.password}
                                    onChange={this.onChange} required/>
                                    <label className="form-control-placeholder" htmlFor="password">Password </label>
                            </div>

                            <div className="form-group">
                                
                                <input id="c" type="password"
                                    className="form-control in-css"
                                    name="cpassword"
                                    placeholder=" "
                                    value={this.state.cpassword}
                                    onBlur={this.passcheck}
                                    onChange={this.onChange} required />
                                      <label className="form-control-placeholder" htmlFor="cpassword">Confirm Password </label>
                                    
                            </div>
                            <div className="form-group"> <p className="dob">dob</p>  
        <DatePicker  className="form-control in-css sm-dt"   name="dob"  selected={this.state.dob}
          value={this.state.dob}
        onChange={this.handleChange} required/>
       
  
</div>
                            <button id="b" type="submit" className="btn btn-lg btn-primary btn-block reg-btn" disabled={!this.state.cpassword}>
                                Register
                            </button>
                            
                        </form>
                        <ToastContainer />
                        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           className="Modal"
           overlayClassName="Overlay"
           onRequestClose={this.handleCloseModal}
        >
          {/* <div> <h4>Email Sent to {this.state.email}</h4>
          <div className="row">
          <input type="number"
                                    className="form-control in-css"
                                    name="code"
                                    placeholder="Enter Code"
                                    onChange={this.onChange} required/>
                                    <input type="number"
                                    className="form-control in-css"
                                    name="code"
                                    placeholder="Enter Code"
                                    onChange={this.onChange} required/>
                                    </div>
                                    </div> */}
                               
  <div id="dialog">
  <h4>Email Sent to {this.state.email}</h4>  
    
   
     
         <PinInput
          length={5}
          focus
          ref={p => (this.pin = p)}
          type="numeric"
          onChange={this.onChangecode}
        />
         
    
    
    <div>
    </div>
  </div>

                                   
                                     <button className="send-btn" onClick={this.codec}>send</button>
          <button className="close-btn" onClick={this.handleCloseModal}><i className="far fa-window-close"></i></button>
        </ReactModal>
                        </div>
                        </div>
      </div> </div>
     

       
      </div>
      
      </div>
      </div>
        )
    }
}

export default Register