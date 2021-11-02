import logo from '../assets/img/logoC.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
     
    
    <div class="cover-container d-flex flex-column flex-md-row align-items-center  ">
      <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
      <img src={logo} className="" alt="buddyrewards" width="150" />
      </a>
      <nav class="nav nav-masthead justify-content-center float-md-end DbBold d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a class="nav-link active" aria-current="page" href="#">หน้าแรก</a>
          <a class="nav-link" href="#">เกี่ยวกับเรา</a>
          <a class="nav-link" href="/merchant/register">สำหรับร้านค้า</a>
        </nav>
   
    </div>
  </div>
  );
}
