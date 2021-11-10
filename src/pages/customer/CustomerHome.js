import React, { Component } from "react";
import axios from "axios";
import Navigation from "../../layouts/Navigation";
import { connect } from "react-redux";
//import { logoutCustomer } from "../../actions/customerAuthActions";
import liff from "@line/liff";
// import NavTop from "../../layouts/NavTop";
import { Helmet } from "react-helmet";
import "../../assets/css/CustomerSide/Customer.css";
import { notification } from "antd";
import styled from "styled-components";

import jwt from 'jsonwebtoken'
import { setCustomer } from "../../actions/customerAuthActions";
import { bindActionCreators } from 'redux'

// import logo from "../../assets/img/logoC.svg";
// import logoKMUTT from "../../assets/img/kmutt.svg";
// import profile from "../../assets/img/icon/profileD.svg";
// import { Redirect } from "react-router";


const HEADER = styled.text`
  font-size: 40px;
  color: #6b6b6b;
`;
// const Cardinfo = styled.div`
//   background: #ffffff;

//   border-radius: 12px;
//   margin-left: 15px;
//   margin-right: 15px;
// `;

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerFirstName: null,
      accessToken: null,
    };
  }
  handleClick(e) {
    e.preventDefault();
    this.props.logoutCustomer();
  }
  componentDidMount() {
    if(this.props.customerAuth.isAuthenticated === true){
      return
      
    }
    liff
      .init({
        liffId: "1656382933-9DzLvxlE", // Use own liffId
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        const openNotification = () => {
          notification.success({
            message: "บันทึกข้อมูลเรียบร้อย",
            duration: 4,

            className: "messageclass",
            // style: {
            //   marginTop: '1px',
            //   width: 600,
            //   color: "Green",
            // },
          });
        };

        const accessToken = liff.getAccessToken();

        console.log(accessToken);
        this.setState({ accessToken: accessToken });
        
        axios
          .post("/customer/v1/liff", {
            accessToken: accessToken,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.status === "error") {
              window.location.href = response.data.redirect;
              return;
            }else{
              this.props.setCustomer(jwt.decode(response.data.customerToken)) 
              localStorage.setItem("customerToken", response.data.customerToken);
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/home")
      .then((response) => {
        // handle success
        this.setState({
          merchantId: response.data.results.merchantId,
          merchantName: response.data.results.merchantName,
        });
        console.log(response.data[0]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    return (
      <>
        <Navigation history={this.props.history}></Navigation>
        <Helmet>
          <title>ข้อมูลส่วนตัว</title>
        </Helmet>
        <div className="container">
          <div className="row ">
            <div class="container">
              <div class="row row-cols-2">
                <div className="leftPD ">
                  <HEADER className="DBB paddingTop15 ">ข้อมูลส่วนตัว</HEADER>
                  
                </div>
                <div className="text-end  paddingTop15">
                  <img src={this.props.customerAuth.customer.customerPic}  className="rounded-circle" alt="logo" width="60" />
                </div>
              </div>
            </div>
            <div className="text-center"></div>

            <div className="">
              <div className="text-left fromfontsize20">ชื่อเล่นของคุณ</div>
              <input
                type="text"
                name="nickname"
                id="nickName"
                className="form-control  fromfontsize20"
                placeholder="ชื่อเล่นของคุณ"
                required
              ></input>
            </div>
            <div className="text-left fromfontsize20">ชื่อจริง</div>
            <div className="">
              <input
                type="text"
                name="firstname"
                id="firstName"
                className="form-control fromfontsize20"
                placeholder={this.props.customerAuth.customer.customerFirstName}
                required
              ></input>
            </div>
            <div className="text-left fromfontsize20">นามสุกล</div>
            <div className="">
              <input
                type="text"
                name="LastName"
                id="lastName"
                className="form-control fromfontsize20"
                placeholder="นามสุกล"
                required
              ></input>
            </div>

            <div className="text-left fromfontsize20">เบอร์โทรศัพท์</div>
            <div className="">
              <input
                type="tel"
                name="Phone"
                id="phone"
                className="form-control fromfontsize20"
                placeholder="เบอร์โทรศัพท์"
                required
              ></input>
            </div>
            <div className="text-left fromfontsize20">เพศ</div>
            <div>
              <select class="form-select fromfontsize20" id="gender" required>
                <option selected>โปรดระบุเพศ</option>
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
                <option value="not define">ไม่ระบุ</option>
              </select>
            </div>
            <div className="text-left fromfontsize20">วัน เดือน ปีเกิด</div>
            <div>
              <input
                type="date"
                id="dob"
                className="form-control fromfontsize20"
                min="1000-01-01"
                max="2019-12-31"
              ></input>
            </div>

            <div className="paddingTop15">
              <button
                type="button"
                className="  btnEditProfile"
                onClick={() =>  liff.logout()}
              >
                logout LINE
              </button>
            </div>

            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
          </div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCustomer }, dispatch)
}
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
