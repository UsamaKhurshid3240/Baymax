//imports
import React, { Component } from 'react'
import jwt from 'jwt-decode'
import $ from 'jquery'
import {deleteAccount} from './UserFunctions'
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { updatepass } from './UserFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkpassword } from './UserFunctions';
import { emailcheck } from './UserFunctions';
import { updatee } from './UserFunctions';
import{deleteAllData} from './UserFunctions'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      oldpassword: '',
      newpassword: '',
      email: '',
      dob: '',
      age: '',
      chk: true,
      updateres: '',
      chkmail: '',
      id: '',
      password: '',
      nwdob: new Date,
      gender: '',
      delpass:'',
      initStatus:'',
      user_id:'',
      life_threat:'',
      serious_injury:'',
      highProb:'',
      statusnote:''

    }
    this.gettoken();

    this.newpasss = this.newpasss.bind(this);
    this.changepass = this.changepass.bind(this);
    this.change = this.change.bind(this);
    this.update = this.update.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.oldpas = this.oldpas.bind(this);
    this.updatepass = this.updatepass.bind(this);
    this.newpass = this.newpass.bind(this);
    this.handledob = this.handledob.bind(this);
    this.edtdob = this.edtdob.bind(this);
    this.deleteAccount=this.deleteAccount.bind(this);
    this.deleteConfirm=this.deleteConfirm.bind(this);
    this.deleteNan=this.deleteNan.bind(this);
    this.deleteAccPass=this.deleteAccPass.bind(this);
    this.onChange=this.onChange.bind(this);

    //Initial Status
    this.state.life_threat="\"The user is suffering either from a natural disaster, serious accident, warzone or sexual harrasment.\"";
    this.state.serious_injury="\"The user is suffering either from chronic illness, physical abuse, sexual abuse or witnessed death.\"";
    this.state.highProb="\"The user has either been involved in a violent incident or near death event.\"";
    if(this.state.initStatus=="An incident involving a life threatning event has occurred"){
      this.state.statusnote=this.state.life_threat;
    }
    else if(this.state.initStatus=="An incident has caused a serious injury"){
      this.state.statusnote=this.state.serious_injury;
    }
    else if(this.state.initStatus=="Suffering from severe Post Trumatic Stress Disorder"){
      this.state.statusnote=this.state.highProb;
    }
   
  }

  gettoken() {
    var t = localStorage.getItem('usertoken')
    var initSta = localStorage.getItem('InitialStatus')
    var decoded = jwt(t);
    this.state.first_name = decoded.identity.first_name;
    this.state.email = decoded.identity.email;
    this.state.chkmail = decoded.identity.email;
    this.state.id = decoded.identity.id;
    this.state.dob = decoded.identity.dob.slice(0, 10);
    this.state.gender = decoded.identity.gender;
    this.state.initStatus = initSta;
    this.state.age = decoded.identity.age;
    this.state.user_id=decoded.identity.id;

  }

  //delete Account Form
  deleteAccount(){
    $('#updateform').hide();
    $('#delete-btn').hide();
    $('#deleteAlert').show();
    
  }

  //Delete Confirmation
  deleteConfirm(){
    $('#deleteAlert').hide();
    $('#deletePass').show();
  }

  //Delete Confirm Cancel
  deleteNan(){
    $('#updateform').show();
    $('#deleteAlert').hide();
    $('#delete-btn').show();
  }

 //Delete Account By Password Api Call
  deleteAccPass(){
    const User = {
      email: this.state.email,
      password: this.state.delpass
  }
    deleteAccount(User).then(res => {
           
      if (res=="Delete Successfully") {
      
        const User = {
          userID:this.state.user_id
      }
        deleteAllData(User).then(res => {
           
          if (res=="Delete Successfully") {
            
             toast.success("Success Notification !", {
                  position: toast.POSITION.TOP_RIGHT
                });
    
                window.localStorage.clear();
                this.props.history.push(`/`)
          }   
        });  
      }
      else  if (res=="Nan" || res=="No results found"){
          toast.error("Error!", {
              position: toast.POSITION.CENTER_CENTER
            });
          }
          this.setState({ delpass: "" });
    });
  }

  componentDidMount() {
    $('#deletePass').hide();
    $('#dobb').hide();
    $('#deleteAlert').hide();
    $('#update-btn').hide();
    $('#content2').hide();
    $('#nwpasss').hide();
    $('#nwpassslbl').hide();
    $('#updatepass-btn').hide();
  }
  //onChange any field value
  change(e) {


    $('#update-btn').show();
    this.setState({ [e.target.name]: e.target.value })
  }

  //onChange Password field value
  oldpas(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  newpass(e) {
    this.setState({ [e.target.name]: e.target.value })
    $('#updatepass-btn').show();
  }

  //updte Password Api Call
  updatepass() {
    if (this.state.newpassword != "") {
        const updUserpass = {
        password: this.state.newpassword,

        id: this.state.id
      }
      updatepass(updUserpass).then(res => {
        this.state.updateres = res;
      
      if(this.state.updateres=="password update"){
        toast.success("Password Update Successfully", {
          position: toast.POSITION.CENTER_CENTER
        });
        setTimeout(()=>{
          localStorage.clear();
          this.props.history.push(`/login`);
        },1000);
      }else{
        alert("Error Update");
        this.state.newpassword="";
      }

      })
    }
    else {
      alert("Password Empty");
    }
  }

  //If DOB Change shows DatePicker
  edtdob() {
    $('#dobb').show();
  }

  //Password change func
  changepass() {
   this.state.chk = false;
    $('#content1').hide();
    $('#content2').toggle();



  }

  //Get NEw Passwword func Api call
  newpasss() {
    const newUser = {
      email: this.state.chkmail,

      password: this.state.oldpassword
    }
    checkpassword(newUser).then(res => {
      if (res == "Matched") {
        $('#nwpassslbl').show();
        $('#nwpasss').show();
      }
      else {
        alert("Password Wrong");
      }


    })


  }

  //Updtae button func api call
  in() {
    const updUser = {
      first_name: this.state.first_name,
      dob: this.state.dob,
      email: this.state.email,

      id: this.state.id
    }
    updatee(updUser).then(res => {
      this.state.updateres = res;
if(this.state.updateres=="Update Successsfully"){
  toast.success("Update Successfully", {
    position: toast.POSITION.CENTER_CENTER
  });
  setTimeout(()=>{
    localStorage.clear();
    this.props.history.push(`/login`);
  },1000);
}else{
  alert("Error Update");
}

    })
  }

  //Before Update button fucn call check if email changes it is already exist or not 
  update() {

    if (this.state.email != this.state.chkmail) {
      const newUser = {

        email: this.state.email,

      }
      emailcheck(newUser).then(res => {
        this.em = res
        if (this.em == "Not Found") {
          toast.error("Email Not Exists", {
            position: toast.POSITION.CENTER_CENTER
          });
          this.in();

        }
        else {
          alert("Email Already Exist");
        }

      })

    }
    else {

      this.in();

    }



  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    
}
  handledob = date => {

    this.setState({
      nwdob: date
    });
    $('#update-btn').show();
  };


  render() {
    return (


      <div className="App">
        <div className="imageDiv image1"></div>
        <div className="imageDiv image2 fadeInClass"></div>
        <div className="imageDiv image3 "></div>
        <div className="imageDiv image4 fadeInClass"></div>

        <ToastContainer />

        <div className="container" >

          <div className="row">
            <div className="col-12 col-sm-12 col-md-2 col-lg-0 "></div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-5 " >
              <div className="row">
                <div className="col-2 col-sm-2 col-md-2 col-lg-2"></div>
                <div className="col-10 col-sm-10 col-md-12 col-lg-12">
                  <div className="mainn w3-hover-opacity-off"><div className="content">

                    <div className="container">


                      <div className="flip-card flip-crd ">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <div className="container-fluid">
                              <div className="row row-mrgn">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <fieldset className="fldst4">
                                    <legend className=""><h1 className="per">Personal</h1> </legend>
                                    <p> Hover me or Click me</p>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flip-card-back w3-hover-opacity-off ">
                            <div id="content1" >
                              <div className="container-fluid">

                                <form id="updateform">
                                  <fieldset className="fldst5">
                                    <legend>Personal Info</legend>
                                    <div className="row row-mrgn">
                                      <div className="col-12 col-sm-3 col-md-3 col-lg-3"> Name </div>
                                      <div className="col-12 col-sm-8 col-md-8 col-lg-8">


                                        <input type="text"
                                          className="form-control"
                                          name="first_name"
                                          placeholder={this.state.first_name}
                                          defaultValue={this.state.first_name}
                                          onChange={this.change}

                                          autoComplete="off" />
                                      </div>
                                      <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>

                                    <div className="row row-mrgn">
                                      <div className="col-sm-3 col-md-3 col-lg-3"> Email </div>
                                      <div className="col-sm-8 col-md-8 col-lg-8">


                                        <input type="text"
                                          className="form-control  "
                                          name="email"
                                          placeholder={this.state.email}
                                          defaultValue={this.state.email}

                                          onChange={this.change}

                                          autoComplete="off" />
                                      </div>
                                      <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>

                                    <div className="row row-mrgn">
                                      <div className="col-sm-3 col-md-3 col-lg-3"> Gender </div>
                                      <div className="col-sm-8 col-md-8 col-lg-8">


                                        <input type="text"
                                          className="form-control  "
                                          name="email"
                                          placeholder={this.state.gender}
                                          defaultValue={this.state.gender}
                                          readOnly={true}
                                          onChange={this.change}

                                          autoComplete="off" />
                                      </div>
                                      <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>
                                    <div className="row row-mrgn">
                                      <div className="col-sm-3 col-md-3 col-lg-3"> Dob </div>
                                      <div className="col-sm-8 col-md-7  col-lg-7">

                                        {this.state.dob}
                                        <a> <i className="fas fa-edit" onClick={this.edtdob}>edit</i></a>
                                      </div>
                                      <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>


                                    <div id="dobb" className="row row-mrgn">
                                      <div className="col-sm-3 col-md-3 col-lg-3"> Set Dob </div>
                                      <div className="col-sm-8 col-md-8 col-lg-8">
                                        <DatePicker className="form-control  " name="dob" selected={this.state.nwdob}
                                          value={this.state.nwdob}
                                          onChange={this.handledob} required />


                                      </div>
                                      <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>

                                    <div className="row row-mrgn">
                                      <div className="col-sm-3 col-md-3 col-lg-3"> Age </div>
                                      <div className="col-sm-8 col-md-8 col-lg-8">


                                        <input type="text"
                                          className="form-control  "
                                          name="age"
                                          placeholder={this.state.age}
                                          defaultValue={this.state.age}
                                          readOnly={true}
                                          autoComplete="off" />
                                      </div>
                                      <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>


                                    <div className="row row-mrgn">

                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">


                                        <button id="button" type="button" className=" btn-primary btn-block  " onClick={this.changepass}>
                                          Change Password
                            </button>

                                      </div>

                                    </div>




                                    <div className="row row-mrgn">

                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">


                                        <button id="update-btn" type="button" className="btn btn-lg btn-primary btn-block " onClick={this.update}>
                                          Update
                            </button>

                                      </div>

                                    </div>
                                  </fieldset>
                                </form>
                                <fieldset id="deleteAlert" className="fldst5">
                                  <h3>Are you sure you want to Delete your Account?</h3>
                                  <button  type="button" className="btn-danger  yes-btn " onClick={this.deleteConfirm} >
                                        Yes
                            </button>
                            <button  type="button" className=" btn-secondary  no-btn" onClick={this.deleteNan} >
                                        No
                            </button>

                                </fieldset>

                                <fieldset id="deletePass" className="fldst5">
                                <div className="col-sm-3 col-md-3 col-lg-3">   <a href="/profile" className="back-lnk">
                                  <i className="fas fa-backward back-btn" ></i></a> </div>
                                  <div className="col-sm-3 col-md-3 col-lg-3"> Password </div>
                                      <div className="col-sm-8 col-md-8 col-lg-8">

                                <input type="password"
                                          className="form-control  "
                                          name="delpass"
                                          
                                         value={this.state.delpass}
                                          onChange={this.onChange}
                                          autoComplete="off" />
                                          </div>
                                          <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                            <button  type="button" className="  btn-danger btn-block del" onClick={this.deleteAccPass} >
                                         Delete Account
                            </button>
                                </fieldset>
                                <button id="delete-btn" type="button" className="  btn-danger btn-block " onClick={this.deleteAccount} >
                                         Delete Account
                            </button>

                              </div>


                            </div>

                            <div id="content2"> <div className="container-fluid">
                              <div className="row row-mrgn">
                                <div className="col-sm-3 col-md-3 col-lg-3">   <a href="/profile" className="back-lnk">
                                  <i className="fas fa-backward back-btn" ></i></a> </div>
                                <div className="col-sm-8 col-md-8 col-lg-8">

                                </div>
                                <div className="col-sm-1 col-md-1 col-lg-1"></div>
                              </div>
                              <fieldset className="fldst5">
                                <legend>Change Password</legend>
                                <form >


                                  <div className="row row-mrgn">
                                    <div id="oldpassslbl" className="col-sm-3 col-md-3 col-lg-3"> Old Password </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8">


                                      <input type="password"
                                        id="passs"
                                        className="form-control  "
                                        name="oldpassword"
                                        placeholder=""
                                        onChange={this.oldpas}
                                        onBlur={this.newpasss}
                                        autoComplete="off" />
                                    </div>
                                    <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                  </div>

                                  <div className="row row-mrgn">
                                    <div id="nwpassslbl" className="col-sm-3 col-md-3 col-lg-3"> New Password </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8">

                                      <input type="password"
                                        id="nwpasss"
                                        className="form-control  "
                                        name="newpassword"
                                        placeholder=" "
                                        value={this.state.newpassword}
                                        onChange={this.newpass}


                                        autoComplete="off" />
                                    </div>
                                    <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                  </div>
                                  <div className="row row-mrgn">

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                      <button id="updatepass-btn" type="button" className=" btn-primary btn-block " onClick={this.updatepass} >
                                        Update Password
                            </button>
                                    </div>

                                  </div>
                                </form>
                              </fieldset>




                            </div>
                            </div>
                          </div>
                        </div>






                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-5 status">
              <div className="row">
                <div className="col-2 col-sm-2 col-md-2 col-lg-2"></div>
                <div className="col-10 col-sm-10 col-md-12 col-lg-12">
                  <div className="mainn w3-hover-opacity-off"><div className="content">

                    <div className="container">


                      <div className="flip-card flip-crd ">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <div className="container-fluid">
                              <div className="row row-mrgn">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <fieldset className="fldst4">
                                    <legend className=""><h1 className="per">Status</h1> </legend>
                                    <p> Hover me or Click me</p>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flip-card-back w3-hover-opacity-off ">
                            <div id="content1" >
                              <div className="container-fluid">

                                <form >
                                  <fieldset className="fldst5">
                                    <legend>Current Status</legend>
                                    <h3>{this.state.initStatus}</h3>
                                    <p>{this.state.statusnote}</p>
                                  </fieldset>
                                </form>

                              </div>


                            </div>


                          </div>
                        </div>






                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    )
  }
}

export default Profile