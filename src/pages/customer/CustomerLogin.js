import React, { Component } from "react";
import axios from "axios";
import logoKMUTT from "../../assets/img/kmutt.svg";
import logo from "../../assets/img/logoC.svg";
import $ from "jquery";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import message from 'antd/lib/message/index';
import sha512 from "js-sha512"
import { setCustomer } from "../../actions/customerAuthActions";
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const SECRET_KEY = '2aaf1e7d17a8d4706225480585767166cabd'

const HEADER = styled.text`
font-size: 35px;
color:#6B6B6B;

`;

class CustomerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(e) {
    e.preventDefault();
    var email = $('#customerEmail').val()
    var passwordInput = $('#password').val()
    var hash = sha512.hmac.create(SECRET_KEY);
    hash.update(passwordInput);
    this.login(email, hash.hex())
  }

  login(email, password) {
    axios.post('/customer/v1/login', {
      email: email,
      hashpassword: password
    })
      .then((response) => {
        if (response.data.status === "error") return message.error(response.data.errorMessage);
        this.props.setCustomer(jwt.decode(response.data.customerToken)) 
        localStorage.setItem("customerToken", response.data.customerToken);
        window.location.href = '/customer/home';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    $(document).on('keypress', (e) => {
      if (e.which === 13) {
        var email = $('#customerEmail').val()
        var passwordInput = $('#password').val()
        var hash = sha512.hmac.create(SECRET_KEY);
        hash.update(passwordInput);
        this.login(email, hash.hex())
      }
    });
    console.log(this.props)
  }

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
            <HEADER className=" paddingTop15 ">เข้าสู่ระบบ</HEADER>

            <div className="">
              <div className="text-left fromfontsize20">username</div>
              <input
                type="text"
                name="Email"
                id="customerEmail"
                className="form-control  fromfontsize15"
                placeholder="Email"
                required
              ></input>
            </div>

            <div className="text-left fromfontsize20">Password</div>
            <div className="">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              ></input>
            </div>

            <div className="paddingTop15">
              <button type="button" className="  btnQRBack"
               onClick={(e) => this.handleClick(e)}>
                login
              </button>
              
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCustomer }, dispatch)
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);
