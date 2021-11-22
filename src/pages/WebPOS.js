import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopWebPOS";
import "../assets/css/merchantSide/webPOS.css";
import axios from "axios"
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import message from 'antd/lib/message/index';
import barcodeScan from "../assets/img/icon/barcodeScan.png";
import { ScanOutlined,MobileOutlined  } from "@ant-design/icons";
// import { $CombinedState } from "redux";
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
  width: 199px;

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
  box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.09);
  border-radius: 12px;
  margin: 15px;
`;




class WebPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer:{}
    }
  }
  handleClick(e) {
    e.preventDefault();
  
    this.props.logoutPin();
    
    window.location.href = "/merchant/login/pin";
  }

  // handleReset(r) {
  //   r.preventDefault();
  //   setReset("");
  
  // }

  
  sendCustomerID(b){ 
    //console.log(b,"fffffff")
    b.preventDefault();
    
    var customerId = $('#customerIDD').val()
   
    var data = {
      customerId: customerId,
    }
    axios.post('/merchant/v1/branch/webpos/customerInfo', {
      data
    })
      .then((response) => {
        console.log("ข้อมูลอยู่ข้างล่างจ้าา");
        console.log(response.data.customerInfo);
        this.setState({ 
          customer: response.data.customerInfo
        })
        if (response.data.customerInfo != undefined){
          this.props.history.push({
            pathname: '/merchant/branch/webPOS2',
            state: { customer: response.data.customerInfo }
          })

}else{
  console.log("not found naja")
  message.open({ content: 'ไม่พบข้อมูล โปรดลองใหม่อีกครั้ง', key, duration: 3 });
  setTimeout(function(){
    window.location.href = "/merchant/branch/webPOS";
   
},1000);
  
}
      
      })
      .catch((error) => {
        console.log("ไม่พบข้อมูลจ้าาาา");
        console.log(error);
      });
  
  }
  componentDidMount() {
    $('#customerIDD').focus()
  }

  render() {
    document.body.style.backgroundColor = "#F5F6FA";
    return (
      <div>
        <NavTopWebPOS></NavTopWebPOS>
        {/* <MarginTop></MarginTop> */}

        <Card className="text-center">
          <div>
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
          <ScanOutlined style={{ fontSize: '140px', color: '#F7931E' }} />
          <MobileOutlined style={{ fontSize: '140px', color: '#F7931E' }}  />
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
          <div className="paddingTop15"/>
            {/* <img
              src={barcodeScan}
              class="img-fluid paddingBarCodeIcon"
              alt="barcodeScan"
              width="450px"
            /> */}
          </div>
          <div className="HeaderWebPOS">สแกนรหัสจาก QR ลูกค้า</div>
          <h3> ลงชื่อเข้าใช้ {this.props.pinAuth.staff.firstName}</h3>
          <h5> #{this.props.pinAuth.staff.staffId}</h5>
          <div className="outterInput"><form id="myForm"><input className="inPutWidth inputFontSize DbBold" id="customerIDD"  onChange={event => {this.setState({query: event.target.value})}}
    onKeyPress={event => {
                if (event.key === 'Enter') {
                 console.log("enter แล้ววว")
                 this.sendCustomerID(event)
                }
              }}
              ></input>
              </form>
              </div>
              

              
              
         
          <div className="paddingBtm"><BtnOK onClick={(b) => this.sendCustomerID(b)} >ตกลง</BtnOK></div>
          
          <h2>{this.state.customer && this.state.customer.customerNickName}</h2>
          <h2>{this.state.customer && this.state.customer.customerFirstName}</h2>
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

export default connect(mapStateToProps, mapDispatch)(WebPOS);
