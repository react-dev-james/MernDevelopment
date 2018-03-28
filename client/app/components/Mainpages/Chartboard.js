import './Chartboard.scss';

import React, { Component }  from 'react';
import { Redirect } from 'react-router-dom';

let socket = io.connect('http://127.0.0.1:4000');
let mail=[];
let messages=[];

const Chartboard = (props)=> {
      let token = props.match.params.token;
      if(token){
          return (
            <div id="body">
              <MessagesList/>
              <Inputspace />
            </div>
          );
      }else{
        return (
           <div>
              return <Redirect to="/" />;
           </div>
        );
      }
}

class MessagesList extends React.Component {
  constructor(props){
      super(props);
      this.state={
        messages:[]
      }
  }
  componentWillMount() {
    socket.on('output', (data)=>{
      this.setState({ messages: data });
      // if(data.length){
      //     for(var x = 0;x < data.length;x++){
      //         // Build out message div
      //         messages.push(data[x])
      //     }
      //     this.setState({messages:messages})
      // }
      console.log(this.state.messages)
    });
  }
  render() {
    // const messages=this.props.messages; 
    if(this.state.messages){
     
        return (
          <div className=" col-md-12 messagelsit">
            {this.state.messages.map(((msg, key) => {
              if(key%2==1){

                return (
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
                  </div>
                )
              }else{
                return (
                  <div className="row container" key={key} >
                    <div className="col-md-11">
                      <p>
                        <strong>{msg.name}</strong><br/>
                        {msg.message.map((m, k) => {
                          return (
                            <span style={{ display: "block" }} key={k}>{m}</span>
                          )
                        })}
                      </p>
                    </div>
                  </div>
                )
              }

            }))}
          </div>
        )
    }else{
      return (
        <div></div>
      )
    }
  }
}
class Inputspace extends React.Component {

   constructor(props){
      super(props);
      this.state={
         tempMsgs:[],
         msg:''
      }
   }

   submitMsg(e){

      if(e.charCode==13){
         if(e.nativeEvent.shiftKey){
               const {tempMsgs}=this.state;
               tempMsgs.push(e.target.value);
               this.setState({tempMsgs:tempMsgs,msg:''});
         }else{
            const {tempMsgs}=this.state;
            tempMsgs.push(e.target.value);
            socket.emit('input', {
                name:localStorage.getItem('name'),
                message:tempMsgs
            });
            this.setState({tempMsgs:[],msg:''});
         }
          
      }

   }

   onChangeHandler(e){
      this.setState({msg:e.target.value})
   }

   render() {
      const {tempMsgs,msg}=this.state;
      return (
      <div className="col-md-12 inputchatbox">
        <div className="inputspace">
               {tempMsgs.map((m,k)=>{
                  return(
                        <span key={k} style={{display:"block"}}>{m}</span>
                  )
               })}
              <input value={msg} onChange={this.onChangeHandler.bind(this)} type="text" className="form-control" onKeyPress={this.submitMsg.bind(this)} placeholder="Message Text" id="Messagetxt" />
         </div>
      </div>

      );
   }
}
export default Chartboard;
