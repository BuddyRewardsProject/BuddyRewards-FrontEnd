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
import liff from "@line/liff";
import jwt from 'jsonwebtoken'
// import { setCustomer } from "../../actions/customerAuthActions";
// import { bindActionCreators } from 'redux'


import { notification } from 'antd';


class CustomerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
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
        if (liff.getOS() === "web 🖥️") {
          message.open({ content: "web", duration: 8 });
        } else if (liff.getOS() === "ios") {
          message.open({ content: "สวัสดี 📱", duration: 2 });
        }
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

    axios
      .get("/home")
      .then((response) => {
        // handle success
        this.setState({
          merchantId: response.data.results.merchantId,
          merchantName: response.data.results.merchantName,
        });
        console.log(response.data[0]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
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
                    <div className="fontSizeMycardTitle">buddyCafe</div>
                  </div>
                  <div className="labelCurrentPoint justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1 ">
                  5<FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                  </div>
                  
                </div>
              </div>
            </div>
            </Link>

            

            
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
                    <div className="fontSizeMycardTitle">kenny hub</div>
                  </div>
                  <div className="labelCurrentPoint justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1 ">
                  1<FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                  </div>
                </div>
              </div>
            </div>
            </Link>

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
                    <div className="fontSizeMycardTitle">corgi tea</div>
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

export default CustomerCard;
