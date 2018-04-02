import './Chartboard.scss';
import ReactNotifications from 'react-browser-notifications';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment  from 'moment';

let socket = io.connect('http://127.0.0.1:4000');
let mail = [];
let messages = [];
let browserstate = 1;
const Chartboard = (props) => {
  let token = props.match.params.token;
  
  window.addEventListener('focus', function() {
    browserstate=1;
    document.title = 'Slack Chat APP';
  });
  
  window.addEventListener('blur', function() {
    browserstate=0;
  });
  if (token) {
    return (
      <div id="body" >
        <MessagesList />
        <Inputspace />
      </div>
    );
  } else {
    return (
      <div>
        return <Redirect to="/" />;
           </div>
    );
  }
}

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : [],
      notificationmsg : '',
      notificationname:''
    }
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDateState = (index) =>{
      let lastDate="00:00:0000";
      let currentDate = moment.unix(this.state.messages[index].date).format('dddd, MMMM Do');
      if(index>0){
        lastDate  = moment.unix(this.state.messages[index-1].date).format('dddd, MMMM Do');
      }
      console.log(currentDate)
      console.log(lastDate)
      if(lastDate === currentDate){
        console.log('a')
        console.log('-----------------------')
        return false;
      }else{
        console.log('b')
        console.log('-----------------------')
          return true;
      }
     
    }
    
  }
  
  componentWillMount() {
    socket.on('output1', (data) => {
      console.log(data)
      this.setState({ messages: data });
    });
    socket.on('output', (data) => {
      console.log(data)
      if(browserstate==0)
        document.title = 'Slack Chat APP*';
      this.setState({notificationmsg:data.message})
      this.setState({notificationname:data.name})
      this.showNotifications()
      const{messages}=this.state;
      messages.push(data)
      this.setState({ messages: messages });
    });
  }
  
  
  componentDidMount() {
    this.scrollToBottom();
    
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
    
    
  }
  
  scrollToBottom() {
    
    if(this.el)
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
  showNotifications() {
    if(this.n.supported()) this.n.show();
  }
  handleClick(event) {
    this.n.close(event.target.tag);
  }
  render() {
    // const messages=this.props.messages; 
    if (this.state.messages) {
      
      
      return (
        <div className=" col-md-12 messagelsit">.
          <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title={this.state.notificationname}
          body={this.state.notificationmsg}
          icon="../icon.png"
          tag="abcdef"
          timeout="4000"
          onClick={event => this.handleClick(event)}
        />
          {this.state.messages.map(((msg, key) => {
            let dateShow_flag = true;
            dateShow_flag = this.getDateState(key);
              return (
                <div>
                  <div className={dateShow_flag===true?"row dateline":"row datehidden dateline"}>
                    <div className="col-md-5">
                      <hr/>
                    </div>
                    <div className="col-md-2">
                      {moment.unix(msg.date).format('dddd, MMMM Do')}
                    </div>
                    <div className="col-md-5">
                      <hr/>
                    </div>
                  </div>
                  <div className="row container darker" key={key} >
                    <div className="col-md-11">
                      <p>
                        <strong>{msg.name}</strong><br />
                        {msg.message.map((m, k) => {
                          return (
                            <span style={{ display: "block" }} key={k}>{m}</span>
                          )
                        })}
                      </p>
                    </div>
                    <div ref={el => { this.el = el; }} />
                  </div>
                </div>
              )

          }))}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
class Inputspace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tempMsgs: [],
      msg: ''
    }
  }

  submitMsg(e) {

    if (e.charCode == 13) {
      if (e.nativeEvent.shiftKey) {
        const { tempMsgs } = this.state;
        tempMsgs.push(e.target.value);
        this.setState({ tempMsgs: tempMsgs, msg: '' });
      } else {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        var curdate = mm + '/' + dd + '/' + yyyy;
        const { tempMsgs } = this.state;
        tempMsgs.push(e.target.value);
        socket.emit('input', {
          name: localStorage.getItem('name'),
          message: tempMsgs,
          date: moment().unix()
        });
        this.setState({ tempMsgs: [], msg: '' });
      }

    }

  }

  onChangeHandler(e) {
    this.setState({ msg: e.target.value })
  }

  render() {
    
    const { tempMsgs, msg } = this.state;
    return (
      <div className="col-md-12 inputchatbox">
        <div>
          {tempMsgs.map((m, k) => {
            return (
              <span key={k} style={{ display: "block" }}>{m}</span>
            )
          })}
          <input value={msg} onChange={this.onChangeHandler.bind(this)} type="text" className="inputspace form-control" onKeyPress={this.submitMsg.bind(this)} placeholder="Message Text" id="Messagetxt" />
        </div>
      </div>

    );
  }
}
export default Chartboard;
