import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import axios from "axios"
import { DatePicker } from "antd";
import moment from "moment";
import 'moment-timezone'
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { RangePicker } = DatePicker;

const BgGradient = styled.div`
  border-bottom-right-radius: 19px;
  border-bottom-left-radius: 19px;
  background: ${color.Gradient};
`;
const BtnOrange = styled.button`
  background-color: #FFFF;
  border: solid 2px;
  border-color: ${color.Button};
  font-size: 20px;
  height: 45px;
  width: 80px;
  border-radius: 8px;
  color: ${color.Button};
  padding: 5px;
`;
const BranchNameSize = styled.h2`
  font-size: 48px;
  font-style: bold;
  color: white;
`;

class pointHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointList: [],
      prizeList: []
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  getPrize() {
    axios.post('/merchant/v1/prizeInit', { merchantId: this.props.auth.user.merchantId })
      .then((response) => {
        this.setState({
          prizeList: response.data.prizeList
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios.post('/merchant/v1/pointHistory', { branchId: this.props.auth.user.branchId })
      .then((response) => {
        const results = response.data.pointList;
        axios.post('/merchant/v1/prizeInit', { merchantId: this.props.auth.user.merchantId })
          .then((res) => {
            for (let i = 0; i < results.length; i++) {
              for (let j = 0; j < res.data.prizeList.length; j++) {
                if (results[i].prize_id === res.data.prizeList[j].prize_id) {
                  results[i].prizeName = res.data.prizeList[j].prize_name
                }
              }
            }
            this.setState({
              pointList: results
            })
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
                Point History
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        {/* <div className=" container">
          <h2>Quick Look</h2>
        </div>
        <div className="container fade-in-image align-items-center  text-center">
          <div class="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-3">
            <div class="cols-2 ">
              <div className="menuCard">
                <h3 className="card-title mt-2 mb-2 text-start">
                  แต้มที่แจกวันนี้
                </h3>
                <h1 className="card-title mt-2 mb-2 text-end">100 แต้ม</h1>
              </div>
            </div>

            <div class="cols-2 ">
              <div className="menuCard">
                <h3 className="card-title mt-2 mb-2 text-start">
                  ยอดขายจากแต้มวันนี้
                </h3>
                <h1 className="card-title mt-2 mb-2 text-end">100 บาท</h1>
              </div>
            </div>
          </div>
        </div> */}
        <div className=" container">
          <div className="paddingTop15"></div>
          <h2>ประวัติการแจกแต้ม</h2>
        </div>
        <div className="container fade-in-image align-items-center  text-start">
          <div class=" ">
            <div class=" ">
              <div className="menuCard">
                <div class="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-3">
                  <div class="cols-2 text-start">
                    <Link to="/merchant/branch/dashboard">
                    <button type="button" class="btn-close DashXBackBtn" aria-label="Close"></button>
                    </Link>
                  </div>

                  <div class="cols-2 text-end ">
                    <BtnOrange>ส่งออก</BtnOrange>
                    
                    {/* <RangePicker
                      dateRender={(current) => {
                        const style = {};
                        if (current.date() === 1) {
                          style.border = "1px solid #F7931E";
                          style.borderRadius = "50%";
                        }
                        return (
                          <div className="ant-picker-cell-inner" style={style}>
                            {current.date()}
                          </div>
                        );
                      }}
                    /> */}
                  </div>
                </div>
                <table className="table fromfontsize20">
                  <thead>
                    <tr>
                      <th scope="col">วันที่</th>
                      <th scope="col">ชื่อจริง</th>
                      <th scope="col">ชื่อเล่น</th>
                      <th scope="col">point</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">ผู้ดำเนินการ</th>
                      <th scope="col">หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pointList != null && this.state.pointList.map((c) =>
                      <tr>
                        <td scope="row" key={c.time_stamp}>{moment(c.time_stamp).format('DD/MM/YYYY HH:mm')}</td>
                        <td key={c.first_name}>{c.first_name}</td>
                        <td key={c.nick_name}>{c.nick_name}</td>
                        <td key={c.point}>{c.point}</td>
                        <td key={c.point_status}>{c.point_status}</td>
                        <td key={c.staffFirstname}>{c.staffFirstname}</td>
                        <td key={c.prizeId}>{c.prizeName}</td>
                      </tr>
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

export default connect(mapStateToProps, mapDispatch)(pointHistory);
