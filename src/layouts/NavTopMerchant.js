import React from "react";
import logo from "../assets/img/logoMB.svg";
import styled from "styled-components";
import { connect } from 'react-redux'
import "../assets/css/merchantSide/NavTopMerchant.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BgNav = styled.div`
  height: 70px;
  background: #FFFFFF;
box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.25);
border-radius: 12px;
margin: 15px;
z-index: 2;
`;

const NavTopMerchant = () => {
  return (

    <BgNav className=" navbar  fixed-top "><div className=" AllPD ">
      <img src={logo} class=" " alt="" width="250" onClick={() => window.location.href = "/merchant/branch/"} />
    </div>
      <div className="body">
        <div className="row row-cols-2 AllPD justify-content-end">
          <button className="btn btnNavtop btn-md NavTopMerchantColor " type="button" onClick={() => window.location.href = "/merchant/branch/"} ><FontAwesomeIcon class="NavTopMerchantColor" icon={faHome} /></button>
        </div>
      </div>
    </BgNav>
  );
};
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(NavTopMerchant)