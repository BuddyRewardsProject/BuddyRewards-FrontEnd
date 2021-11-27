import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import branch from "../assets/img/icon/store.svg";
import dash from "../assets/img/icon/dashboard.svg";
import pos from "../assets/img/icon/webpos.svg";
import staff from "../assets/img/icon/staff.svg";
import { Helmet } from "react-helmet";

const BtnOrange = styled.button`
  background-color: ${color.Button};
  border-style: none;
  font-size: 30px;
  border-radius: 99px;
  color: white;
`;

const BgGradient = styled.div`
  border-bottom-right-radius: 19px;
  border-bottom-left-radius: 19px;
  background: ${color.Gradient};
`;

const BranchNameSize = styled.h2`
  font-size: 48px;
  font-style: bold;
  color: white;
`;

class StaffView extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  renderRole() {
    switch (this.props.pinAuth.staff.roleId) {
      case 1:
        return "เจ้าของร้าน";
      case 2:
        return "ผู้จัดการ";
      case 3:
        return "พนักงาน";
    }
  }

  render() {
    document.body.style.backgroundColor = "#F5F6FA";

    return (
      <div>
        <NavTopWebPOS />
        <Helmet>
          <title>buddyMerchant beta</title>
        </Helmet>
        <BgGradient>
          <div className="container ">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                {this.props.auth.user.merchantName}{" "}
                {this.props.auth.user.branchName}
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <div className=" container">
          <div className="row row-cols-2">
            <div className="cols-2">
              <h2>สวัสดีคุณ {this.props.pinAuth.staff.firstName} </h2>
            </div>
            <div className="cols-2 text-end">
              <h2> {this.renderRole()} </h2>
            </div>
          </div>
        </div>
        <div className="container fade-in-image align-items-center  text-center">
          <div class="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3">
            <div class="cols-2 ">
              <Link to="/merchant/branch/webPOS">
                <div className="menuCard">
                  <img src={pos} alt="Dashboard" />
                  <h2 className="card-title mt-2 mb-2 text-center">
                    webPOS
                  </h2>
                  <p className="card-text text-center fromfontsize20">เว็บโพส</p>
                </div>
              </Link>
            </div>
            {this.props.pinAuth.staff.roleId < 3 &&
              <div class="cols-2 ">
                <Link to="/merchant/branch/Dashboard">
                  <div className="menuCard">
                    <img src={dash} className="fade-in-image " alt="Dashboard" />
                    <h2 className="card-title mt-2 mb-2 text-center">
                      Dashboard
                    </h2>
                    <p className="card-text text-center fromfontsize20">แดชบอร์ด</p>
                  </div>
                </Link>
              </div>
            }
            {this.props.pinAuth.staff.roleId < 2 &&
              <div class="cols-2">
                <Link to="/merchant/branch/branch-Management">
                  <div className="menuCard">
                    <img
                      src={branch}
                      className="fade-in-image "
                      alt="staff Management"
                    />
                    <h2 className="card-title mt-2 mb-2 text-center">Branch</h2>
                    <p className="card-text text-center fromfontsize20">จัดการสาขา</p>
                  </div>
                </Link>
              </div>
            }
            {this.props.pinAuth.staff.roleId < 3 &&
              <div class="cols-2">
                <Link to="/merchant/branch/staff-Management">
                  <div className="menuCard">
                    <img
                      src={staff}
                      className="fade-in-image "
                      alt="staff Management"
                    />
                    <h2 className="card-title mt-2 mb-2 text-center">Staff</h2>
                    <p className="card-text text-center fromfontsize20">จัดการพนักงาน</p>
                  </div>
                </Link>
              </div>
            }
          </div>
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-lg-2 col-md-2" />
            <div className=" paddingTop15 "></div>
            <div className=" paddingTop15" />
            <BtnOrange
              type="button"
              className=""
              onClick={(e) => this.handleClick(e)}
            >
              ออกจากระบบ
            </BtnOrange>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = { logoutPin };
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(StaffView);
