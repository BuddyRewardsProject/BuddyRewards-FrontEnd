import logo from '../assets/img/logoC.svg';
import { Link } from 'react-router-dom';
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
    
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
     
    
    <div class="cover-container d-flex flex-column flex-md-row align-items-center  ">
      <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
      <img src={logo} className="" alt="buddyrewards" width="130" />
      </a>
      <nav class="nav nav-masthead justify-content-center float-md-end DbBold d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a class={`nav-link${this.state.currentNav === '/' ? ' active' :'' }`} aria-current="page" href="/">หน้าหลัก</a>
          <a class={`nav-link${this.state.currentNav === '/customer/mycard' ? ' active' :'' }`}  href="/customer/mycard">ลูกค้า</a>
          <a class={`nav-link${this.state.currentNav === '/merchant/register' ? ' active' :'' }`}  href="/merchant/register">สมัครบัญชีร้านค้า</a>
        </nav>
   
    </div>
  </div>
  );
}
}
export default NavbarNew;