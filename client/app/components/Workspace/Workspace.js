import React, { Component } from 'react'; 
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
import './Workspace.scss';

class Workspace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      displayName: '',
      adminUser: '',
      password: '',
      confirmpassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onList = this.onList.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: null });
  }
  onList(e) {
    
    window.location = '/workspaces';
  }

  creatworkspace(){
    const {
      fullName,
      displayName,
      adminUser,
      password,
      confirmpassword
    } = this.state;
    fetch('/api/account/registerworkspace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName,
        displayName: displayName,
        adminUser: adminUser,
        password: password,
        confirmpassword: confirmpassword,
      }),
    }).then(res => res.json())
    .then(json => {
      if (json.success) {
        window.location.reload()
      }
    });
  }
  render() {
    const {
      fullName,
      displayName,
      adminUser,
      password,
      confirmpassword
    } = this.state;
    return (
      <div className="col-md-12 mainbody mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div className=" mdl-tabs__tab-bar">
          <div onClick={this.onList} className="col-md-2 category mdl-tabs__tab">Workspace List</div>
          <div className="col-md-2 category mdl-tabs__tab is-active">Create Workspace</div>
        </div>
        <div className="row col-md-4 col-md-offset-4 registering">
          <h4 className="row">Create Workspace</h4>
          <div className="row">
            <div className="col-md-4">Full Name</div>
            <div className="col-md-8">
            <input type="text" className="inputspace form-control" 
              name="fullName"
              value={fullName}
              onChange={this.onChange}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">Display Name</div>
            <div className="col-md-8">
            <input type="text" className="inputspace form-control"
            name="displayName"
            value={displayName}
            onChange={this.onChange}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">Admin User</div>
            <div className="col-md-8">
              <input type="text" className="inputspace form-control"
              name="adminUser"
              value={adminUser}
              onChange={this.onChange}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">Password</div>
            <div className="col-md-8">
              <input type="text" className="inputspace form-control"
              name="password"
              value={password}
              onChange={this.onChange}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">Confirm Password</div>
            <div className="col-md-8">
              <input type="text" className="inputspace form-control"
              name="confirmpassword"
              value={confirmpassword}
              onChange={this.onChange}/>
            </div>
          </div>
          <div className="row">
          <div className="col-md-offset-3">
            <button  onClick={this.creatworkspace.bind(this)} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-js-ripple-effect">Create Workspace -></button>
          </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Workspace;
