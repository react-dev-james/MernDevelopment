import { compose, createStore, applyMiddleware } from 'redux';

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';
import './Workspacelist.scss';
import mySaga from '../../redux/saga/index';
import createSagaMiddleware from 'redux-saga';
import reducer from '../../redux/reducer/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore( reducer, applyMiddleware( sagaMiddleware ));
// sagaMiddleware.run(this);
class Workspace extends Component {

  constructor(props) {
    super(props);
    this.state={
      workspacelists:[]
    }
    this.onList = this.onList.bind(this);
    this.goLogin = this.goLogin.bind(this);
    
  }
  componentWillMount() {
    
    
    // const res = yield call(fetch, '/api/account/getworkspaces')
    // console.log(res)
    fetch('/api/account/getworkspaces', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(json => {
      console.log(json.result)
      this.setState({ workspacelists: json.result });
      console.log(this.state)
    });
  }
  onList() {
    window.location = '/';
  }
  goLogin(displayname) {
    console.log('/workspaces'+displayname)
    window.location = '/sign/'+displayname;
  }
  render() {
    return (
      <div className="col-md-12 mainbody mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div className=" mdl-tabs__tab-bar">
          <div className="col-md-2 category mdl-tabs__tab is-active">Workspace List</div>
          <div onClick={this.onList} className="col-md-2 category mdl-tabs__tab">Create Workspace</div>
        </div>
        <div className="col-md-4 col-md-offset-4 listbody">
          {this.state.workspacelists.map((m, k) => {
            return (
              <div onClick={() => this.goLogin(m.displayName)} className="title" style={{ display: "block" }} key={k}>https://localhost:8080/{m.displayName}</div>
            )
          })}
        </div>
      </div>
    );
  }

}

export default Workspace;
