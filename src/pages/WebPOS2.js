import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopWebPOS";
import "../assets/css/merchantSide/webPOS.css";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import profile from "../assets/img/icon/profileD.svg";
import axios from "axios"
import message from 'antd/lib/message/index';
import $ from "jquery"

const key = 'updatable';

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
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.25);
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



class WebPOS2 extends Component {
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
    var price = $('#price').val()

    var data = {
      merchantId: this.props.auth.user.merchantId,
      price: price
    }
    axios.post('/merchant/v1/calculate', {
      data
    })
      .then((response) => {
        if (response.data.status === "success") {
          this.props.history.push({
            pathname: '/merchant/branch/WebPOS3',
            state: { 
              customer: this.props.location.state.customer,
              point: response.data.resultPoint
            }
          })
          message.success({ content: 'สำเร็จแล้ว!', key, duration: 2 });
          
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
        <MarginTop></MarginTop>

        <Card className="text-center">

           <Cardinfo>
           <img
              src={profile}
              class="img-fluid paddingBarCodeIcon"
              alt="barcodeScan"
              width="99px"
            />
            <div className="cardInfoWebPOS1">คุณ {this.props.location.state.customer.customerNickName} #{this.props.location.state.customer.customerId}</div>
            <div className="cardInfoWebPOS2">วันเกิด {this.props.location.state.customer.customerDOB} </div>
            <div className="cardInfoWebPOS3">เบอร์ติดต่อ {this.props.location.state.customer.customerPhone}</div>
          </Cardinfo>
         
          <div className="HeaderWebPOS">ระบุบยอดชำระ</div>
          
          <div className="outterInputPrice"><input className="inPutWidth2 inputFontSize DbBold" id="price"></input></div>
          <div className="paddingBtm"><BtnClear onClick={() => goBack()}>ย้อนกลับ</BtnClear></div>
          <div className="paddingBtm"><BtnOK onClick={(e) => this.calculate(e)} >ถัดไป</BtnOK></div>
          
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
