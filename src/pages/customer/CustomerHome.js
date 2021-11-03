import React, { Component } from "react";
import axios from "axios";
import Navigation from "../../layouts/Navigation";
import { connect } from 'react-redux'
import { logoutCustomer } from '../../actions/customerAuthActions'
import liff from "@line/liff";
import NavTop from "../../layouts/NavTop";
import { Helmet } from "react-helmet";
import "../../assets/css/CustomerSide/Customer.css";



class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
      accessToken:null
    };
  }

  componentDidMount() {
    liff.init({
      liffId: '1656382933-9DzLvxlE', // Use own liffId
  })
      .then(() => {

        if (!liff.isLoggedIn()) {
          liff.login();
        }
        const accessToken = liff.getAccessToken();
        alert(accessToken);
        console.log(accessToken);
        this.setState({ accessToken: accessToken })
      })
      .catch((err) => {
          console.log(err);
      });

    document.getElementById("width").innerHTML =
      "Screen width is " + window.screen.width;
    document.getElementById("height").innerHTML =
      "Screen Height: " + window.screen.height;
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
        <NavTop className=""> </NavTop>
        <Helmet>
          <title>หน้าแรก</title>
        </Helmet>
        {/*  <Navbarmimige>
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            ></meta>
          </Helmet>
        </Navbarmimige>*/}
        <Navigation history={this.props.history}></Navigation>
        <div className="margintopforhome">
        <h1>{liff.getOS()}</h1>
        <h1>
          <p id="width"></p>
          {this.state.accessToken}


          
          <p id="height"></p>
        </h1>
        <h1>{liff.getLanguage()}</h1>
        <h1>{liff.getOS()}</h1>
        <h1>{liff.getOS()}</h1></div>
      </>
    );
  }
}

const mapDispatch = { logoutCustomer };
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatch)(CustomerHome)
