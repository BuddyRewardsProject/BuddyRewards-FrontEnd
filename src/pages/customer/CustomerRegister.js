import React, { Component } from "react";
import axios from "axios";
import logoKMUTT from "../../assets/img/kmutt.svg";
import logo from "../../assets/img/logoC.svg";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import $ from "jquery";
import message from "antd/lib/message/index";
import color from "../../config/color";
import liff from "@line/liff";
import "../../assets/css/CustomerSide/Customer.css";



const key = "updatable";
// const success = () => {
//   message.success({
//     content: '‏‏‎‏‏‎สำเร็จ',
//     duration: 3,
//     className: 'custom-class',
//     style: {
//       color: '#FB8549',
//       icon:'info',
//       fontSize: '15px',
//     },
//   });
// };
const ButtonSubmit = styled.button`


  color: rgb(255, 255, 255);
  height: 50px;
  color: white;
  background: linear-gradient(180deg, #F7931E 0%, #FF7676 100%);
  border-radius: 9px;
  font-size: "25px";
  &:hover {
    background-color: ${color.Button};
  }
`;

const HEADER = styled.text`
  font-size: 35px;
  color: #6b6b6b;
`;

class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      
    };
  }

  componentDidMount(){
    liff
    .init({
      liffId: "1656382933-9DzLvxlE",
    })
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login();
        console.log("fffffffffffffffff")
      }
    }
    )
  }
  handleClick(e) {
    e.preventDefault();
    var customerFirstName = $("#firstName").val();
    var customerLastName = $("#lastName").val();
    var customerNickName = $("#nickName").val();
    // var customerEmail = $("#email").val();
    // var customerPassword = $("#password").val();
    // var customerRepeatPassword = $("#repeatPassword").val();
    var customerPhone = $("#phone").val();
    var customerGender = $("#gender").val();
    var customerDOB = $("#dob").val();


    
    liff
      .init({
        liffId: "1656382933-9DzLvxlE",
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
          console.log("fffffffffffffffff")
        }

        const accessToken = liff.getAccessToken();
        console.log(accessToken);

        var data = {
          customerFirstName: customerFirstName,
          customerLastName: customerLastName,
          customerNickName: customerNickName,
          customerPhone: customerPhone,
          customerGender: customerGender,
          customerDOB: customerDOB,
          customerToken: accessToken,
        };
        
        axios
          .post("/customer/v1/register", {
            data,
          })
          .then((response) => {
            if (response.data.status === "success") {
              message.success({
                content: "สมัครสมาชิกเรียบร้อย!",
                style: {
                  fontSize: "20px",
                },
                duration: 3,
              });
              window.location.href = "/customer";
            } else {
              console.log(response.data)
              message.error({ content: "เกิดข้อผิดพลาด!", key, duration: 2 });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }


  
  // onRepeatPasswordInput(e) {
  //   var password = $("#password").val();
  //   if (!password || password.length === 0 || password === null) return false;
  //   if (password === e.target.value) {
  //     this.setState((prevState) => ({
  //       formValidation: {
  //         // object that we want to update
  //         ...prevState.formValidation, // keep all other key-value pairs
  //         repeatPassword: true,
  //         buttonState: "active", // update the value of specific key
  //       },
  //     }));
  //     $("#repeatPassword").removeClass("is-invalid");
  //     $("#repeatPassword").addClass("is-valid");
  //   } else {
  //     this.setState((prevState) => ({
  //       formValidation: {
  //         // object that we want to update
  //         ...prevState.formValidation, // keep all other key-value pairs
  //         repeatPassword: false,
  //         buttonState: "", // update the value of specific key
  //       },
  //     }));
  //     $("#repeatPassword").addClass("is-invalid");
  //     $("#repeatPassword").removeClass("is-valid");
  //   }
  // }
  /*
  componentDidMount = async () => {
    await window.liff.init({ liffId: "1656382933-9DzLvxlE" }).catch((err) => {
      alert(err);
    });
    if (window.liff.isLoggedIn()) {
      let user = await window.liff.getProfile();
      const accessToken = window.liff.getAccessToken();
      console.log(accessToken);
      this.setState({
        user: user,
      });
    } else {
      window.liff.login();
    }
  };
 */
  render() {
    return (
      <>
        <div className="container">
          <div className="row ">
            <div class="container">
              <div class="row row-cols-2">
                <div className="leftPD ">
                  <img src={logo} alt="buddyrewards" width="150" />
                </div>
                <div className="text-end paddingTop15">
                  <img src={logoKMUTT} alt="buddyrewards" width="120" />
                </div>
              </div>
            </div>
            <div className="text-center"></div>
            <HEADER className=" paddingTop15 ">สมัครสามาชิก</HEADER>
            {/* <div className="paddingTop15">
           
            </div> */}
            <div className="">
              <div className="text-left fromfontsize20">ชื่อเล่นของคุณ</div>
              <input
                type="text"
                name="nickname"
                id="nickName"
                className="form-control  fromRegisterfontsize"
                placeholder="ชื่อเล่นของคุณ"
                required
              ></input>
            </div>
            <div className="text-left fromfontsize20">ชื่อจริง</div>
            <div className="">
              <input
                type="text"
                name="firstname"
                id="firstName"
                className="form-control fromRegisterfontsize"
                placeholder="ชื่อจริง"
                required
              ></input>
            </div>
            <div className="text-left fromfontsize20">นามสุกล</div>
            <div className="">
              <input
                type="text"
                name="LastName"
                id="lastName"
                className="form-control fromRegisterfontsize"
                placeholder="นามสุกล"
                required
              ></input>
            </div>
            {/* <div className="text-left fromfontsize20">E-mail</div>
            <div className="">
              <input
                type="text"
                name="Email"
                id="email"
                className="form-control"
                placeholder="E-mail"
                required
              ></input>
            </div>

            <div className="text-left fromfontsize20">Password</div>
            <div className="">
              <input
                type="Password"
                name="Password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              ></input>
            </div>

            <div className="text-left fromfontsize20">Re Password</div>
            <div className="">
              <input
                type="Password"
                name="Password"
                id="repeatPassword"
                className="form-control"
                placeholder="Re-Password"
                onChange={(e) => this.onRepeatPasswordInput(e)}
                required
              ></input>
            </div> */}

            <div className="text-left fromfontsize20">เบอร์โทรศัพท์</div>
            <div className="">
              <input
                type="tel"
                name="Phone"
                id="phone"
                className="form-control fromRegisterfontsize"
                placeholder="เบอร์โทรศัพท์"
                required
              ></input>
            </div>
            <div className="text-left fromfontsize20">เพศ</div>
            <div>
              <select class="form-select fromRegisterfontsize" id="gender" required>
                <option selected>โปรดระบุเพศ</option>
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
                <option value="not define">ไม่ระบุ</option>
              </select>
            </div>
            <div className="text-left fromfontsize20">วัน เดือน ปีเกิด</div>
            <div>
              <input
                type="date"
                id="dob"
                className="form-control fromRegisterfontsize"
                min="1000-01-01"
                max="2019-12-31"
              ></input>
            </div>
            <div className="paddingTop15">
              <ButtonSubmit
                type="button"
                className="btnRegister"
                onClick={(e) => this.handleClick(e)}
    
              >
                ยืนยัน
              </ButtonSubmit>
            </div>
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

export default CustomerRegister;
