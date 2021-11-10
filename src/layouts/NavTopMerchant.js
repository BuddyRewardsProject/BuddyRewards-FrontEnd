import React from "react";
import logo from "../assets/img/logoMB.svg";
import styled from "styled-components";
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/merchantSide/NavTopMerchant.css";
import {
  faStar
} from "@fortawesome/free-solid-svg-icons";

const BgNav = styled.div`
  height: 70px;
  background: #FFFFFF;
box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.25);
border-radius: 12px;
margin: 15px;
`;


const NavTopMerchant = () => {
  
  return (
    <BgNav className=" navbar fixed-top "><div className=" AllPD ">
            <img src={logo} class=" "  alt="" width="200"  />
           
          </div> 
      <div class="body">
        <div class="row row-cols-2 AllPD justify-content-end">
        <button class="btn btnNavtop btn-md NavBcolorIconSize " type="button"><FontAwesomeIcon class="NavBcolorIconSize" icon={faStar} /></button>
        </div>
      </div>

      {/*  <MarginTop className="bg-white shadow p-3 mb-5 bg-body rounded-7">
                <div>
                  <img src={logo} alt="buddyrewards" width="120" />
                </div>
              </MarginTop>*/}
    </BgNav>
  );
};
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(NavTopMerchant)