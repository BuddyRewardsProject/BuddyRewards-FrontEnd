import React from "react";
import logo from "../assets/img/logoC.svg";
import styled from "styled-components";
import color from "../config/colorNavTop";
import "../assets/css/CustomerSide/NavTop.css";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const BgNav = styled.div`
  height: 200px;
  background: ${color.Gradient};
  border-radius: 0px 0px 10px 10px;
`;

const NavbarTop = () => {
  return (
    <BgNav className="">
      <div class="container">
        <div class="row row-cols-2">
          <div className="leftPD ">
            <img src={logo} alt="buddyrewards" width="140" />
          </div>
          <Link to="/customer/login" className="text-end  NavTopColorAndIconSize" >
            <FontAwesomeIcon icon={faUserCircle} />
          </Link>
        </div>
      </div>
    </BgNav>
  );
};
export default NavbarTop;
