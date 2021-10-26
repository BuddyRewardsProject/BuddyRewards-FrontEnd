import React, { Component } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";
import liff from "@line/liff";
import styled from "styled-components";
import color from "../config/color";

const BgBox = styled.div`
  height: 300px;
  
  border-radius: 8px;
`;
const SgBox = styled.div`
  margin-top: 10px;
  
  background: ${color.Grey};
  border-radius: 8px;
`;


class Home2 extends Component {
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
        <div class="container">
        <div class="row BoxPADhm ">
    <BgBox>
      
      <h1>buddyRewards</h1>
    </BgBox>
   
  </div>
        <div class="row maG4">
          
    <div class="col-sm BoxSghome">
      <h1>customer</h1>
      <Link to="/customer/register">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-outline rounded-all btnOrg"
                  >
                    customerRegister
                  </button>
                </div>
              </Link>
              <Link to="/customer/home">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-outline rounded-all btnOrg"
                  >
                    customerHome
                  </button>
                </div>
              </Link>
      <Link to="/customer/mycard">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-outline rounded-all btnOrg"
                  >
                    my card
                  </button>
                </div>
              </Link>
    </div>
    <div class="col-sm BoxSghome">
    <h1>merchant</h1>
    <Link to="/merchant/login">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-outline rounded-all btnOrg"
                  >
                    Login
                  </button>
                </div>
              </Link>
              <Link to="/merchant/register">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    type="button"
                    className="btn btn-outline rounded-all btnOrg"
                  >
                    register
                  </button>
                </div>
              </Link>
    </div>
  </div>
 
</div>
      </>
    );
  }
}

export default Home2;
