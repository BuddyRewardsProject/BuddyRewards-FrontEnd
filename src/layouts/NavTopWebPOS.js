import React from "react";
import logo from "../assets/img/logoMB.svg";
import styled from "styled-components";
import {
  faThLarge
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/merchantSide/NavTopWebPOS.css";

const BgNav = styled.div`
  
  background: rgba(0,0,0,.0);

border: 0px;
margin: 5px;
z-index: 2;
`;


const NavTopWebPOS = () => {

  return (
    <BgNav className=" navbar "><div className=" AllPD ">
      <img src={logo} class="img-fluid " alt="" width="250" onClick={() => window.location.href = "/merchant/branch/webPOS"} />
    </div>
      <div className="body">
        <div className="row row-cols-2 AllPD justify-content-end">
          <button className="btn btnNavtop btn-md NavTopMerchantColor " type="button" onClick={() => window.location.href = "/merchant/branch/"} ><FontAwesomeIcon class="NavTopMerchantColor" icon={faThLarge} /></button>
        </div>
      </div>
    </BgNav>
  );
};
export default NavTopWebPOS;
