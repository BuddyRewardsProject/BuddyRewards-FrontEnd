import React, { Component } from "react";
import styled from "styled-components";
import color from "../config/color";
import NavTopWebPOS from "../layouts/NavTopMerchant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutPin } from "../actions/pinActions";
import { Layout, Menu, Breadcrumb,PageHeader } from 'antd';

import {
  
  ShopOutlined,
  HomeOutlined,
  TrophyOutlined,

  UserSwitchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ConfigProvider,Skeleton } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



 

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

class StaffView extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };






  handleClick(e) {
    e.preventDefault();
    this.props.logoutPin();
    window.location.href = "/merchant/login/pin";
  }

  render() {
    const { collapsed } = this.state;
    
    return (
      <div>
        <NavTopWebPOS />
        <BgGradient>
          <div className="container">
            <div className=" ">
              <div className=""></div>
              <BranchNameSize className="text-center align-items-center headcoverpadding">
                ตั้งค่าบัญชี
              </BranchNameSize>
              <div className=""></div>
            </div>
          </div>
        </BgGradient>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed } onCollapse={this.onCollapse} style={{background: '#fff' }}>
          
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<TrophyOutlined />}>
              การสะสมแต้ม
            </Menu.Item>
            <Menu.Item key="2" icon={<ShopOutlined />}>
              ตั้งค่าร้าน
            </Menu.Item>
           
            <Menu.Item key="3" icon={<UserSwitchOutlined />}>
              จัดการพนักงาน
            </Menu.Item>
             
            <Menu.Item key="4" icon={<ShoppingOutlined />}>
            แพ็กเกจเสริม
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
         
          <Content style={{ margin: '0 16px' }}>
            
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item>ตั้งค่าบัญชี</Breadcrumb.Item>
              <Breadcrumb.Item>การสะสมแต้ม</Breadcrumb.Item>
            </Breadcrumb>
            <div  className="site-layout-background" style={{ padding: 20, minHeight: 360 }}>
              
            <PageHeader 
    className="site-page-header"
    onBack={() => null}
    title="หัวข้อ"
    subTitle="หัวข้อ"
    style={{ height: "2em" }}
  />
            </div>
          </Content>
          
        </Layout>
      </Layout>
      </div>
    );
  }
}

const mapDispatch = { logoutPin };
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(StaffView);
