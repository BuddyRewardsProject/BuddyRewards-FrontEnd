import React from "react";

import styled from "styled-components";
import color from "../config/colorNavTop";
import "../assets/css/CustomerSide/NavTop.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/logoC.svg";
const BgNav = styled.div`
height: 65px;
  z-index: 2;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: ${color.white};
  border-radius: 0px 0px 10px 10px;
`;

const NavbarTopMyCard = () => {
  return (
    <BgNav className="fixed-top ">
      <div class="container">
        <div class="row  ">
          <div className="leftPDmyCard  col">
          <img src={logo} alt="buddyrewards" width="140" />
          </div>
          <div className="text-end col-4 MyCardNavTopColorAndIconSize">
            <FontAwesomeIcon icon={faSearch} />
            
          </div>
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
export default NavbarTopMyCard;
