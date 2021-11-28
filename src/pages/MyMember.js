import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import axios from "axios"
import moment from "moment";

const BgGradient = styled.div`
  border-bottom-right-radius: 19px;
  border-bottom-left-radius: 19px;
  background: ${color.Gradient};
`;

const BranchNameSize = styled.h2`
  font-size: 48px;
  font-style: bold;
  color: white;
`;

class MyMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: []
    }
  }
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  componentDidMount() {

    axios.post('/merchant/v1/myMember', { token: localStorage.getItem("branchToken") })
      .then((response) => {
        console.log(response.data)
        this.setState({
          customerList: response.data.customerList
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderGender(gender) {
    switch (gender) {
      case "Female":
        return "หญิง";
      case "Male":
        return "ชาย";
      case "not de":
        return "ไม่ระบุ";
    }
  }

  render() {
    return (
      <div>
        <NavTopWebPOS />
        <BgGradient>
          <div className="container">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                My Member
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <div className=" container">
          <div className="paddingTop15"></div>
          <h2>ลูกค้าทั้งหมดที่เป็นสมาชิก</h2>
        </div>
        <div className="container fade-in-image align-items-center  text-start">
          <div class=" g-3">
            <div class=" ">
              <div className="menuCard">
                <div class="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-3">
                  <div class="cols-2 text-start">
                    <Link to="/merchant/branch/dashboard">
                    <button type="button" class="btn-close DashXBackBtn" aria-label="Close"></button>
                    </Link>
                  </div>
                  <div class="cols-2 text-end">
                  </div>
                </div>
                <table className="table fromfontsize20 table-striped ">
                  <thead>
                    <tr>
                      <th scope="col">ชื่อจริง</th>
                      <th scope="col">นามสุกล</th>
                      <th scope="col">ชื่อเล่น</th>
                      <th scope="col">เบอร์โทรศัพท์</th>
                      <th scope="col">เพศ</th>
                      <th scope="col">วันเกิด</th>
                      <th scope="col">แต้มสะสม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customerList != null && this.state.customerList.map((c, index) =>
                      <>
                        {c.totalPoint > 0 &&
                          <tr key={index}>
                            <td scope="row" >{c.first_name}</td>
                            <td >{c.last_name}</td>
                            <td >{c.nick_name}</td>
                            <td >{c.phone}</td>
                            <td >{this.renderGender(c.gender)}</td>
                            <td >{moment(c.date_of_birth).format('DD/MM/YYYY')}</td>
                            <td >{c.totalPoint}</td>
                          </tr>
                        }
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = { logoutPin };
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(MyMember);
