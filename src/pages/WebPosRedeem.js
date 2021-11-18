import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopWebPOS";
import "../assets/css/merchantSide/webPOS.css";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import profile from "../assets/img/icon/profileD.svg";
import axios from "axios";
import message from "antd/lib/message/index";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParking, faStar } from "@fortawesome/free-solid-svg-icons";

const key = "updatable";

const BtnOrange = styled.button`
  background-color: ${color.Button};
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

const BtnClear = styled.button`
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
const BtnOK = styled.button`
  background-color: #59dd9a;
  width: 290px;

  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: white;
`;
const MarginTop = styled.div`
  margin: 130px;
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

const RedeemCard = styled.div`
  background: #ffffff;
  width: 18rem;
`;

const Cardinfo = styled.div`
  background: #ffffff;

  border-radius: 8px;
`;

class WebPosRedeem extends Component {
  constructor(props) {
    super(props);
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
          message.success({ content: "สำเร็จแล้ว!", key, duration: 2 });
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
    function goNext() {
      //window.location.href = "/merchant/branch/WebPOS3";
    }

    return (
      <div>
        <NavTopWebPOS></NavTopWebPOS>
        <MarginTop></MarginTop>

        <Card>
          <Cardinfo className="text-center">
            <img
              src={profile}
              className="img-fluid paddingBarCodeIcon"
              alt="barcodeScan"
              width="99px"
            />
            <div className="cardInfoWebPOS1">คุณ </div>
            <div className="cardInfoWebPOS2">วันเกิด </div>
            <div className="cardInfoWebPOS3">เบอร์ติดต่อ</div>
          </Cardinfo>

          <div className="HeaderWebPOS text-start">รางวัลที่คุณ NickName แลกได้</div>
          <div className="paddingBtm text-center">
            
          

          <div className="row row-cols-1 row-cols-md-4 g-3">
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">prize Name</h3>
                  <h5 className="card-title ">ใช้ 10 แต้ม</h5>
                </div>
                <div className="card-footer text-end">
                  <div className="  text-end">
                    <BtnClear href="#" className="   btn  ">
                      สามารถแลกได้
                    </BtnClear>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">prize Name</h3>
                  <h5 className="card-title">ใช้ 10 แต้ม</h5>
                </div>
                <div className="card-footer text-end">
                  <div className="  text-end">
                    <BtnClear href="#" className="   btn  ">
                      สามารถแลกได้
                    </BtnClear>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">prize Name</h3>
                  <h5 className="card-title">ใช้ 10 แต้ม</h5>
                </div>
                <div className="card-footer text-end">
                  <div className="  text-end">
                    <BtnClear href="#" className="   btn  ">
                      สามารถแลกได้
                    </BtnClear>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
         
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

export default connect(mapStateToProps, mapDispatch)(WebPosRedeem);
