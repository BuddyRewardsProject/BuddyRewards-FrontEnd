import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import { Helmet } from "react-helmet";

const BGCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.09);
  border-radius: 8px;
`;

const BtnAdd = styled.button`
  background: ${color.Gradient};
  height: 50px;
  border-radius: 99px;
  font-size: 25px;
  border: 0px solid #f68e1a;
  color: #ffff;
  width: 150px;
  margin: 15px;
  transition: ease-in-out 0.4s;
  &:hover {
    color: #ffff;
    width: 250px;
  }
`;

const BgGradient = styled.div`
  border-bottom-right-radius: 19px;
  border-bottom-left-radius: 19px;
  background: ${color.Gradient};
`;

const BgBox = styled.div`
padding-left: 120px;
padding-right: 120px;
`;

const BranchNameSize = styled.h2`
  font-size: 48px;
  font-style: bold;
  color: white;
`;

class RewardCard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  render() {
    const { collapsed } = this.state;
    document.body.style.backgroundColor = "#F5F6FA";
    return (
      <div>
        <NavTopWebPOS />
        <Helmet>
          <title>จัดการรางวัล</title>
        </Helmet>
        <BgGradient>
          <div className="container">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                จัดการการสะสมแต้ม
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <div className=" container"></div>
        <div className="container fade-in-image align-items-center  ">
          <BGCard>
            <div className="DashBackBtn">
              <Link to="/merchant/branch/settings">
                <button
                  type="button"
                  class="btn-close DashXBackBtn"
                  aria-label="Close"
                ></button>
              </Link>
            </div>
            <div className="container fade-in-image align-items-center  text-center">
              <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 g-3 ">
                <h1>การคำนวณแต้ม</h1>
                <BgBox>
              
                  <div className="cols-1 ">
                    <div className="input-group mb-3 ">
                      <span
                        className="input-group-text fontSize25"
                        id="basic-addon3"
                      >
                        ระบุบจำนวนเงิน
                      </span>
                      <input
                        type="text"
                        
                        className="form-control fontSize25"
                        placeholder="25"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      ></input>
                      <span
                        className="input-group-text fontSize25"
                        id="basic-addon2"
                      >
                        {" "}
                        บาท = 1 แต้ม
                      </span>
                    </div>
                  </div>
                <div className="paddingTop15"></div>
                <BtnAdd href="#" className="   btn  ">
                      บันทึกข้อมูล
                    </BtnAdd>
                </BgBox>
              </div>
            </div>
          </BGCard>
        </div>
      </div>
    );
  }
}

const mapDispatch = { logoutPin };
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(RewardCard);
