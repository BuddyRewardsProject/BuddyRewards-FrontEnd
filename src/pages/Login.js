import React, { Component } from "react";

import styled from "styled-components";
import color from "../config/color";
import logo from "../assets/img/logoM.svg";
import logoBW from "../assets/img/logoMBW.svg";
import { Link } from "react-router-dom";
import axios from "axios"
import $ from "jquery"
import sha512 from "js-sha512"
import message from 'antd/lib/message/index';
import { setUser } from "../actions/authActions";
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, ShopOutlined, LockOutlined   } from '@ant-design/icons';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const SECRET_KEY = '2aaf1e7d17a8d4706225480585767166cabd'


// const BtnOrange = styled.div`

// color: rgb(255, 255, 255);
// border: 0px;
// background: linear-gradient(180deg, #F7931E 0%, #FF7676 100%);
// font-size: 20px;
//   border-radius: 99px;
//   &:hover {
//     background-color: ${color.ButtonOrange};
//   }
// `;
const BgGreen = styled.div`
  height: 300px;
  background: ${color.Gradient};
  border-radius: 0px 0px 35px 35px;
`;


const MarginTop = styled.div`
  margin-top: 15%;
  @media (min-width: 320px) and (max-width: 768px) {
  margin-top: 50%;
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleClick(e) {
    e.preventDefault();
    var userNameInput = $('#userName').val()
    var passwordInput = $('#password').val()
    var hash = sha512.hmac.create(SECRET_KEY);
    hash.update(passwordInput);
    this.login(userNameInput, hash.hex())
  }

  login(userName, password) {
    axios.post('/merchant/v1/login', {
      userName: userName,
      hashPassword: password
    })
      .then((response) => {
        if (response.data.status === "error") 
        return message.error({
          content: response.data.errorMessage,
          style: {
            fontSize: '25px',
          },
          duration: 3,
        })
        , setTimeout(function(){
          window.location.href = "/merchant/login";
         
      },300);
        this.props.setUser(jwt.decode(response.data.accessToken)) 
        localStorage.setItem("branchToken", response.data.accessToken);
        window.location.href = '/merchant/login/pin';
      })
      .catch((error) => {
        console.log(error);
        console.log("hereeeeee")
      });
  }

  componentDidMount() {
    $(document).on('keypress', (e) => {
      if (e.which === 13) {
        var userNameInput = $('#userName').val()
        var passwordInput = $('#password').val()
        var hash = sha512.hmac.create(SECRET_KEY);
        hash.update(passwordInput);
        this.login(userNameInput, hash.hex())
      }
    });
    console.log(this.props)
    localStorage.removeItem("pinToken");
  }

  render() {
    return (
      <BgGreen>
        <div className="container">
          <div className="position-absolute overlap-box row align-items-center">
            <div className="col-lg-3 col-md-2"></div>
            <MarginTop className="col bg-white shadow p-3 mb-5 bg-body rounded-10">
              <div>
                <div>
                  {" "}
                  <Link className="body" to="/">
                    <img src={logo} alt="buddyrewards" width="200" />
                  </Link>
                </div>
                <div className="text-left fontSize25 mt-3 DbBold">??????????????????????????????????????????????????????</div>
                <div className="col form-group ">
                  
                  <div>
                   
                    <Input 
      placeholder="????????????????????????????????????????????????"
      autocapitalize="off"
      id="userName"
      className="ant-input-lg"
      
      size="large"
      style={{ borderRadius: '5px',fontSize:"20px" }}
      prefix={<ShopOutlined  style={{ color: 'rgba(0,0,0,.45)' }} className="site-form-item-icon" />}
      suffix={
        <Tooltip title="??????????????????????????????????????????????????? ????????????????????????????????????????????????">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
                  </div>
                </div>
                <div className="col form-group mt-2 ">
                  
                  <div>
                    <Input.Password
                      type="password"
                      name="Password"
                      id="password"
                      size="large"
                      className="ant-input-lg"
                      style={{ borderRadius: '5px',fontSize:'20px' }}
                      placeholder="????????????????????????"
                      required
                      prefix={<LockOutlined  style={{ color: 'rgba(0,0,0,.45)' }} className="site-form-item-icon" />}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                  </div>
                </div>
                <div className="col text-center form-group mt-2  ">
                <button class="btn btnindexPrimary btn-md mgL5" type="button" onClick={(e) => this.handleClick(e)}>?????????????????????????????????</button>
                  
                </div>
              </div>
            </MarginTop>
            <div className="col-lg-3 col-md-2"></div>
            <Link className="body" to="/merchant/register">
              <h5 className="text-center ">
                ???????????????????????????????????????????????????????????????????????? ????????????????????????! ????????????
              </h5>
              
            </Link>
          </div>
        </div>
        <footer class="position-absolute bottom-0 start-50 translate-middle-x "> <div><img src={logoBW} alt="buddyrewards" width="130" /></div>
                  
                   </footer>
                   
      </BgGreen>
      
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch)
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)