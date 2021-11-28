import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopWebPOS";
import "../assets/css/merchantSide/webPOS.css";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import axios from "axios";
import message from "antd/lib/message/index";
import $ from "jquery";
import { Helmet } from "react-helmet";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import logoC from "../assets/img/icon/profileD.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const key = "updatable";

const BtnOrange = styled.button`
  background-color: ${color.Button};
  height: 50px;
  width: 290px;
  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: white;
  &:hover {
    background-color: ${color.ButtonOrange};
    color: white;
  }
`;
const BtnRedeemActive = styled.button`
  background-color: #f68e1a;

  border-style: none;
  font-size: 20px;
  border-radius: 9px;
  color: #ffff;
  &:hover {
    color: #ffff;

    background-color: ${color.ButtonOrange};
  }
`;

const BtnClear = styled.button`
  background-color: #eaeaea;
  width: 129px;
  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: #5f5f5f;
`;
const BtnOK = styled.button`
  background-color: #59dd9a;
  height: 50px;
  width: 290px;
  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: white;
`;

const Text20 = styled.div`
  font-size: 20px;
`;

const Card = styled.div`
  background: #f7f7f7;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin: 15px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
`;

const Cardinfo = styled.div`
  background: #ffffff;
  border-radius: 12px;
`;

class WebPOS2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeList: [],
      selectedPrize: null,
    };
    this.modal_announcement = null;
    this.modal = null;
  }

  openModel(e, data) {
    console.log(data);
    this.setState({
      selectedPrize: {
        id: data.id,
        name: data.name,
        detail: data.detail,
        cost: data.cost,
      },
    });
    e.preventDefault();
    this.modal_announcement = document.getElementById("add");
    this.modal = new window.bootstrap.Modal(this.modal_announcement);
    this.modal.show();
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  calculate(e) {
    e.preventDefault(e);
    var price = $("#price").val();

    var data = {
      merchantId: this.props.auth.user.merchantId,
      price: price,
    };
    axios
      .post("/merchant/v1/calculate", {
        data,
      })
      .then((response) => {
        if (response.data.status === "success") {
          this.props.history.push({
            pathname: "/merchant/branch/WebPOS3",
            state: {
              customer: this.props.location.state.customer,
              point: response.data.resultPoint,
            },
          });
          message.success({
            content: "พบข้อมูล",
            style: {
              fontSize: "25px",
            },
            duration: 1,
          });
        } else {
          message.error({
            content: "เกิดข้อผิดพลาด",
            style: {
              fontSize: "25px",
            },
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    var data = {
      customerId: this.props.location.state.customer.customerId,
      merchantId: this.props.auth.user.merchantId,
    };
    axios
      .post("/merchant/v1/totalPoint", {
        data,
      })
      .then((response) => {
        this.setState({
          totalPoint: response.data.customerPoint,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    $("#price").focus();

    axios
      .post("/merchant/v1/prizeInit", {
        merchantId: this.props.auth.user.merchantId,
      })
      .then((response) => {
        this.setState({
          prizeList: response.data.prizeList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  redeemPoint() {
    var data = {
      point: this.state.selectedPrize.cost,
      branchId: this.props.auth.user.branchId,
      customerId: this.props.location.state.customer.customerId,
      staffId: this.props.pinAuth.staff.staffId,
      merchantId: this.props.auth.user.merchantId,
      prizeId: this.state.selectedPrize.id,
    };
    axios
      .post("/merchant/v1/removePoint", {
        data,
      })
      .then((response) => {
        if (response.data.status === "success") {
          this.props.history.push({
            pathname: "/merchant/branch/webPOS/redeem",
            state: {
              customer: this.props.location.state.customer,
              totalPoint: this.state.totalPoint,
              selectedPrize: this.state.selectedPrize.cost,
            },
          });
          window.location.reload();
        } else {
          message.error({ content: "เกิดข้อผิดพลาด!", key, duration: 2 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    document.body.style.backgroundColor = "#F5F6FA";
    function goBack() {
      window.history.back();
    }
    return (
      <div>
        <Helmet>
          <title>webPOS | buddyMerchant</title>
        </Helmet>
        <div
          class="modal fade"
          id="add"
          tabindex="-1"
          aria-labelledby="addStaffLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title DBB" id="addStaffLabel">
                  ยืนยันการแลกสิทธิพิเศษ
                </h2>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="col bg-body">
                  <h4 className="text-left mt-3 DBB">
                    สิทธิพิเศษที่ต้องการแลก
                  </h4>
                  <div>
                    <Text20 className="text-left">
                      ชื่อสิทธิพิเศษ:{" "}
                      {this.state.selectedPrize == null
                        ? 0
                        : this.state.selectedPrize.name}
                    </Text20>
                    <Text20 className="text-left">
                      รายละเอียด:{" "}
                      {this.state.selectedPrize == null
                        ? 0
                        : this.state.selectedPrize.detail}
                    </Text20>
                    <Text20 className="text-left">
                      แต้มที่ใช้:{" "}
                      {this.state.selectedPrize == null
                        ? 0
                        : this.state.selectedPrize.cost}{" "}
                      แต้ม
                    </Text20>
                    <h4 className="text-left mt-3 mb-3 DBB">
                      สถานะแต้มของลูกค้า
                    </h4>
                    <div className="col form-group mt-2">
                      <Text20 className="text-left">
                        แต้มที่มีอยู่: {this.state.totalPoint} แต้ม
                      </Text20>
                      <Text20 className="text-left">
                        แต้มคงเหลือ:{" "}
                        {this.state.totalPoint -
                          (this.state.selectedPrize == null
                            ? 0
                            : this.state.selectedPrize.cost)}{" "}
                        แต้ม
                      </Text20>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => this.redeemPoint()}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
        <NavTopWebPOS></NavTopWebPOS>
        <Card className="text-center">
          <Cardinfo>
            <div className="paddingTop15"></div>
            {this.state.loaded ? null : <img
               src={logoC}
              class="  rounded-circle fade-in-image"
              alt="customerPic"
              width="80px"
            />}
            <img
              style={this.state.loaded ? {} : { display: "none" }}
              src={this.props.location.state.customer.customerPic}
              class="  rounded-circle fade-in-image"
              alt="customerPic"
              width="80px"
              onLoad={() => this.setState({ loaded: true })}
            />

            <div className="cardInfoWebPOS1">
              คุณ {this.props.location.state.customer.customerNickName}{" "}
              {this.props.location.state.customer.customerFirstName}{" "}
              {this.props.location.state.customer.customerLastName}
            </div>
            <div className="cardInfoWebPOS2">
              วันเกิด 🎂 {this.props.location.state.customer.customerDOB}{" "}
            </div>
            <div className="cardInfoWebPOS3">
              เบอร์ติดต่อ {this.props.location.state.customer.customerPhone}
            </div>
            <div className="cardInfoWebPOS3">
              แต้มปัจจุบัน: {this.state.totalPoint} แต้ม{" "}
            </div>
          </Cardinfo>
          <div className="HeaderWebPOS">ระบุยอดชำระ</div>
          <div className="outterInputPrice">
            <input
              type="numeric"
              pattern="[0-9]+"
              inputMode="number"
              pattern="[0-9]*"
              type="text"
              className="inPutWidth2 inputFontSize DbBold"
              id="price"
            ></input>
          </div>
          <div className="paddingBtm">
            <BtnOK onClick={(e) => this.calculate(e)}>ถัดไป</BtnOK>
          </div>
          <div className="">
            <BtnClear onClick={() => goBack()}>ย้อนกลับ</BtnClear>
          </div>
          <div className="HeaderWebPOS text-start">
            รางวัลที่คุณ {this.props.location.state.customer.customerNickName}{" "}
            {this.props.location.state.point}แลกได้
          </div>
          <div className="paddingBtm text-start"></div>
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {this.state.prizeList != null &&
              this.state.prizeList.map((p) => (
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title text-start" key={p.prize_name}>
                        {p.prize_name}
                      </h3>
                      <h5
                        className="card-title  text-start"
                        key={p.prize_detail}
                      >
                        {p.prize_detail}
                      </h5>
                      <h3
                        className="card-title  text-end"
                        key={p.prize_pointcost}
                      >
                        {p.prize_pointcost}{" "}
                        <FontAwesomeIcon
                          className=" IconmyCard "
                          icon={faStar}
                        />
                      </h3>
                    </div>
                    <div className="card-footer text-end">
                      <div className="  text-end">
                        {p.prize_pointcost <= this.state.totalPoint ? (
                          <BtnRedeemActive
                            href="#"
                            className="btn"
                            onClick={(e) =>
                              this.openModel(e, {
                                id: p.prize_id,
                                name: p.prize_name,
                                detail: p.prize_detail,
                                cost: p.prize_pointcost,
                              })
                            }
                          >
                            สามารถแลกรางวัลได้
                          </BtnRedeemActive>
                        ) : (
                          <button
                            type="button"
                            className="btn btnRedeemDisable disabled"
                          >
                            ไม่สามารถแลกได้
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div>{this.props.location.state.customer.customerId}</div>
        </Card>

        <div className="text-center">
          <BtnOrange
            type="button"
            className=""
            onClick={(e) => this.handleClick(e)}
          >
            ออกจากระบบพนักงาน
          </BtnOrange>
        </div>
      </div>
    );
  }
}

const mapDispatch = { logoutPin };
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(WebPOS2);
