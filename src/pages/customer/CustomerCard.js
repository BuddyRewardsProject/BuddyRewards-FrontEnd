import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import NavTopMyCard from "../../layouts/NavTopMyCard";
import "../../assets/css/CustomerSide/Customer.css";
import Navigation from "../../layouts/Navigation";
import Mlogo from "../../assets/img/icon/merchantPreLoad.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParking, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import message from "antd/lib/message/index";
import { ArrowDownOutlined } from "@ant-design/icons";

import liff from "@line/liff";
import jwt from 'jsonwebtoken'
// redux ต้องมีทุกหน้าใน liff
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCustomer } from "../../actions/customerAuthActions";
// import { setCustomer } from "../../actions/customerAuthActions";
// import { bindActionCreators } from 'redux'


import { notification } from 'antd';


class CustomerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      merchantList: []
      
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
        liff.getProfile()
.then(profile => {
  const pictureUrl = profile.pictureUrl
  
  console.log(pictureUrl);
  this.setState({ pictureUrl: pictureUrl });


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
    .post("/customer/v1/merchantdata",{customerId : this.props.customerAuth.customer.customerId})
    
    .then((response) => {
      // handle success
     
      console.log(response.data ,"what that <<<<<<<<<");
     
      // merchantList: response.data.merchantInfo

      
      this.setState({
        merchantList: response.data.merchantInfo
      })
      console.log(this.state.merchantList ,"<<<<< that <<<<<<<<<");
  
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
   
        axios
          .post("/customer/v1/liff", {
            accessToken: accessToken,
          })
          .then((response) => {
          //   setTimeout(function(){
          //     message.success({ content: "done line",style: {
          //       fontSize: '20px',
          //     }, duration: 3 });
          // },300)
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

    // axios
    //   .get("/home")
    //   .then((response) => {
    //     // handle success
    //     this.setState({
    //       merchantId: response.data.results.merchantId,
    //       merchantName: response.data.results.merchantName,
    //     });
    //     console.log(response.data[0]+ "what that <<<<<<<<<");
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(() => {
    //     // always executed
    //   });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>บัตรของคุณ</title>
        </Helmet>
        <NavTopMyCard></NavTopMyCard>
        <Navigation history={this.props.history}></Navigation>
        <div className="container ">
          <div className="margintopforcard">
          {this.state.merchantList.length != 0 && this.state.merchantList.map((merchant,index) =>
                    
            <Link key={index} to={`/customer/mycard/detail/${merchant.merchantId}`}>
          <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src={Mlogo}
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div className=" w-100 justify-content-between d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="fontSizeMycardTitle">{merchant.merchantName}</div>
                  </div>
                  <div className="labelCurrentPoint justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1 ">
                  {merchant.TotalPoint}<FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                  </div>
                  
                </div>
              </div>
            </div>
            </Link>
           
                    )}
{this.state.merchantList.length === 0 && 
<div>

<div className="text-center fontSize20"> คุณพร้อมสะสมแต้มแล้ว คลิกปุ่มสะสมแต้มด้านล่างได้เลย </div>
<div className="text-center fontSize20"> <ArrowDownOutlined/> </div>


</div>
}
            {/* {this.state.merchantList.length != 0 && this.state.merchantList.map((merchant,index) =>
                    <>
                       
                      <tr key={index}>
                        <td scope="row" >{merchant.merchantId}</td>
                        <td >{merchant.merchantName}</td>
                        <td >{merchant.TotalPoint}</td>

                      </tr>
                      
                      </>
                    )} */}

            
            <Link  to="/customer/mycard/detail">
            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src={Mlogo}
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div className=" w-100 justify-content-between d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="fontSizeMycardTitle">ตัวอย่าง</div>
                  </div>
                  <div className="labelCurrentPoint justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1 ">
                  1<FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                  </div>
                </div>
              </div>
            </div>
            </Link>

            

            <div className="paddingTop15"></div>
            
            {/* <button
                type="button"
                className="  btnEditProfile"
                onClick={() =>  liff.closeWindow()}
              >
                กลับไปยังไลน์
              </button>

              <div className="paddingTop15"></div>
            
            <button
                type="button"
                className="  btnEditProfile"
                onClick={() => liff.shareTargetPicker(
                  [
                    {
                      type: "text",
                      text: "Hello, World!",
                    },
                  ],
                  {
                    isMultiple: true,
                  }
                )}
              >
             
              </button> */}

              

            
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
            <div className="paddingTop15"></div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCard);
