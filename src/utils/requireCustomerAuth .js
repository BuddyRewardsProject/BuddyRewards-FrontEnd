import React from "react";
import { connect } from "react-redux";

export default function requireCustomerAuth (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/customer/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push("/customer/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} /> ;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}