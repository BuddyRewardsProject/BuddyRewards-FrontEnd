import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faWallet } from "@fortawesome/free-solid-svg-icons";
import colorNavBottom from "../config/colorNavBottom";
import styled from "styled-components";
import React, { Component } from "react";

import { Link } from "react-router-dom";
const BgNavB = styled.div`
  background: ${colorNavBottom.Gradient};

  padding: max(env(safe-area-inset-bottom));
  border-radius: 0px 0px 0px 0px;
`;
//const CurrentPath = window.location.pathname;

const BtnOrange = styled.button`
  background-color: ${colorNavBottom.Button};
  border-style: none;
  border-radius: 30px;

  font-family: DBHeaventDB, serif;

  box-shadow: #f7931e 0px 0px 9px 0px;
  font-size: 26px;
  width: 100%;
  &:hover {
    background-color: ${colorNavBottom.ButtonOrange};
  }
`;


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNav: null,
    };
  }

  componentDidMount() {
    this.currentNav();
  }

  currentNav() {
    var currentPath = window.location.pathname;
    console.log(currentPath);
    this.setState({ currentNav: currentPath });
  }

  render() {
    return (
      <BgNavB className="fixed-bottom ipx ">
        <div className="row d-flex flex-column row justify-content-center align-items-center ">
          <div class="container mggt">
            <div class="row ">
            <div class="col text-center  ">
            <Link className="body" to="/customer">
                <div class={`${this.state.currentNav === '/customer' ? 'NavBcolorIconSizeSelect' :'NavBcolorIconSize' }`}>
                  <FontAwesomeIcon icon={faWallet} />
                </div>
                <div class={`col text-center mggt${this.state.currentNav === '/customer' ? ' NavBcolorTextSizeSelect' :' NavBcolorTextSize' }`}>
                  บัตรของคุณ
                </div>
                </Link>
              </div>
              
              <div class="col-5 text-center  justify-content-center align-items-center">
              <Link className="body" to="/customer/myQR">
                <div class="col text-center  ">
                  <BtnOrange className="btn btn-primary justify-content-center align-items-center QRtextNavB">
                    สะสมแต้ม
                  </BtnOrange>
                </div>
                </Link>
              </div>
              
              <div class="col text-center  ">
              
                <Link className="body" to="/customer/home">
            <div class={`${this.state.currentNav === '/customer/home' ? 'NavBcolorIconSizeSelect' :'NavBcolorIconSize' }`}>
                  <FontAwesomeIcon icon={faAddressCard} />
                </div>
                <div class={`col text-center mggt${this.state.currentNav === '/customer/home' ? ' NavBcolorTextSizeSelect' :' NavBcolorTextSize' }`}>
                  ข้อมูลส่วนตัว
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container "></div>
      </BgNavB>
    );
  }
}

export default Navigation;
