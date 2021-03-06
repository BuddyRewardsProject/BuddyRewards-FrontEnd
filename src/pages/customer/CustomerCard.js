import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import NavTopMyCard from "../../layouts/NavTopMyCard";
import "../../assets/css/CustomerSide/Customer.css";
import Navigation from "../../layouts/Navigation";
import Mlogo from "../../assets/img/icon/merchantPreLoad.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import message from "antd/lib/message/index";
import welcome from "../../assets/img/icon/welcome.png";
import liff from "@line/liff";
import jwt from "jsonwebtoken";
// redux ต้องมีทุกหน้าใน liff
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCustomer } from "../../actions/customerAuthActions";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = (
  <LoadingOutlined style={{ fontSize: "60px", color: "#F7931E" }} spin />
);

class CustomerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      merchantList: [],
    };
  }
  componentDidMount() {
    liff
      .init({
        liffId: "1656382933-9DzLvxlE", // Use own liffId
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }

        const accessToken = liff.getAccessToken();
        liff
          .getProfile()
          .then((profile) => {
            const pictureUrl = profile.pictureUrl;

            this.setState({ pictureUrl: pictureUrl });

            axios
              .post("/customer/v1/merchantdata", {
                customerId: this.props.customerAuth.customer.customerId,
              })

              .then((response) => {
                this.setState({
                  merchantList: response.data.merchantInfo,
                });
              })
              .catch((error) => {
                // handle error
                console.log(error);
              })
          })
          .catch((err) => {
            console.log("error", err);
          });

        this.setState({ accessToken: accessToken });
        if (liff.getOS() === "android") {
          message.success({
            content: "สวัสดีชาว Android",
            style: {
              fontSize: "20px",
            },
            duration: 3,
          });
        } else if (liff.getOS() === "ios") {
          message.success({
            content: "สวัสดีชาว ios",
            style: {
              fontSize: "20px",
            },
            duration: 3,
          });
        }

        axios
          .post("/customer/v1/liff", {
            accessToken: accessToken,
          })
          .then((response) => {
            if (response.data.status === "error") {
              window.location.href = response.data.redirect;
              return;
            } else {
              this.props.setCustomer(jwt.decode(response.data.customerToken));
              localStorage.setItem(
                "customerToken",
                response.data.customerToken
              );
            }
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
    
    return (
      <>
        <Helmet>
          <title>บัตรของคุณ</title>
        </Helmet>
        <NavTopMyCard></NavTopMyCard>
        <Navigation history={this.props.history}></Navigation>
        <div className="container ">
          <div className="margintopforcard">
            {this.state.merchantList.length != 0 &&
              this.state.merchantList.map((merchant, index) => (
                <Link
                  key={index}
                  to={`/customer/mycard/detail/${merchant.merchantId}`}
                >
                  <div className="cardBG ">
                    <div
                      class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                      aria-current="true"
                    >
                      <img
                        src={Mlogo}
                        alt="twbs"
                        width="60"
                        height="60"
                        class="rounded-circle flex-shrink-0"
                      ></img>
                      <div className=" w-100 justify-content-between d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="fontSizeMycardTitle">
                            {merchant.merchantName}
                          </div>
                        </div>
                        <div className="labelCurrentPoint justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1 ">
                          {merchant.TotalPoint}
                          <FontAwesomeIcon
                            className=" IconmyCard "
                            icon={faStar}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            <div className="paddingTop15"></div>
            {this.state.merchantList.length === 0 && (
             <div>{this.state.loaded ? null : (
              <div className="text-center">
                <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
                <Spin  indicator={antIcon} />
              </div>
            )}
            <img src={welcome} className="img-fluid fade-in-image"
              onLoad={() => this.setState({ loaded: true })}
            />
</div>
            )}

            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
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
  return bindActionCreators({ setCustomer }, dispatch);
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCard);
