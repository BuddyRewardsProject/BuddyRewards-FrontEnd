import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import { Helmet } from "react-helmet";
import axios from "axios"
import message from 'antd/lib/message/index';
import $ from "jquery"

const key = 'updatable';

const BGCard = styled.div`
  background: #ffFFFF;
  box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.09);
  border-radius: 8px;
  
`;

const BtnEdit = styled.button`
  background-color: none;
  border-radius: 9px;
  font-size: 22px;
  border: 2px solid #f68e1a;
  color: #f68e1a;
  width: 100px;
  margin-right: 5px;
  &:hover {
    color: #ffff;

    background-color: #f68e1a;
  }
`;

const BtnAdd = styled.button`
background: ${color.Gradient};
height: 50px;
  border-radius: 99px;
  font-size: 25px;
  border: 0px solid #f68e1a;
  color: #ffff;
  width: 150px;
  margin: 15px;
  transition:ease-in-out 0.4s;
  &:hover {
    color: #ffff;
    width: 250px;
  }
`;

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

class Prize extends Component {
  constructor(props) {
    super(props);
    this.modal_announcement = null;
    this.modal = null;
    this.state = {
      prizeList: []
    }
  }
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  openModel(e) {
    e.preventDefault();
    this.modal_announcement = document.getElementById("add");
    this.modal = new window.bootstrap.Modal(this.modal_announcement);
    this.modal.show();
  }

  handleClick(e) {
    e.preventDefault();
    this.modal.hide();
    var prizeName = $('#prizeName').val()
    var prizeDetail = $('#prizeDetail').val()
    var prizePointCost = $('#prizePointCost').val()

    var data = {
      prizeName: prizeName,
      prizeDetail: prizeDetail,
      prizePointCost: prizePointCost,
      merchantId: this.props.auth.user.merchantId
    }

    axios.post('/merchant/v1/createPrize', {
      data
    })
      .then((response) => {
        if (response.data.status === "success") {
          message.success({ content: 'สำเร็จแล้ว!', key, duration: 2 });
          window.location.reload();
        } else {
          message.error({ content: 'เกิดข้อผิดพลาด!', key, duration: 2 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios.post('/merchant/v1/prizeInit', { merchantId: this.props.auth.user.merchantId })
      .then((response) => {
        console.log(response.data)
        this.setState({
          prizeList: response.data.prizeList
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  removePrize(prizeId) {
    axios.post('/merchant/v1/removePrize', {
      prizeId: prizeId
    })
      .then((response) => {
        if (response.data.status === "success") {
          message.success({ content: 'สำเร็จแล้ว!', key, duration: 2 });
          window.location.reload();
        } else {
          message.error({ content: 'เกิดข้อผิดพลาด!', key, duration: 2 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { collapsed } = this.state;
    document.body.style.backgroundColor = "#F5F6FA";
    return (
      <div>
        <div class="modal fade" id="add" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addStaffLabel">
                  Add Prize
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <contains>
                  <h3 className="text-center mt-3 mb-3">กรอกสิทธิพิเศษ</h3></contains>
                <div className="row g-3">
                  <div className="col-12 form-group mt-2">
                    <input type="text" name="prizeName" id="prizeName" className="form-control" placeholder="Prize Name" required></input>
                  </div>
                  <div className="col-12 form-group mt-2">
                    <input type="text" name="prizeDetail" id="prizeDetail" className="form-control" placeholder="Prize Detail" required></input>
                  </div>
                </div>
                <div className="col form-group mt-2">
                  <input
                    type="numeric"
                    inputMode="number"
                    id="prizePointCost"
                    className="form-control"
                    placeholder="Prize PointCost"
                    required
                  ></input>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                <button type="button" class="btn btn-primary" onClick={(e) => this.handleClick(e)}>บันทึกข้อมูล</button>
              </div>
            </div>
          </div>
        </div>
        <NavTopWebPOS />
        <Helmet>
          <title>จัดการรางวัล</title>
        </Helmet>
        <BgGradient>
          <div className="container">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                จัดการรางวัล
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <div className=" container">
        </div>
        <div className="container fade-in-image align-items-center  ">
          <BGCard>
            <div>
              <Link to="/merchant/branch/settings">
                <button type="button" class="btn-close" aria-label="Close"></button>
              </Link>
            </div>
            <div className="container fade-in-image align-items-center  text-center">
              <div class="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 g-3">
                <div class="cols-1 ">
                  {this.props.auth.user.masterAccount !== 0 &&
                    <BtnAdd href="#" className="btn" onClick={(e) => this.openModel(e)}>
                      สร้างรางวัล
                    </BtnAdd>
                  }
                  <div>
                    {this.state.prizeList != null && this.state.prizeList.map((p) =>
                      <div className="menuCard">
                        <div className="text-start">
                          <h3 className="" key={p.prize_name}>ชื่อสิทธิพิเศษ: {p.prize_name}</h3>
                          <h5 className=" " key={p.prize_detail}>รายละเอียด: {p.prize_detail}</h5>
                          <h5 className=" " key={p.prize_pointcost}>แต้มที่ใช้: {p.prize_pointcost} แต้ม</h5>
                        </div>
                        <div className=" text-start">
                          <div className="  text-start ">
                            <BtnEdit href="#" className="btn">
                              แก้ไข
                            </BtnEdit>
                            <BtnEdit href="#" className="btn" onClick={() => this.removePrize(p.prize_id)}>
                              ลบ
                            </BtnEdit>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="paddingTop15"></div>
              </div>
            </div>
          </BGCard>
        </div>
      </div>
    );
  }
}

const mapDispatch = { logoutPin };
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(Prize);
