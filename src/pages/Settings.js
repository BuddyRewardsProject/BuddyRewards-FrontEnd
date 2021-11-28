import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import { Layout, Menu, Breadcrumb, PageHeader } from 'antd';
import branch from "../assets/img/icon/store.svg";
import dash from "../assets/img/icon/Bdash.svg";
import prize from "../assets/img/icon/prize.svg";
import staff from "../assets/img/icon/staff.svg";
import rewardcard from "../assets/img/icon/rewardcard.svg";
import { ConfigProvider, Skeleton } from 'antd';

const BtnDash = styled.button`
background: ${color.Gradient};
height: 50px;
  border-radius: 99px;
  font-size: 25px;
  border: 0px solid #f68e1a;
  color: #ffff;
  width: 250px;
  margin: 15px;
  transition:ease-in-out 0.4s;
  &:hover {
    color: #ffff;
    width: 300px;
    
  }
`

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
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

    return (
      <div>
        <NavTopWebPOS />
        <BgGradient>
          <div className="container">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                ตั้งค่าบัญชี
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <div className=" container">
          <h2>ตั้งค่าบัญชี</h2>
        </div>
        <div className="container fade-in-image align-items-center  text-center">

          <div class="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3">
            <div class="cols-2 ">
              <Link to="/merchant/branch/settings/rewardcard">
                <div className="menuCard">
                  <img src={rewardcard} alt="Dashboard" />
                  <h2 className="card-title mt-2 mb-2 text-center">Reward Card</h2>
                  <p className="card-text text-center fromfontsize20">บัตรสะสมแต้ม</p>
                </div>
              </Link>
            </div>

            <div class="cols-2 ">
              <Link to="/merchant/branch/settings/prize">
                <div className="menuCard">
                  <img src={prize} className="fade-in-image " alt="Dashboard" />
                  <h2 className="card-title mt-2 mb-2 text-center">Prize</h2>
                  <p className="card-text text-center fromfontsize20">รางวัล</p>
                </div>
              </Link>
            </div>

            <div class="cols-2">
              <Link to="/merchant/branch/branch-Management">

                <div className="menuCard">
                  <img
                    src={branch}
                    className="fade-in-image "
                    alt="staff Management"
                  />
                  <h2 className="card-title mt-2 mb-2 text-center">branch</h2>
                  <p className="card-text text-center fromfontsize20">จัดการสาขา</p>
                </div>
              </Link>
            </div>

            <div class="cols-2">
              <Link to="/merchant/branch/staff-Management">
                <div className="menuCard">
                  <img
                    src={staff}
                    className="fade-in-image "
                    alt="staff Management"
                  />
                  <h2 className="card-title mt-2 mb-2 text-center">staff</h2>
                  <p className="card-text text-center fromfontsize20">จัดการพนักงาน</p>
                </div>
              </Link>
            </div>
          </div>
          <Link to="/merchant/branch/Dashboard">
            <div className="paddingTop15"></div>
            <BtnDash>กลับไปยัง Dashboard</BtnDash>
          </Link>
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
