import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as contant from "./contants/index";
import Adminroute from "./commom/AdminRoute/index";
import ReactNotifications from "react-notifications-component";
import TypeLoaiGiay from "./component/Page/LoaiSanPham/form_loai_giay/index";
import FormGiay from "./component/Page/SanPham/form_giay/index";
import "bootstrap/dist/css/bootstrap.min.css";
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Provider } from "react-redux";
import configstore from "./redux/configstore";
const store = configstore();

function App(props) {
  function renderAdminRoute() {
    let xhtml = null;
    xhtml = contant.ROUTESS.map((route) => {
      return (
        <Adminroute
          key={route.path}
          path={route.path}
          component={route.component}
          name={route.name}
          exact={route.exact}
        ></Adminroute>
      );
    });
    return xhtml;
  }

  function renderAdminRouteLG() {
    var result = null;
    if (contant.ROUTESLG.length > 0) {
      result = contant.ROUTESLG.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          ></Route>
        );
      });
    }
    return result;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ReactNotifications> </ReactNotifications>
        <div className="tong">
          <Switch>
            {renderAdminRouteLG()} {renderAdminRoute()}
          </Switch>
          <FormGiay> </FormGiay> <TypeLoaiGiay> </TypeLoaiGiay>
          {/* <MessengerCustomerChat pageId="100952058765770" appId="929094977622295" />,
           */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
