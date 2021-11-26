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

const BgBanner = styled.div`
  height: 50px;
  background: ${color.Gradient};
  border-radius: 0px 0px 25px 25px;
`;
const Card = styled.div``;

class CustomerCardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
      historyList: [],
    };
  }

  componentDidMount() {
    //  console.log(this.props.match.params.merchantId)

    //  console.log("this.props.match.params.merchantId")

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
                // handle success

                console.log(response.data);
                // this.setState({
                //   merchantName: response.data.merchantInfo.merchantName,
                //   TotalPoint: response.data.merchantInfo.TotalPoint,

                // })

                this.setState({
                  historyList: response.data.historyList,
                });

                console.log(this.state.historyList, "<<<<< that <<<<<<<<<");
              })
              .catch((error) => {
                // handle error
                console.log(error);
              })
              .then(() => {
                // always executed
              });
          })
          .catch((err) => {
            console.log("error", err);
          });

        console.log(accessToken);

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

  // render() { return (<h1>{this.props.match.params.merchantId}</h1>);}
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
          <Card className="text-start">
            <div className="DetailHistoryHeaderText">ประวัติการสะสมแต้ม</div>
          </Card>
         
          <div className="text-center "></div>
        </BgBanner>
        <div>
          <div></div>
        </div>
        <div className="container">
          <div className="margintop30"></div>

          {this.state.historyList.length != 0 &&
            this.state.historyList.map((historyInfo, index) => (
              <div className="margintop30" key={index}>
                <div className=" cardBGforDetailHistory ">
                  <div className="row ">
                    <div className="col-6 DetailHistoryblock">
                      {moment(historyInfo.time_stamp).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </div>
                    <div className="col-6 text-end DetailHistoryblockStatus">
                      {this.renderStatus(historyInfo.point_status)} {historyInfo.point}{" "}
                      แต้ม
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
