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
import jwt from 'jsonwebtoken'
// redux ต้องมีทุกหน้าใน liff
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import message from "antd/lib/message/index";
import merchantLOGO from "../../assets/img/icon/merchantPreLoad.svg";
import { Alert } from "antd";
const BgBanner = styled.div`
  height: 300px;
  background: ${color.Gradient};
  border-radius: 0px 0px 25px 25px;
`;
const Card = styled.div`

`;

class CustomerCardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
      prizeInfoList: [],
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
        liff.getProfile()
.then(profile => {
  const pictureUrl = profile.pictureUrl
  
  //console.log(pictureUrl);
  this.setState({ pictureUrl: pictureUrl });

  axios
  .post("/customer/v1/merchantDetail",{merchantId : this.props.match.params.merchantId, customerId : this.props.customerAuth.customer.customerId})
  
  .then((response) => {
    // handle success
   

    this.setState({
      merchantName: response.data.merchantInfo.merchantName,
      TotalPoint: response.data.merchantInfo.TotalPoint,
      
    })
    

    this.setState({
      prizeInfoList: response.data.prizeInfo
    })
    console.log(this.state.prizeInfoList ,"<<<<< that <<<<<<<<<");
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
  console.log('error', err);
});


        console.log(accessToken);
        this.setState({ accessToken: accessToken });
        if (liff.getOS() === "android") {
          message.success({ content: "สวัสดีชาว android", duration: 8 });
        } else if (liff.getOS() === "ios") {
          message.success({ content: "สวัสดีชาว ios",style: {
            fontSize: '20px',
          }, duration: 3 });
        }
        console.log(this.props.customerAuth.customer.customerId)
        console.log('================================ios=================================================')

  
   
        axios
          .post("/customer/v1/liff", {
            accessToken: accessToken,
          })
          .then((response) => {
      
            console.log(response.data);
            if (response.data.status === "error") {
              window.location.href = response.data.redirect;
              return;
            }else{
              this.props.setCustomer(jwt.decode(response.data.customerToken)) 
              localStorage.setItem("customerToken", response.data.customerToken);
               
        
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
            <div className="cardDetialHeaderText">{this.state.merchantName}</div>
            <div className=" cardBGforDetial cardNamemiddleforDetial">คุณมี {this.state.TotalPoint} แต้ม</div>
          </Card>
        
          <div className="text-center ">
                <button className="btnhistorymiddle">รายละเอียด</button>   
                </div>
               
        </BgBanner>
        <div>
        <div>
     
    </div>
    </div>
        <div className="container">
          <h1 className="margintop30">สิทธิประโยชน์ของคุณ</h1>
          {this.state.prizeInfoList.length != 0 && this.state.prizeInfoList.map((prizeInfo,index) =>
            <Link to={`/customer/mycard/detail/${prizeInfo.prize_id}and${prizeInfo.merchant_id}`} >
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
                    <div class="fontSizeMycardTitle">{prizeInfo.prize_name}</div>
                    
                  </div>
                  <div class="labelRedeemPoint justify-content-between d-flex align-items-center  d-flex ">
                  {prizeInfo.prize_pointcost}
                  </div>
                </div>
              </div>
            </div>
            </Link>
            )}
            
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
