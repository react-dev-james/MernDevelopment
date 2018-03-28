import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';
import Mainboard from '../Mainpages/Mainboard';
import Chartboard from '../Mainpages/Chartboard';
import './Home.scss';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: localStorage.getItem('defaultusermail'),
      signInPassword: localStorage.getItem('defaultpassword'),
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpConfirmPassword: '',
      signUpAddress: '',
      signUpDate: '',
      signUpSex: '',
      checked: localStorage.getItem('flag') ==="true",
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpAddress = this.onTextboxChangeSignUpAddress.bind(this);
    this.onTextboxChangeSignUpDate = this.onTextboxChangeSignUpDate.bind(this);
    this.onTextboxChangeSignUpConfirmPassword = this.onTextboxChangeSignUpConfirmPassword.bind(this);
    this.onTextboxChangeSignUpSex = this.onTextboxChangeSignUpSex.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignUpTest = this.onSignUpTest.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {

    this.setState({
      isLoading: false,
      signUpDate: '',
      signUpAddress: '',
      signUpSex: '',
    });
  }
  componentWillMount() {

    console.log(this.state)

    // const flag=localStorage.getItem('flag');
    // this.setState({checked: flag});
    // alert(this.state.checked)
  }
  showlogin() {
    document.getElementById("signin").style.display = 'block';
    document.getElementById("signup").style.display = 'none';
  }
  showsignup() {
    document.getElementById("signin").style.display = 'none';
    document.getElementById("signup").style.display = 'block';
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpConfirmPassword(event) {
    this.setState({
      signUpConfirmPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onTextboxChangeSignUpAddress(event) {
    this.setState({
      signUpAddress: event.target.value,
    });
  }
  onTextboxChangeSignUpDate(event) {
    this.setState({
      signUpDate: event.target.value,
    });
  }
  onTextboxChangeSignUpSex(event) {
    this.setState({
      signUpSex: event,
    });

  }
  onCheck(event) {
    localStorage.setItem('flag', event.target.checked)
  }
  onSignUp() {

    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpConfirmPassword,
      signUpDate,
      signUpAddress,
      signUpSex,
    } = this.state;
    if (signUpPassword != signUpConfirmPassword) alert("Please Input Password and Confirm Password Correctly!")
    else {

      this.setState({
        isLoading: true,
      });
      fetch('/api/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword,
          birhday: signUpDate,
          address: signUpAddress,
          sex: signUpSex,
        }),
      }).then(res => res.json())
        .then(json => {
          if (json.success) {
            setInStorage('the_main_app', { token: json.token });
            this.setState({
              signUpError: json.message,
              isLoading: false,
              signUpEmail: '',
              signUpPassword: '',
              signUpFirstName: '',
              signUpAddress: '',
              signUpConfirmPassword: '',
              signUpDate: '',
              signUpLastName: ''
            });
          } else {
            alert(json.message)
            this.setState({
              signInError: json.message,
              token: json.token,
              isLoading: false,
              signInEmail: '',
              signInPassword: '',
              signUpConfirmPassword: '',
              signUpDate: '',
              signUpAddress: '',
            });
          }

        });
    }
  }


  onSignUpTest() {

    const {
      signUpEmail,
    } = this.state;

    this.setState({
      isLoading: false,
    });
    fetch('/api/account/signuptest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          alert(json.message)
        } else {
          alert(json.message)
        }

      });
  }

  onSignIn() {
    const {
      signInFirstName,
      signInLastName,
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          if(localStorage.getItem('flag')==='true'){
            localStorage.setItem('defaultusermail', signInEmail)
            localStorage.setItem('defaultpassword', signInPassword)
          }else{
            localStorage.setItem('defaultusermail', '')
            localStorage.setItem('defaultpassword', '')
          }
          localStorage.setItem('name', json.name)
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            token: json.token,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
          });
        } else {
          localStorage.setItem('flag', false)
          this.setState({
            signInError: json.message,
            token: json.token,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
          });
        }

      });
  }

  logout() {
    this.setState({
      token: '',
      isLoading: false
    });

  }

  render() {
    const {
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
      signUpConfirmPassword,
      signUpAddress,
      signUpDate,
      signUpSex,
    } = this.state;
    if (isLoading) {
      return (<div className="row"><h2 className="col-md-4 col-md-offset-4">Loading...</h2></div>)
    }
    if (!token) {
      return (
        <div className="row">
          <div className="row" id="signin">
            <div className="row">
              <h2 className="text-center m-b-30">Sign In</h2>
              <br />
              <br />
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4 well">
                <div className="row input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
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
                <div className="row input-group">
                  <input type="checkbox" id="rememberpwd" onClick={this.onCheck.bind(this)} defaultChecked={this.state.checked} /><span>Remember User</span>
                </div>
                <br />
                <div className="row input-group" id="loginBtnGroup">
                  <button onClick={this.onSignIn} className="btn btn-default">Log In</button>
                  <button onClick={this.showsignup} className="btn btn-link">Register</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row" id="signup">
            <div className="row">
              <h2 className="text-center m-b-30">Sign Up</h2>
              <br />
              <br />
            </div>
            <div className="col-md-4 col-md-offset-4 well">
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
                <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  placeholder="BirthDay"
                  value={signUpDate}
                  onChange={this.onTextboxChangeSignUpDate}
                />
              </div>
              <div className="row input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <div className="container row">
                  <div className="radio">
                    <label className="radiospace"><input onClick={() => this.onTextboxChangeSignUpSex('Male')} type="radio" name="sex" />Male</label>
                    <label className="radiospace"><input onClick={() => this.onTextboxChangeSignUpSex('Female')} type="radio" name="sex" />Female</label>
                  </div>

                </div>
              </div>
              <div className="row input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Address"
                  value={signUpAddress}
                  onChange={this.onTextboxChangeSignUpAddress}
                />
              </div>
              <div className="row input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                  />
                </div>
                <div className="col-md-3">
                  <button onClick={this.onSignUpTest} className="btn btn-warning">Duplication</button>
                </div>
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
              <div className="row input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={signUpConfirmPassword}
                  onChange={this.onTextboxChangeSignUpConfirmPassword}
                />
              </div>

              <br></br>
              <div className="row input-group" id="loginBtnGroup">
                <button onClick={this.onSignUp} className="btn btn-default">Register</button>
                <button onClick={this.showlogin} className="btn btn-link">Log in</button>

              </div>
            </div>
          </div>
        </div>

      );
    }
    return (
      <div className="ui icon input">
        return <Redirect to={"/chartboard/" + token} />;
         </div>
    );
  }

}

export default Home;
