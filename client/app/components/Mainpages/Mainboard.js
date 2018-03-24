import './Mainboard.scss';

import React from 'react';


const Mainboard = ()=> {
      return (
         <div>
            <Header/>
         </div>
      );
}
class Header extends React.Component {
   render() {
      return (
         <div className="row userlist">
            <h3 className="text-center m-b-30">User List</h3>
         </div>
      );
   }
}
export default Mainboard;