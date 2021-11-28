import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import color from "../../config/color";
import "../../assets/css/CustomerSide/Customer.css";
import Navigation from "../../layouts/Navigation";
import styled from "styled-components";
import { setCustomer } from "../../actions/customerAuthActions";
import liff from "@line/liff";
import jwt from "jsonwebtoken";
// redux ต้องมีทุกหน้าใน liff
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: "60px", color: "#F7931E" }} spin />
);
const BgBanner = styled.div`
  height: 90px;
  background: ${color.Gradient};
  border-radius: 0px 0px 20px 20px;
`;
const Card = styled.div``;

class CustomerCardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
      historyList: [],
      divider: null,
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

            //console.log(pictureUrl);
            this.setState({ pictureUrl: pictureUrl });

            axios
              .post("/customer/v1/detailHistory", {
                merchantId: this.props.match.params.merchantId,
                customerId: this.props.customerAuth.customer.customerId,
              })

              .then((response) => {
                this.setState({
                  historyList: response.data.historyList,
                  divider: response.data.historyList[0].divider,
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

        axios
          .post("/customer/v1/liff", {
            accessToken: accessToken,
          })
          .then((response) => {
            console.log(response.data);
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

  renderStatus(pointStatus) {
    switch (pointStatus) {
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
          <title>ประวัติการสะสมแต้ม</title>
        </Helmet>

        <Navigation history={this.props.history}></Navigation>
        <BgBanner className="container ">
          <Card className="">
          <div className="DetailHistoryHeaderText text-start">
                  ประวัติการสะสมแต้ม 
                </div>
                <div className="DetailHistoryHeaderText2 text-end">
                  ทุก {this.state.divider} บาท = 1 แต้ม
                </div>
          </Card>

          <div className="text-center "></div>
        </BgBanner>
        <div>
          <div></div>
        </div>
        <div className="container">
          <div className="margForHistoryDetail"></div>
          {this.state.historyList.length === 0 && (
              <div className="text-center">
                <Spin indicator={antIcon} />
              </div>
            )}
          {this.state.historyList.length != 0 &&
            this.state.historyList.map((historyInfo, index) => (
              <div className="margForHistoryDetail" key={index}>
                <div className=" cardBGforDetailHistory ">
                  <div className="row ">
                    <div className="col-6 DetailHistoryblock">
                      
                      {moment(historyInfo.time_stamp).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                      
                    </div>
                    <div className="col-6 text-end DetailHistoryblockStatus">
                      {this.renderStatus(historyInfo.point_status)}{" "}
                      {historyInfo.point} แต้ม
                    </div>
                    <div className="col DetailHistoryblock">
                      {" "}
                      {historyInfo.branch_name}
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardDetail);
