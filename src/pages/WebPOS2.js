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
const BtnRedeem = styled.button`
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
        {/* <MarginTop></MarginTop> */}

        <Card className="text-center">

           <Cardinfo>
           <img
              src={profile}
              class="img-fluid paddingBarCodeIcon"
              alt="barcodeScan"
              width="99px"
            />
            <div className="cardInfoWebPOS1">คุณ {this.props.location.state.customer.customerNickName} #{this.props.location.state.customer.customerId}</div>
            <div className="cardInfoWebPOS2">วันเกิด {this.props.location.state.customer.customerDOB}. </div>
            <div className="cardInfoWebPOS3">เบอร์ติดต่อ {this.props.location.state.customer.customerPhone}</div>
          </Cardinfo>
         
          <div className="HeaderWebPOS">ระบุบยอดชำระ</div>
          
          <div className="outterInputPrice">
            <input type="numeric"
                        inputMode="number"  pattern="[0-9]*" type="text"  className="inPutWidth2 inputFontSize DbBold" id="price"></input></div>
          <div className="paddingBtm"><BtnClear onClick={() => goBack()}>ย้อนกลับ</BtnClear></div>
          <div className="paddingBtm"><BtnOK onClick={(e) => this.calculate(e)} >ถัดไป</BtnOK></div>
         
         
          <div className="HeaderWebPOS text-start">รางวัลที่คุณ {this.props.location.state.customer.customerNickName} {this.props.location.state.point}แลกได้</div>
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
                    <BtnRedeem href="#" className="   btn  ">
                      สามารถแลกได้
                    </BtnRedeem>
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
                    <BtnRedeem href="#" className="   btn  ">
                      ไม่พร้อม
                    </BtnRedeem>
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
                    <BtnRedeem href="#" className="   btn  ">
                      สามารถแลกได้
                    </BtnRedeem>
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

export default connect(mapStateToProps, mapDispatch)(WebPOS2);
