import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import color from "../../config/color";
import "../../assets/css/CustomerSide/Customer.css";
import Navigation from "../../layouts/Navigation";
import styled from "styled-components";
import { setCustomer } from "../../actions/customerAuthActions";
import prize from "../../assets/img/icon/prize.svg";
import liff from "@line/liff";
import jwt from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// redux ต้องมีทุกหน้าใน liff
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import merchantLOGO from "../../assets/img/icon/merchantPreLoad.svg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: "60px", color: "#F7931E" }} spin />
);
const BgBanner = styled.div`
  height: 300px;
  background: ${color.Gradient};
  border-radius: 0px 0px 25px 25px;
`;
const Card = styled.div``;

class CustomerDetailHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
      prizeInfoList: [],
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
              .post("/customer/v1/merchantDetail", {
                merchantId: this.props.match.params.merchantId,
                customerId: this.props.customerAuth.customer.customerId,
              })

              .then((response) => {
                // handle success

                this.setState({
                  merchantId: response.data.merchantInfo.merchantId,
                  merchantName: response.data.merchantInfo.merchantName,
                  TotalPoint: response.data.merchantInfo.TotalPoint,
                });

                this.setState({
                  prizeInfoList: response.data.prizeInfo,
                });
              })
              .catch((error) => {
                console.log(error);
              })
          })
          .catch((err) => {
            console.log("error", err);
          });

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

  renderStatus(pointcost) {
    switch (pointcost) {
      case "reward":
        return "+";
      case "redeem":
        return "-";
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>หน้าบัตร</title>
        </Helmet>

        <Navigation history={this.props.history}></Navigation>
        <BgBanner className="container ">
          <Card className="text-center">
            <img
              src={merchantLOGO}
              class=" margintop30"
              alt="merchantLOGO"
              width="100px"
            />
            <div className="cardDetialHeaderText">
              {this.state.merchantName}
            </div>
            <div className=" cardBGforDetail cardNamemiddleforDetail">
              คุณมี {this.state.TotalPoint} แต้ม
            </div>
          </Card>
          <Link to={`/customer/merchant/history/${this.state.merchantId}`}>
            <div className="text-center ">
              <button className="btnhistorymiddle">ประวัติ</button>
            </div>
          </Link>
        </BgBanner>
        <div>
          <div></div>
        </div>
        <div className="container">
          <h1 className="margintop30">สิทธิประโยชน์ของคุณ</h1>
          {this.state.totalPoint === null ? (
            <div className="cardInfoWebPOS1"></div>
          ) : (
            <div className="cardInfoWebPOS1"></div>
          )}
          {this.state.prizeInfoList.length === 0 && (
            <div className="text-center">
              <Spin indicator={antIcon} />
            </div>
          )}
          {this.state.prizeInfoList.length != 0 &&
            this.state.prizeInfoList.map((prizeInfo, index) => (

              <div className="cardBG " key={index}>
                <div
                  class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                  aria-current="true"
                >
                  <img
                    src={prize}
                    alt="twbs"
                    width="60"
                    height="60"
                    class="rounded-circle flex-shrink-0"
                  ></img>
                  <div class=" w-100 justify-content-between d-flex align-items-center">
                    <div class="d-flex align-items-center">
                      <div class="fontSizeMycardTitle">
                        {prizeInfo.prize_name}
                      </div>
                    </div>
                    <div class=" justify-content-between d-flex align-items-center  d-flex ">
                      {prizeInfo.prize_pointcost <= this.state.TotalPoint ? (
                        <div className="labelCurrentPoint justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                          {prizeInfo.prize_pointcost}{" "}
                          <FontAwesomeIcon
                            className="IconmyCard"
                            icon={faStar}
                          />
                        </div>
                      ) : (
                        <div className="labelCurrentPointDisable justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                          {prizeInfo.prize_pointcost}{" "}
                          <FontAwesomeIcon
                            className="IconStarDisable"
                            icon={faStar}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="paddingTop15"></div>
          <div className="paddingTop15"></div>
          <div className="paddingTop15"></div>
          <div className="paddingTop15"></div>
          <div className="paddingTop15"></div>
          <div className="paddingTop15"></div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailHistory);
