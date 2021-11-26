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
import { Result} from 'antd';
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  height: 50px;
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
const antIcon = <LoadingOutlined style={{ fontSize: '60px', color: '#ff7676' }} spin />;
class WebPosDone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPoint: null,
    };
  }
// defalut

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
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
            totalPoint: response.data.customerPoint
            
          })
console.log(this.state.totalPoint)
          message.success({ content: 'คำนวณแล้วจ้ะ', key, duration: 2 });

        } else {
          message.error({ content: 'เกิดข้อผิดพลาด!', key, duration: 2 });
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
      

        <Card>
          <Cardinfo className="text-center">

          <Result status="success"/>
            <h1 className="DBB">เพิ่มแต้มสำเร็จแล้ว!👌</h1>
            
            <div className="paddingTop15"></div>
            {this.state.totalPoint === null ? <Spin  indicator={antIcon} /> : <div className="cardInfoWebPOS1">คุณ {this.props.location.state.customer.customerNickName} มีแต้มทั้งหมดอยู่ {this.state.totalPoint} แต้ม</div> }
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
           
          </Cardinfo>
          <div className="paddingTop15"></div>
          <div className="paddingTop15"></div>
          <h5 className="text-center">เคล็ดลับ✨ บอกชื่อลูกค้าและจำนวนแต้มคงเหลือเพื่อให้ลูกค้าทราบ</h5>
          
          <div className="paddingBtm text-center">
            
          

         
          </div>
          <div className="paddingBtm text-center">
          <Link to="/merchant/branch/webPOS">
            <BtnOK > ไปยังหน้าแรก webPOS</BtnOK>
            </Link>
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

export default connect(mapStateToProps, mapDispatch)(WebPosDone);
