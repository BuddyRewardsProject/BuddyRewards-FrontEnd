import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import { Layout, Menu, Breadcrumb, PageHeader } from 'antd';
import PointHistory from "../assets/img/icon/history.svg";
import dash from "../assets/img/icon/customer.svg";
import addon from "../assets/img/icon/addon.svg";
import settings from "../assets/img/icon/settings.svg";
import { Helmet } from "react-helmet";

import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BtnBackMain = styled.button`
background: ${color.Gradient};

  border-radius: 99px;
  font-size: 25px;
  border: 0px solid #f68e1a;
  color: #ffff;
  width: 250px;
  height: 50px;
  margin: 15px;
  transition:ease-in-out 0.4s;
  &:hover {
    color: #ffff;
    width: 300px;
    
  }
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

class Dashboard extends Component {
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
        <Helmet>
          <title>Dashboard | buddyMerchant</title>
        </Helmet>
        <BgGradient>
          <div className="container">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                {this.props.auth.user.merchantName} {this.props.auth.user.branchName}
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <div className=" container">
          <h2>Quick Look</h2>
        </div>
        <div className="container fade-in-image align-items-center  text-center">
          <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
            <div class="cols-2 ">
              <div className="menuCard">
                <h3 className="card-title mt-2 mb-2 text-start">แต้มที่แจกวันนี้</h3>
                <h1 className="card-title mt-2 mb-2 text-end">100 แต้ม</h1>
              </div>
            </div>
            <div class="cols-2 ">
              <div className="menuCard">
                <h3 className="card-title mt-2 mb-2 text-start">ยอดขายจากแต้มวันนี้</h3>
                <h1 className="card-title mt-2 mb-2 text-end">100 บาท</h1>
              </div>
            </div>
          </div>
        </div>
        <div className=" container">
          <div className="paddingTop15"></div>
          <h2>Menu Dashboard</h2>
        </div>
        <div className="container fade-in-image align-items-center  text-center">
          <div class="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-3">
            <div class="cols-2 ">
              <Link to="/merchant/branch/dashboard/pointHistory">
                <div className="menuCard">
                  <img src={PointHistory} width="90px" alt="PointHistory" />
                  <h2 className="card-title mt-2 mb-2 text-center">Point History</h2>
                  <p className="card-text text-center fromfontsize20">ประวัติการแจกแต้ม</p>
                </div>
              </Link>
            </div>
            <div class="cols-2 ">
              <Link to="/merchant/branch/dashboard/mymember">
                <div className="menuCard">
                  <img src={dash} className="fade-in-image " width="90px" alt="Dashboard" />
                  <h2 className="card-title mt-2 mb-2 text-center">My Member</h2>
                  <p className="card-text text-center fromfontsize20">ลูกค้า</p>
                </div>
              </Link>
            </div>
            <div class="cols-2">
              <Link to="/merchant/branch/dashboard">
                <div className="menuCard">
                  <img
                    src={addon}
                    className="fade-in-image "
                    alt="staff Management"
                    width="90px"
                  />
                  <h2 className="card-title mt-2 mb-2 text-center">Add On</h2>
                  <p className="card-text text-center fromfontsize20">ส่วนเสริม</p>
                </div>
              </Link>
            </div>
            <div class="cols-2">
              <Link to="/merchant/branch/settings">
                <div className="menuCard">
                  <img
                    src={settings}
                    className="fade-in-image "
                    alt="staff Management"
                    width="90px"
                  />
                  <h2 className="card-title mt-2 mb-2 text-center">Settings</h2>
                  <p className="card-text text-center fromfontsize20">ตั้งค่า</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="paddingTop15"></div>
          <Link to="/merchant/branch/">
            <BtnBackMain>กลับไปยังหน้าหลัก</BtnBackMain>
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

export default connect(mapStateToProps, mapDispatch)(Dashboard);
