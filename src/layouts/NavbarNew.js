import logo from '../assets/img/logoC.svg';

import React,{ Component } from 'react';




class NavbarNew extends Component {

constructor(props){
  super(props);
  this.state={
  currentNav:null,
}
}


componentDidMount(){
  this.currentNav()
}

currentNav(){
 var currentPath = window.location.pathname;
console.log(currentPath)
this.setState({currentNav:currentPath})

}

render(){
  return (
    
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
     
    
    <div className="cover-container d-flex flex-column flex-md-row align-items-center  ">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
      <img src={logo} className="" alt="buddyrewards" width="130" />
      </a>
      <nav className="nav nav-masthead justify-content-center float-md-end DbBold d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a className={`nav-link${this.state.currentNav === '/' ? ' active' :'' }`} aria-current="page" href="/">หน้าหลัก</a>
          <a className={`nav-link${this.state.currentNav === '/customer/mycard' ? ' active' :'' }`}  href="/customer/mycard">ลูกค้า</a>
          <a className={`nav-link${this.state.currentNav === '/merchant/register' ? ' active' :'' }`}  href="/merchant/register">สมัครบัญชีร้านค้า</a>
        </nav>
   
    </div>
  </div>
  );
}
}
export default NavbarNew;