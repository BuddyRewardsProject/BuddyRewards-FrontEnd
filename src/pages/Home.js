import React, { Component } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";
import liff from "@line/liff";
import styled from "styled-components";
import color from "../config/color";

const BgBox = styled.div`
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;
const SgBox = styled.div`
  margin-top: 10px;
  
  background: ${color.Grey};
  border-radius: 8px;
`;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
      user: {},
    };
  }

  componentDidMount() {
    console.log(this.props.user);
    <meta name="theme-color" content="#ecd96f"></meta>

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
        <Navbar></Navbar>
        <div class="container py-4 paddingBottom15">
          
        <div class="h-100 p-5 boxindexPR ">
        <h1 class="display-5 fw-bold">ยินดีต้อนรับ buddyRewards</h1>
          <p>รวมบัตรสะสมแต้มไว้ในที่เดียว</p>
          <p>พร้อมรับสิทธิ์ประโยชน์จาก ร้านค้า partner ของเรา</p>
          <button class="btn btnindexPrimary btn-md" type="button">เกี่ยวกับเรา</button>
        
    </div>
    <div class="row align-items-md-stretch">
      <div class="col-md-6 paddingTop15 ">
        <div class="h-100 p-5 boxindex1 mx-auto ">
          <h1>สำหรับลูกค้า</h1>
          <Link to="/customer/register">
          <button class="btn btnindexPrimary btn-md" type="button">ลงทะเบียน</button>
          </Link>
          <Link to="/customer/login">
          <button class="btn btnindexPrimary btn-md mgL5" type="button">เข้าสู่ระบบ</button>
          </Link>
        </div>
      </div>
      <div class="col-md-6 paddingTop15 ">
      <div class="h-100 p-5 boxindex2 ">
        <h1>สำหรับร้านค้า</h1>
        <Link to="/merchant/register">
          <button class="btn btnindexPrimary btn-md" type="button">ลงทะเบียน</button>
          </Link>
          <Link to="/merchant/login">
          <button class="btn btnindexPrimary btn-md mgL5" type="button">เข้าสู่ระบบ</button>
          </Link>
        </div>
      </div>
    </div>
</div>
      </>
    );
  }
}

export default Home;
