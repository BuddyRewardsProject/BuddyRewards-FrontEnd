import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopWebPOS";
import "../assets/css/merchantSide/webPOS.css";

import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import profile from "../assets/img/icon/profileD.svg";
import {
  faArrowAltCircleRight, faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"
import message from 'antd/lib/message/index';
import $ from "jquery"

const key = 'updatable';

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
`

const BtnClear = styled.button`
  background-color: #eaeaea;
  width: 129px;

  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: #5f5f5f;
 
`
const BtnOK = styled.button`
  background-color: #59DD9A;
  height: 50px;
  width: 290px;
  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: white;
 
`
const MarginTop = styled.div`
  margin: 130px;
`

const Card = styled.div`
  background: #f7f7f7;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.10);
  border-radius: 12px;
  margin: 15px;
  padding-top: 15px;
`;

const Cardinfo = styled.div`
  background: #ffffff;
  
  border-radius: 12px;
  margin-left: 15px;
  margin-right: 15px;
`;

class WebPOS3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPoint: null
    }
  }

  componentDidMount() {
    var data = {
      customerId: this.props.location.state.customer.customerId,
      merchantId: this.props.auth.user.merchantId
    }
    axios.post('/merchant/v1/totalPoint', {
      data
    })
      .then((response) => {
        if (response.data.status === "success") {
          this.setState({
            totalPoint: response.data.customerPoint + this.props.location.state.point
          })
          message.success({
            content: "คำนวญแต้มเรียบร้อย",
            style: {
              fontSize: '25px',
            },
            duration: 3,
          })

        } else {
          message.error({
            content: "เกิดข้อผิดพลาด",
            style: {
              fontSize: '25px',
            },
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addPoint() {
    var data = {
      point: this.props.location.state.point,
      branchId: this.props.auth.user.branchId,
      customerId: this.props.location.state.customer.customerId,
      staffId: this.props.pinAuth.staff.staffId,
      merchantId: this.props.auth.user.merchantId
    }
    axios.post('/merchant/v1/addPoint', {
      data
    })
      .then((response) => {
        if (response.data.status === "success") {
          message.success({ content: 'สะสมสำเร็จแล้ว!นะจ้ะ', key, duration: 2 });
          this.props.history.push({
            pathname: '/merchant/branch/webPOS/done',
            state: { 
              customer: this.props.location.state.customer,
              point: response.data.resultPoint
            }
          })
        //    setTimeout(function(){
        //     window.location.href = "/merchant/branch/webPOS/done";
           
        // },300);
        } else {
          message.error({ content: 'เกิดข้อผิดพลาด!', key, duration: 2 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  render() {
    function goBack() {
      window.history.back();
    }
    document.body.style.backgroundColor = "#F5F6FA";
    return (
      <div>
        <NavTopWebPOS></NavTopWebPOS>
        {/* <MarginTop></MarginTop> */}

        <Card className="text-center">

          <Cardinfo>
          <div className="paddingTop15"></div>
           <img
              src={this.props.location.state.customer.pictureUrl}
              class="  rounded-circle fade-in-image"
              alt="barcodeScan"
              width="80px"
            />
            <div className="cardInfoWebPOS1">คุณ {this.props.location.state.customer.customerNickName} {this.props.location.state.customer.customerFirstName} {this.props.location.state.customer.customerLastName}</div>
            <div className="cardInfoWebPOS2">วันเกิด {this.props.location.state.customer.customerDOB} </div>
            <div className="cardInfoWebPOS3">เบอร์ติดต่อ {this.props.location.state.customer.customerPhone}</div>
          </Cardinfo>

          <div className="HeaderWebPOS">ตรวจสอบข้อมูล</div>
          <div class="row row-cols-3">
            <div class="col textPointWebPOS">{this.props.location.state.point} <FontAwesomeIcon className="WebPosStarIconSize" icon={faStar} />  </div>
            <div class="col WebPosIconSize">  <FontAwesomeIcon icon={faArrowAltCircleRight} />
              <FontAwesomeIcon icon={['fas', 'home']} /></div>
            <div class="col textPointWebPOS">{this.state.totalPoint} <FontAwesomeIcon className="WebPosStarIconSize" icon={faStar} /></div>
          </div>

          <div className="paddingBtm"><BtnClear onClick={() => goBack()} >ย้อนกลับ</BtnClear></div>
          <div className="paddingBtm"><BtnOK onClick={() => this.addPoint()}>ยืนยันเพิ่มแต้ม</BtnOK></div>

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

export default connect(mapStateToProps, mapDispatch)(WebPOS3);
