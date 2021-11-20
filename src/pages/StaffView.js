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

var role = null;

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

// const MarginTop = styled.div`
//   margin-top: 8%;
// `;
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
        <BgGradient>
          <div className="container ">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                {this.props.auth.user.userName}{" "}
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
                  <p class="card-text text-center">เว็บโพส</p>
                </div>
              </Link>
            </div>
            
            {this.props.pinAuth.staff.roleId < 3  &&
            <div class="cols-2 ">
              <Link to="/merchant/branch/Dashboard">
                <div className="menuCard">
                  <img src={dash} className="fade-in-image " alt="Dashboard" />
                  <h2 className="card-title mt-2 mb-2 text-center">
                    Dashboard
                  </h2>
                  <p class="card-text text-center">แดชบอร์ด</p>
                </div>
              </Link>
            </div>
  
}
           {this.props.pinAuth.staff.roleId < 3  &&
            <div class="cols-2">
              <Link to="/merchant/branch/branch-Management">
                <div className="menuCard">
                  <img
                    src={branch}
                    className="fade-in-image "
                    alt="staff Management"
                  />
                  <h2 className="card-title mt-2 mb-2 text-center">Branch</h2>
                  <p class="card-text text-center">จัดการสาขา</p>
                </div>
              </Link>
            </div>
  }
  
           {this.props.pinAuth.staff.roleId < 3  &&
            <div class="cols-2">
              <Link to="/merchant/branch/staff-Management">
                <div className="menuCard">
                  <img
                    src={staff}
                    className="fade-in-image "
                    alt="staff Management"
                  />
                  <h2 className="card-title mt-2 mb-2 text-center">Staff</h2>
                  <p class="card-text text-center">จัดการพนักงาน</p>
                </div>
              </Link>
            </div>
  }
          </div>
        </div>
            

        <div className="container ">
          <div className="row">
            <div className="col-lg-2 col-md-2" />
            {/* <div className="col">
              <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-4 p-4">
                <div className="col">
                  <Link to="/merchant/branch/webPOS">
                    <div className="card h-100  card rounded-10  ">
                      <div className="card-body ">
                        <div className="iconStaffManagement align-items-center">
                          <img src={pos} alt="WebPOS" />
                        </div>
                        <h2 className="card-title mt-2 mb-2 text-center">
                          web POS
                        </h2>
                        <h3 className="card-title mt-2 mb-2 text-center">
                          เว็บโพส
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>{" "}
                <Link to="/merchant/branch/Dashboard">
                  <div className="col">
                    
                    <div className="card h-100 card rounded-10  ">
                      <div className="card-body">
                        <div className="iconStaffManagement align-items-center">
                          <img src={dash} alt="Dashboard" />
                        </div>
                        <h2 className="card-title mt-2 mb-2 text-center">
                          Dashbroad
                        </h2>
                        <h3 className="card-title mt-2 mb-2 text-center">
                          แดชบอร์ด
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/merchant/branch/staff-Management">
                  <div className="col">
                    <div className="card dashMenuBody h-100 card rounded-10 ">
                      <div className="card-body ">
                        <div className="iconStaffManagement align-items-center">
                          <img src={staff} alt="staff Management" />
                        </div>
                        <h2 className="card-title mt-2 mb-2 text-center">
                          Staff Management
                        </h2>
                        <h3 className="card-title mt-2 mb-2 text-center">
                          จัดการพนักงาน
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="col">
                  <Link to="/merchant/branch/branch-Management">
                    <div className="card h-100 card rounded-10 ">
                      <div className="card-body">
                        <div className="iconStaffManagement align-items-center">
                          <img src={branch} alt="branch" />
                        </div>
                        <h2 className="card-title mt-2 mb-2 text-center">
                          Branch Management
                        </h2>
                        <h3 className="card-title mt-2 mb-2 text-center">
                          จัดการสาขา
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div> */}























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
