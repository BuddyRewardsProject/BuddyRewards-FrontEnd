import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerQR from "./pages/customer/CustomerQR";
import CustomerPreRegister from "./pages/customer/CustomerPreRegister";
import CustomerRegister from "./pages/customer/CustomerRegister";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerCard from "./pages/customer/CustomerCard";
import CustomerCardDetail from "./pages/customer/CustomerCardDetail";
import CustomerDetailHistory from "./pages/customer/CustomerDetailHistory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Prize from "./pages/Prize";
import PinMerchantLogin from "./pages/PinMerchantLogin";
import StaffView from "./pages/StaffView";
import Settings from "./pages/Settings";
import WebPOS from "./pages/WebPOS";
import WebPOS2 from "./pages/WebPOS2";
import WebPOS3 from "./pages/WebPOS3";
import WebPosRedeem from "./pages/WebPosRedeem";
import WebPosDone from "./pages/WebPosDone";
import Dashboard from "./pages/Dashboard";
import pointHistory from "./pages/PointHistory";
import MyMember from "./pages/MyMember";

import requireAuth from "./utils/requireAuth";
import { createBrowserHistory } from "history";
import PinReset from "./pages/PinReset";
import StaffManagement from "./pages/StaffManagement";
import BranchManagement from "./pages/BranchManagement";

import React, { Component } from "react";
import RewardCard from "./pages/RewardCard";

const browserHistory = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  render() {
    return (
      <div className="App">
        <div></div>

        <Helmet>
          <title>buddyRewards!</title>
        </Helmet>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/merchant/login" component={Login} />
            <Route
              exact
              path="/merchant/login/pin"
              component={requireAuth(PinMerchantLogin)}
            />
            <Route
              exact
              path="/merchant/login/pin/reset"
              component={requireAuth(PinReset)}
            />
            <Route exact path="/merchant/register" component={Register} />
            <Route
              exact
              path="/merchant/branch"
              component={requireAuth(StaffView)}
            />
            <Route
              exact
              path="/merchant/branch/staff-Management"
              component={StaffManagement}
            />

            <Route
              exact
              path="/merchant/branch/branch-Management"
              component={BranchManagement}
            />

            <Route
              exact
              path="/merchant/branch/settings"
              component={Settings}
            />

            <Route
              exact
              path="/merchant/branch/settings/prize"
              component={Prize}
            />

            <Route
              exact
              path="/merchant/branch/settings/rewardcard"
              component={RewardCard}
            />

            <Route
              exact
              path="/merchant/branch/dashboard"
              component={Dashboard}
            />

            <Route
              exact
              path="/merchant/branch/dashboard/pointHistory"
              component={pointHistory}
            />

            <Route
              exact
              path="/merchant/branch/dashboard/mymember"
              component={MyMember}
            />

            <Route exact path="/customer/home" component={CustomerHome} />
            <Route exact path="/customer/myQR" component={CustomerQR} />
            <Route
              exact
              path="/customer/preRegister"
              component={CustomerPreRegister}
            />
            <Route
              exact
              path="/customer/register"
              component={CustomerRegister}
            />
            <Route exact path="/customer/login" component={CustomerLogin} />
            <Route exact path="/customer/" component={CustomerCard} />

            <Route
              exact
              path="/customer/merchant/history/:merchantId"
              component={CustomerDetailHistory}
            />
            <Route
              exact
              path="/customer/mycard/detail/:merchantId"
              component={CustomerCardDetail}
            />
            <Route exact path="/merchant/branch/webPOS" component={WebPOS} />
            <Route exact path="/merchant/branch/webPOS2" component={WebPOS2} />
            <Route
              exact
              path="/merchant/branch/webPOS/redeem"
              component={WebPosRedeem}
            />
            <Route
              exact
              path="/merchant/branch/webPOS/done"
              component={WebPosDone}
            />
            <Route exact path="/merchant/branch/webPOS3" component={WebPOS3} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
