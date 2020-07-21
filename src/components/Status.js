import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import $ from 'jquery'

import jwt from 'jwt-decode';
class Status extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            age: '',
            email: '',
            password:'',
            dob:'',
           
        }
        var t= localStorage.getItem('usertoken')
        var p= localStorage.getItem('password')
        var decoded = jwt(t);
        this.state.first_name=decoded.identity.first_name;
        this.state.email=decoded.identity.email;
       this.state.password= decoded.identity.password
       this.state.dob= decoded.identity.dob;
        this.state.age=decoded.identity.age;
        console.log("usama"+this.state.email);
        console.log("usama"+this.state.first_name);
        console.log("usama"+this.state.dob);
        console.log("usama"+this.state.age);
        console.log("usama"+this.state.password);
        
    }

    componentDidMount () {

      
            
    }

    render () {
        const reptiles = ['alligator', 'snake', 'lizard', 'Anaconda'];
        return (
           
      
            <div className="App">
            <div className="imageDiv image6"></div>
            <div className="imageDiv image6 fadeInClass"></div>
            <div className="imageDiv image6 "></div>
            <div className="imageDiv image5 fadeInClass"></div>
           
         
    
            <div className="row row-content1">


<div className="col-sm-12 col-md-12 col-lg-12 "><div className="main-st w3-hover-opacity-off">

<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">


    </div>
    <div className="main-flip-card-back">
    <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
  
    </div>
  </div>
</div></div></div>
</div>
{reptiles.map(reptile =>
<div className="row ">


<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">

<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar" />
    </div>
    <div className="main-flip-card-back">
      <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p>     
      <p>{this.state.age}</p>
      {reptile}
    </div>
  </div>
</div></div></div>
<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">
<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar"/>
    </div>
    <div className="main-flip-card-back">
    <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
    </div>
  </div>
</div></div></div>
<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">
<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar" />
    </div>
    <div className="main-flip-card-back">
    <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
    </div>
  </div>
</div></div></div>


        </div>)}
        
        
        <div className="row ">

{reptiles.map(reptile =>
<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">

<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar" />
    </div>
    <div className="main-flip-card-back">
      <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
      {reptile}
    </div>
  </div>
</div></div></div>)}

</div>

<div className="row ">


<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">

<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar" />
    </div>
    <div className="main-flip-card-back">
      <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
    </div>
  </div>
</div></div></div>
<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">
<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar"/>
    </div>
    <div className="main-flip-card-back">
    <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
    </div>
  </div>
</div></div></div>
<div className="col-sm-12 col-md-4 col-lg-4 "><div className="main-st w3-hover-opacity-off">
<div className="main-flip-card">
  <div className="main-flip-card-inner">
    <div className="main-flip-card-front">
      <img src="img_avatar.png" alt="Avatar" />
    </div>
    <div className="main-flip-card-back">
    <h1>{this.state.first_name}</h1> 
      <p>{this.state.email}</p> 
      <p>{this.state.age}</p>
    </div>
  </div>
</div></div></div></div>
       </div>
          
            
        )
    }
}

export default Status