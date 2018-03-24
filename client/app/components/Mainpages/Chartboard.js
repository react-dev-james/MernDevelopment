import './Chartboard.scss';

import React from 'react';


let socket = io.connect('http://127.0.0.1:4000');
let mail=[];
let messages=[];
socket.on('output', (data)=>{
   // alert()
   if(data.length){
      for(var x = 0;x < data.length;x++){
          // Build out message div
          messages.push(data[x])
      }
   }
   console.log(messages)
});
console.log(mail)
const Chartboard = (props)=> {
      // console.log(socket)
      return (
         <Inputspace/>
      );
}

class Inputspace extends React.Component {

   constructor(props){
      super(props);
      this.state={
         tempMsgs:[],
         messages:messages
      }
   }

   submitMsg(e){

      if(e.charCode==13){
         socket.on('output', (data)=>{
         //    if(data.length){
         //       for(var x = 0;x < data.length;x++){
         //           // Build out message div
         //           username.push(data[x].name)
         //           totalmail.push(data[x].message)
         //       }
         //    }
            this.setState({messages:messages})
         });
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
      const {tempMsgs,msg,messages}=this.state;
      return (
      <div className="col-xs-8 col-sm-10 col-sm-push-2 main-chat-room">
         <div className="messagespace">
           {messages.map(((msg, key) => {
             return (
               <div className="row" key={key} >
                 <div className="col-md-11" className="left-message">
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
           }))}
        </div>
        <div className="inputspace col-md-11">
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
