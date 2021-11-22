import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import color from "../../config/color";
import "../../assets/css/CustomerSide/Customer.css";
import Navigation from "../../layouts/Navigation";
import styled from "styled-components";

import prize from "../../assets/img/icon/prize.svg";

import merchantLOGO from "../../assets/img/icon/merchantPreLoad.svg";
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
    };
  }
  
  componentDidMount() {
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
            <div className="cardDetialHeaderText">buddy cafe</div>
            <div className=" cardBGforDetial cardNamemiddleforDetial">คุณมี 5 แต้ม</div>
          </Card>
          
          <div className="text-center ">
                <button className="btnhistorymiddle">รายละเอียด</button>   
                </div>

        </BgBanner>

        <div className="container">
          <h1 className="margintop30">สิทธิประโยชน์ของคุณ</h1>
        <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src={prize}
                  alt="twbs"
                  width="70"
                  height="70"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">รับเครื่องดื่มฟรี 1 แก้ว</div>
                    
                  </div>
                  <div class="labelRedeemPoint justify-content-between d-flex align-items-center  d-flex ">
                  10 แต้ม
                  </div>
                </div>
              </div>
            </div></div>
      </>
    );
  }
}

export default CustomerCardDetail;
