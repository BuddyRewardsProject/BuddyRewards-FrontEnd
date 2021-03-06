import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import logo from "../assets/img/merchantLOGO.svg";
import logoBD from "../assets/img/logoM.svg";
import { Link } from "react-router-dom";
import "../assets/css/merchantSide/MerchantLOGO.css";
import PinInput from "react-pin-input";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import axios from "axios";
import message from "antd/lib/message/index";
import { setStaff } from "../actions/pinActions";
import jwt from "jsonwebtoken";
import { bindActionCreators } from "redux";

const BtnLogOut = styled.button`
  background-color: ${color.Button};
  border-style: none;
  font-size: 22px;
  height: 45px;
  border-radius: 99px;
  color: white;
`;
const Btntoken = styled.button`
  background-color: ${color.Button};
  border-style: none;
  font-size: 22px;
  height: 45px;
  width: 200px;
  border-radius: 99px;
  color: white;
`;
const BtnClear = styled.button`
  color: #838282;
  background-color: #e6e6e6;
  font-size: 18px;
  width: 200px;
  border-radius: 99px;
  border-style: none;
`;
const BgG = styled.div`
  height: 300px;
  background: linear-gradient(180deg, #f7931e 0%, #ff7676 100%);
  border-radius: 0px 0px 35px 35px;
`;
const MarginTop = styled.div`
  margin-top: 15%;
  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 50%;
  }
`;

class PinMerchantLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: null,
      pinState: null,
    };
  }

  onChange = (value) => {
    this.setState({
      pin: value,
    });
  };

  onClear = () => {
    this.pin.clear();
    this.setState({
      pin: null,
    });
  };

  handleClick(e) {
    e.preventDefault();
    this.props.logout();
    window.location.href = "/merchant/login/";
  }

  backToLogin(){
    window.location.reload();
  }

  componentWillMount() {
    var data = {
      branchId: this.props.auth.user.branchId,
    };
    axios
      .post("/merchant/v1/login/pin/check", data)
      .then((response) => {
        if (response.data.status === "success") {
          this.setState({
            pinState: "success",
          });
        } else {
          this.setState(
            {
              pinState: "unsuccess",
            },
            () => {
              window.location.href = "/merchant/login/pin/reset";
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loginPin() {
    var data = {
      pincode: this.state.pin,

    };

    axios
      .post("/merchant/v1/login/pin", data)
      .then((response) => {
        if (response.data.status === "success") {
          this.props.setStaff(jwt.decode(response.data.pinToken));
          localStorage.setItem("pinToken", response.data.pinToken);
          window.location.href = "/merchant/branch";

        } else {
          message.error({
            content: "PIN ??????????????????????????????",
            style: {
              fontSize: '25px',
            },
            duration: 5,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        {this.state.pinState === null ? (
          <div>
            <div class="d-flex justify-content-center text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <h1>Token Expire</h1>
            </div>
            <div className= "text-center">
              
              <img src={logoBD} width="200px"></img>
              
              <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
              
            </div>
            <div className="text-center">
              
              <a href="/merchant/login"><Btntoken type="button" class="btn btn-primary" onClick={()=> this.backToLogin()}>Back to Login</Btntoken></a>
            </div>
          </div>

        ) : (
          <BgG>
            <div className="container">
              <div className="position-absolute overlap-box row align-items-center">
                <div className="col-lg-3 col-md-2"></div>
                <MarginTop className="col bg-white shadow p-3 mb-5 bg-body rounded-10">
                  <div>
                    <div className="LoginMerchantPIN align-items-center">
                      <Link className="body " to="/">
                        <img src={logo} alt="logo" />
                      </Link>
                    </div>
                    <h1 className="text-center mt-3 mb-3">
                    {this.props.auth.user.merchantName}{" "}
                      {this.props.auth.user.branchName}
                    </h1>
                    <h4 className="text-center mt-3 mb-3">
                      ???????????? PIN ?????????????????????????????????????????????
                    </h4>
                    <div className="text-center fontSizePin  hidepintext ">
                      <PinInput
                        length={6}
                        initialValue=""
                        onChange={(v) => this.onChange(v)}
                        type="numeric"
                        inputMode="number"
                        focus={true}
                        style={{padding: "8px"}}
                        inputStyle={{ 
                        borderColor: "#FFFF",
                       
                        background: "#f3f3f3",
                        borderRadius: "7px",
                        width: "37px",
                        height: "60px",
                        WebkitTextSecurity: "disc",
                      }}
                        inputFocusStyle={{ borderColor: "#F7931E",background: "#FFFF" }}
                        onComplete={(value, index) => {
                          this.loginPin();
                        }}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        ref={(p) => (this.pin = p)}
                      />
                    </div>
                    <div className="text-center">
                      <BtnClear
                        className=""
                        onClick={this.onClear}
                        type="button"
                      >
                        ??????
                      </BtnClear>
                    </div>
                  </div>
                  <div className="col text-center form-group mt-2 d-grid  mx-auto">
                    <BtnLogOut
                      className=" "
                      type="button"
                      onClick={(e) => this.handleClick(e)}
                    >
                      ??????????????????????????????
                    </BtnLogOut>
                  </div>
                </MarginTop>
                <div className="col-lg-3 col-md-2"></div>
              </div>
            </div>
          </BgG>
        )}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setStaff, logout }, dispatch);
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(PinMerchantLogin);
