import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import liff from "@line/liff";
import message from "antd/lib/message/index";
import styled from "styled-components";
import logo from "../../assets/img/logoC.svg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: '80px', color: '#ff7676' }} spin />;
const Bg = styled.body`
  height: 100vh;
  padding: 15px;
  background: linear-gradient(180deg, #f7931e 0%, #ff7676 100%);
`;

const Wspace = styled.div`
  height: 450px;
  width: 100%;
  background: #ffff;
  position: relative;
  border-radius: 10px 10px 10px 10px;
`;
const TEXT = styled.text`
  font-size: 20px;
  color: #6b6b6b;
`;
var cid = "กำลังโหลด";
class CustomerQR extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    this.state = {
      cids: null,
    };
  }

  look4cid() {
    if (this.props.customerAuth.customer.customerId !== "ไม่พบข้อมูล") {
      cid = this.props.customerAuth.customer.customerId;
    } else if (cid === null) {
      cid = "1234";
    }
  }

  componentDidMount() {
    this.look4cid();
    liff
      .init({
        liffId: "1656382933-9DzLvxlE", // Use own liffId
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();

        }

        const accessToken = liff.getAccessToken();
        const saveNotification = () => {
          message.open({ content: "บันทึกข้อมูลเรียบร้อย", duration: 8 });
        };

        axios
          .post("/customer/v1/liff", {
            accessToken: accessToken,
          })
          .then((response) => {
            
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });


  }

  render() {
    function goBack() {
      window.history.back();
    }

    return (
      <Bg id="merchantQrColor">
        <btnCF></btnCF>
        <Helmet>
          <title>QR สะสมแต้ม</title>
        </Helmet>
        <Wspace>
          <div className="container">
            <div className=" text-center ">
              <div>
                <img
                  src={logo}
                  className="paddingTop15 fade-in-image"
                  alt="buddyrewards"
                  width="140"
                />
              </div>

              <div>
                
                {this.state.loaded ? null : (
                  <div>
                    {" "}
                    <div className="paddingTop15"></div>
                    <div className="paddingTop15"></div>
                    <div className="paddingTop15"></div>

                    <Spin className="paddingTop15" indicator={antIcon} />
                  </div>
                )}
                <img
                  className="paddingTop15 fade-in-image"
                  style={this.state.loaded ? {} : { display: "none" }}
                  src={
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                    cid
                  }
                  width="150"
                  onLoad={() => this.setState({ loaded: true })}
                />
              </div>

              <div className="row ">
                <div className="paddingTop15"></div>
                <TEXT >{cid}</TEXT>
              </div>
            </div>
            <div></div>
          </div>


          <div className="myQRBackBtn WspaceBoxpadding">

            <div className="text-center fontSize20"> แสดง QR กับร้านค้าเพื่อสะสมแต้ม </div>

            <button className="btnQRBack  " onClick={() => goBack()}>
              ย้อนกลับ
            </button>
          </div>
        </Wspace>
      </Bg>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(CustomerQR);
