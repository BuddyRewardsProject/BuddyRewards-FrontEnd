import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

import styled from "styled-components";
import { connect } from "react-redux";
import logo from "../../assets/img/logoC.svg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
var cid = "ไม่พบข้อมูล";

const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
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

    this.changeMerchantBgColor("#F7931E", "#FF7676");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://palett.es/API/v1/palette", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));

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
    document.body.style.backgroundColor =
      "linear-gradient(180deg, #FF7676 0%, #F7931E 100%)";
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = "#FFFFFF";
  }

  changeMerchantBgColor(primaryColor, secondColor) {
    document.getElementById(
      "merchantQrColor"
    ).style.background = `linear-gradient(180deg, ${primaryColor} 0%, ${secondColor} 100%)`;
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
                {/* <img
                  className="paddingTop15"
                  src={'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+cid}
                  alt="buddyrewards"
                  width="150" onLoad={() => this.setState({loaded: true})}
                />
                 */}
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

                {/* <TEXT> แสดง QR กับร้านค้าเพื่อสะสมแต้ม </TEXT> */}
              </div>
            </div>
            <div></div>
          </div>
          
               
          <div className="myQRBackBtn WspaceBoxpadding">
            
          <div className="text-center"> แสดง QR กับร้านค้าเพื่อสะสมแต้ม </div>
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
