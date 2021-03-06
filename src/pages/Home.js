import React, { Component } from "react";
import axios from "axios";
import NavbarNew from "../layouts/NavbarNew";
import { Link } from "react-router-dom";

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
        <NavbarNew />
        
        <div className="container py-4 paddingBottom15">
          
        <div className="h-100 p-5 boxindexPR ">
        <h1 className="display-5 fw-bold ">ยินดีต้อนรับ buddyRewards</h1>
          <p className=" fontSizePin">เป็นระบบที่จะมาแก้ไขปัญหาการสะสมแต้มในรูปแบบต่างๆ ได้ เช่น ในฝั่งของลูกค้า 
          ลูกค้านั้นไม่จำเป็นต้องพกพาบัตรสะสมแต้มหรือบัตรสมาชิก 
          หรือแม้แต่การเสียเวลาโดยใช่เหตุที่ต้องหาบัตรสะสมแต้ม และในส่วนของร้านค้า 
          ระบบนี้จะไปช่วยเพิ่มการรักษาฐานลูกค้าและจะเป็นเครื่องมือที่เป็นประโยชน์ต่อการตัดสินใจทั้งในการมอบสิทธิพิเศษกับลูกค้า
           หรือแม้แต่การลดต้นทุนในสิ่งที่ไม่จำเป็น</p>
          

        
    </div>
    <div className="row align-items-md-stretch">
      <div className="col-md-6 paddingTop15 ">
        <div className="h-100 p-5 boxindex1 mx-auto ">
          <h1>ลูกค้า</h1>
          <Link to="/customer/register">
          <button className="btn btnHomePrimary btn-md" type="button">ลงทะเบียน</button>
          </Link>
          <Link to="/customer">
          <button className="btn btnHomePrimary btn-md mgL5" type="button">เข้าสู่ระบบ</button>
          </Link>
        </div>
      </div>
      <div className="col-md-6 paddingTop15 ">
      <div className="h-100 p-5 boxindex2 ">
        <h1>ร้านค้า</h1>
        <Link to="/merchant/register">
          <button className="btn btnHomePrimary btn-md" type="button">ลงทะเบียน</button>
          </Link>
          <Link to="/merchant/login">
          <button className="btn btnHomePrimary btn-md mgL5" type="button">เข้าสู่ระบบ</button>
          </Link>
        </div>
      </div>
    </div>
    <div className="paddingTop15"></div>
           <h4>ร้านที่ใช้บริการของเรา</h4>
    <marquee>
    
     <img src="https://media.discordapp.net/attachments/493061190113820672/914214979928985620/Group_453.png" width="250" ></img>
     <img src="https://media.discordapp.net/attachments/493061190113820672/914214980168073276/Group_454.png" width="250"  ></img>
     <img src="https://media.discordapp.net/attachments/493061190113820672/914214980365209620/Group_455.png"  width="250" ></img>
     <img src="https://media.discordapp.net/attachments/493061190113820672/914214980600098826/Group_450.png"  width="250" ></img>
     <img src="https://media.discordapp.net/attachments/493061190113820672/914214980839153714/Group_451.png"  width="250" ></img>
     <img src="https://media.discordapp.net/attachments/493061190113820672/914214981095014450/Group_452.png"  width="250" ></img>
            <div className="paddingTop15"></div>

    </marquee>
</div>
      </>
    );
  }
}

export default Home;
