import React, { useState, useEffect } from "react";
import "./homePage.scss";
import {
  AssignmentTurnedIn,
  AddShoppingCart,
  PersonAdd,
  ListAlt,
} from "@material-ui/icons";
import * as api from "./../../../api/thong_ke";
import Table from "react-bootstrap/Table";

const thang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Thongke(props) {
  const d = new Date();
  let month = d.getMonth();
  const [dataGiay, setDataGiay] = useState(0);
  const [dataLoaiGiay, setDataLoaiGiay] = useState(0);
  const [dataGiayByMonth, setDataGiayByMonth] = useState([]);
  const [dataLoaiGiayByMonth, setDataLoaiGiayByMonth] = useState([]);
  const [dataMonth, setDataMonth] = useState(parseInt(month) + 1);
  const [dataLoaiMonth, setDataLoaiMonth] = useState(parseInt(month) + 1);
  useEffect(() => {
    getData();
    getDataGiayByMonth(dataMonth);
    getDataLoaiGiayByMonth(dataLoaiMonth);
  }, []);

  async function getDataGiayByMonth(dataMonths) {
    await api.getGiayHotByMonth({ thang: dataMonths }).then((res) => {
      if (res.status === 200) {
        setDataGiayByMonth(res.data.data);
      }
    });
  }

  async function getDataLoaiGiayByMonth(dataMonths) {
    await api.getLoaiGiayHotByMonth({ thang: dataMonths }).then((res) => {
      if (res.status === 200) {
        setDataLoaiGiayByMonth(res.data.data);
      }
    });
  }
  async function getData() {
    await api.getAllGiay().then((res) => {
      if (res.status === 200) {
        setDataGiay(res.data.data[0].tong);
      }
    });
    await api.getAllLoaiGiay().then((res) => {
      if (res.status === 200) {
        setDataLoaiGiay(res.data.data[0].tong);
      }
    });
  }

  function onchangeSelect(e) {
    e.persist();
    setDataMonth(parseInt(e.target.value));
    getDataGiayByMonth(parseInt(e.target.value));
  }
  function onchangeSelects(e) {
    e.persist();
    setDataLoaiMonth(parseInt(e.target.value));
    getDataLoaiGiayByMonth(parseInt(e.target.value));
  }
  return (
    <div className="homePage-admin">
      <div className="homepage">
        <div className="title-homePage fs-4 fw-bold"> Thống kê </div>
        <div className="category-homePage">
          <div className="product-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"> Số sản phẩm </div>
                  <div className="amount-homePage">{dataGiay}</div>
                </div>
                <div className="righ">
                  <AddShoppingCart className="icons"> </AddShoppingCart>
                </div>
              </div>
            </div>
          </div>
          <div className="classProduct-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"> Loại sản phẩm </div>
                  <div className="amount-homePage">{dataLoaiGiay}</div>
                </div>
                <div className="righ">
                  <AssignmentTurnedIn className="icons"> </AssignmentTurnedIn>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bill-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"></div>
                  <div className="amount-homePage"> 1 </div>
                </div>
                <div className="righ">
                  <ListAlt className="icons"> </ListAlt>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="account-homePage shadow">
            <div className="vertical">
              <div className="base">
                <div className="left">
                  <div className="title-homePage-small"> Tài khoản </div>
                  <div className="amount-homePage"> 1 </div>
                </div>
                <div className="righ">
                  <PersonAdd className="icons"> </PersonAdd>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="statistical-homepage mt-5">
          <div className="giayByMonth">
            <div className="select-thuonghieu">
              <label> Tháng </label>
              <select
                onChange={(e) => onchangeSelect(e)}
                className="custom-select-product"
                id="category"
                value={dataMonth}
              >
                <option value={0}> </option>
                {thang.map((l, index) => {
                  return (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  );
                })}
              </select>
            </div>
            <Table striped bordered hover variant="dark" className="table_type">
              <thead>
                <tr>
                  <th scope="col" colSpan={4} className="text-center fw-bold">
                    Sản phẩm bán chạy
                  </th>
                </tr>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên giày</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {dataGiayByMonth.length > 0 ? (
                  dataGiayByMonth.map((item, index) => {
                    return (
                      <tr key={item.ten_giay}>
                        <td>{index + 1}</td>
                        <td>{item.ten_giay}</td>
                        <td>{item.so_luong}</td>
                        <td>{item.tong_tien}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th scope="col" colSpan={4} className="text-center fw-bold">
                      Danh sách trống
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="mt-5">
            <div className="select-thuonghieu">
              <label> Tháng </label>
              <select
                onChange={(e) => onchangeSelects(e)}
                className="custom-select-product"
                id="category"
                value={dataLoaiMonth}
              >
                <option value={0}> </option>
                {thang.map((l, index) => {
                  return (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  );
                })}
              </select>
            </div>
            <Table striped bordered hover variant="dark" className="table_type">
              <thead>
                <tr>
                  <th scope="col" colSpan={4} className="text-center fw-bold">
                    Loại giày bán chạy
                  </th>
                </tr>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên giày</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {dataLoaiGiayByMonth.length > 0 ? (
                  dataLoaiGiayByMonth.map((item, index) => {
                    return (
                      <tr key={item.ten_loai_giay}>
                        <td>{index + 1}</td>
                        <td>{item.ten_loai_giay}</td>
                        <td>{item.so_luong}</td>
                        <td>{item.tong_tien}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th scope="col" colSpan={4} className="text-center fw-bold">
                      Danh sách trống
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thongke;
