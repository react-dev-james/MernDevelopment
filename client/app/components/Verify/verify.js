import React, { Component } from 'react';

class Verify extends Component {
  componentWillMount() {
    fetch('/api/account/signupverify',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token:this.props.match.params.token,
      }),
    }).then(res => res.json())
      .then(json => {
		console.log('success!')        
      });
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Verify;
