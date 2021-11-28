import React from "react";
import styled from "styled-components";
import color from "../config/colorNavTop";
import "../assets/css/CustomerSide/NavTop.css";
import logo from "../assets/img/logoC.svg";
const BgNav = styled.div`
height: 65px;
  z-index: 2;
  // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 80px;
  background: ${color.Gradient};
  
`;

const NavbarTopMyCard = () => {
  return (
    <BgNav className="fixed-top ">
      <div class="container">
        <div class="row  ">
          <div className="leftPDmyCard  col">
          <img src={logo} alt="buddyrewards" width="150" />
          </div>
          <div className="text-end col-4 MyCardNavTopColorAndIconSize">
          </div>
        </div>
      </div>
    </BgNav>
  );
};
export default NavbarTopMyCard;
