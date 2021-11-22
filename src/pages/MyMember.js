import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";

import { DatePicker } from "antd";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { RangePicker } = DatePicker;

const BtnBackMain = styled.button`
  background: ${color.Gradient};

  border-radius: 99px;
  font-size: 25px;
  border: 0px solid #f68e1a;
  color: #ffff;
  width: 250px;
  height: 50px;
  margin: 15px;
  transition: ease-in-out 0.4s;
  &:hover {
    color: #ffff;
    width: 300px;
  }
`;

const BtnOrange = styled.button`
  background-color: ${color.Button};
  border-style: none;
  font-size: 25px;
  border-radius: 99px;
  color: white;
  &:hover {
    background-color: ${color.ButtonOrange};
    color: white;
  }
`;

const BgGradient = styled.div`
  border-bottom-right-radius: 19px;
  border-bottom-left-radius: 19px;
  background: ${color.Gradient};
`;
const BgBox = styled.div`
  border-radius: 8px;
  background: ${color.Gradient};
`;
// const MarginTop = styled.div`
//   margin-top: 8%;
// `;
const BranchNameSize = styled.h2`
  font-size: 48px;
  font-style: bold;
  color: white;
`;

class MyMember extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
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
                  <div class="cols-2 text-start ">
                    <Link to="/merchant/branch/dashboard">
                      <h5>
                        <FontAwesomeIcon icon={faChevronLeft} /> ย้อนกลับ
                      </h5>
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
                    <tr>
                      <td scope="row">กรธวัช</td>
                      <td>สอดส่อง</td>
                      <td>เกล้า</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>11/11/2542</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td scope="row">ศุภฤกษ์</td>
                      <td>เริงมงคล</td>
                      <td>กอล์ฟ</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>15/01/2542</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td scope="row">กิตติวัฒน์</td>
                      <td>ลีนะธีรเวทย์</td>
                      <td>ภูมิ</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>26/01/2542</td>
                      <td>8</td>
                    </tr>

                    <tr>
                      <td scope="row">ธีรดนย์</td>
                      <td>จรูญชนม์</td>
                      <td>ไนล์</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>31/01/2542</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td scope="row">ธุวานนท์</td>
                      <td>ธัญญะวนิช</td>
                      <td>ท็อป</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>23/01/2542</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td scope="row">เตชิตธนโชติ</td>
                      <td>อามาตมนตรี </td>
                      <td>เอกกี้</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>15/01/2542</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td scope="row">นภันต์</td>
                      <td>กองกาย</td>
                      <td>ปรีน</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>14/01/2542</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td scope="row">กฤติเดช</td>
                      <td>ชัยประเสริฐ</td>
                      <td>ซัน</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>19/01/2542</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td scope="row">กฤติเดช</td>
                      <td>ชัยประเสริฐ</td>
                      <td>ซัน</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>17/01/2542</td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td scope="row">วรรณรัช</td>
                      <td>อมรรังสีกุล</td>
                      <td>มาย</td>
                      <td>0812345678</td>
                      <td>ชาย</td>
                      <td>12/01/2542</td>
                      <td>1</td>
                    </tr>
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
