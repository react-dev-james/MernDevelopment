import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError:'',
      signInError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:'',
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // const obj =  getFromStorage('the_main_app');
    // if(obj){
    //   const { token } = obj;

    //   //Verify token
    //   fetch('/api/account/verify?token?=' +token)
    //   .then(res=>res.json())
    //   .then(json=>{
    //     if(json.success){
    //       this.setState({
    //         token,
    //         isLoading:false
    //       });
    //     }else{
    //       this.setState({
    //         isLoading:false
    //       });
    //     }
    //   });
    // }else{
      this.setState({
        isLoading: false
      });

    // }
  }

  onTextboxChangeSignInEmail(event){
    this.setState({
      signInEmail:event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword:event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail:event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword:event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName:event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName:event.target.value,
    });
  }

  onSignUp(){
    
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading:true,
    });
    fetch('/api/account/signup',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName:signUpFirstName,
        lastName:signUpLastName,
        email:signUpEmail,
        password:signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if(json.success){
          setInStorage('the_main_app',{token:json.token});
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail:'',
            signUpPassword:'',
            signUpFirstName:'',
            signUpLastName:''
          });
        }
        
      });
  }

  onSignIn(){
    const {
      signInFirstName,
      signInLastName,
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading:true,
    });
    fetch('/api/account/signin',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:signInEmail,
        password:signInPassword
      }),
    }).then(res => res.json())
      .then(json => {
        if(json.success){
          setInStorage('the_main_app',{token:json.token});
          this.setState({
            signInError: json.message,
            token:json.token,
            isLoading: false,
            signInEmail:'',
            signInPassword:'',
          });
        }
        
      });
  }

  logout(){
    // this.setState({
    //   isLoading:true
    // });
    // const obj =  getFromStorage('the_main_app');
    // const { token } = obj;
    // if(obj){
    //   //Verify token
    //   fetch('/api/account/logout?token?=' +token)
    //   .then(res=>res.json())
    //   .then(json=>{
    //     if(json.success){
    //       this.setState({
    //         token: '',
    //         isLoading:false
    //       });
    //     }else{
    //       this.setState({
    //         isLoading:false
    //       });
    //     }
    //   });
    // }else{
      this.setState({
        token: '',
        isLoading: false
      });

    // }
  }
  /*
    fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
  */
 
  render() {
    const{
      isLoading,
      token,
      signUpError,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;
    if(isLoading){
      return (<div><p>Loading...</p></div>)
    }
    console.log(token)
    if(!token){

      return (
        <div className="row">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 well">
              <div className="row input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Email"
                  value={signInEmail}
                  onChange={this.onTextboxChangeSignInEmail}
                />
              </div>
              <div className="row input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="password"
                  value={signInPassword}
                  onChange={this.onTextboxChangeSignInPassword}
                />
              </div>
              <br></br>
              <div className="row input-group" id="loginBtnGroup">
                <button onClick={this.onSignIn} className="btn btn-default">Log In</button>
                <button className="btn btn-link">Register</button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="col-md-4"></div>
          <div className="col-md-4 well">
            <div className="row input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input 
                type="text" 
                className="form-control" 
                name="email" 
                placeholder="FirstName"
                value={signUpFirstName}
                onChange={this.onTextboxChangeSignUpFirstName}
              />
            </div>
            <div className="row input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input 
                type="text" 
                className="form-control" 
                name="email" 
                placeholder="LastName"
                value={signUpLastName}
                onChange={this.onTextboxChangeSignUpLastName}
              />
            </div>
            <div className="row input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
              <input 
                type="text" 
                className="form-control" 
                name="email" 
                placeholder="Email"
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
              />
            </div>
            <div className="row input-group">
              <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
              <input 
                type="password" 
                className="form-control" 
                placeholder="password"
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
            />
            </div>
              
            <br></br>
            <div className="row input-group" id="loginBtnGroup">
              <button onClick={this.onSignUp} className="btn btn-default">Register</button>
              <button className="btn btn-link">Log in</button>
            </div>
          </div>
        </div>
      );
    }

    return(
      <div>
        <p>Account</p>
        <button onClick={this.logout}>LogOut</button>
      </div>
    );
  }
}

export default Home;
