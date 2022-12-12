import React, { useState } from "react";
import "./homePage.scss";
import * as api from "./../../../api/thong_ke";
import Table from "react-bootstrap/Table";
import Moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import * as echarts from 'echarts';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

function Thongke(props) {

 const [dataGiayByMonth, setDataGiayByMonth] = useState([]);
  const [dataLoaiGiayByMonth, setDataLoaiGiayByMonth] = useState([]);

  const [toDate, settoDate] = useState(new Date());
  const [fromDate, setfromDate] = useState(new Date());

  const handleformtodate = (date) => {
    settoDate(date);
  };

  const handleformfromdate = (date) => {
    setfromDate(date);
  };


  async function submitSP(){
    await api.getGiayHotByMonth({to_date: Moment(toDate).format('YYYY-MM-DD'), from_date: Moment(fromDate).format('YYYY-MM-DD') }).then((res) => {
      if (res.status === 200) {
        setDataGiayByMonth(res.data.data);
      }
    });
    await api.getLoaiGiayHotByMonth({to_date: Moment(toDate).format('YYYY-MM-DD'), from_date: Moment(fromDate).format('YYYY-MM-DD') }).then((res) => {
      if (res.status === 200) {
        setDataLoaiGiayByMonth(res.data.data);
      }
    });
    option = {
      title: {
        text: 'Stacked Area Chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }



  return (
    <div className="homePage-admin">
      <div className="homepage">
        <div className="title-homePage fs-4 fw-bold"> Thống kê các sản phẩm bán chạy</div>
    
        <div className="statistical-homepage mt-5">
          <div className="giayByMonth">
            <div className="d-flex">
              <div className="form-group d-flex mr-3 align-items-center">
                <div className="mr-1">Từ</div>
               <DatePicker
                className="heigth_date" 
                  selected={fromDate}
                  value={fromDate}
                  onChange={(date) => handleformfromdate(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy"
                  name="from_date"
                />
              </div>
              <div className="form-group d-flex mr-3 align-items-center">
                <div className="mr-1">Đến</div>
                <DatePicker
                  className="heigth_date"
                  selected={toDate}
                  value={toDate}
                  onChange={(date) => handleformtodate(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy"
                  name="to_date"
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={submitSP}>Thực hiện</button>
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
                        <td>{`${(item.tong_tien)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
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
          <div>
                <div id='main'></div>
          </div>
          <div className="mt-5">
          {/* <div className="d-flex">
              <div className="form-group d-flex mr-3 align-items-center">
                <div className="mr-1">Từ</div>
               <DatePicker
                className="heigth_date" 
                  selected={fromDateLG}
                  value={fromDateLG}
                  onChange={(date) => handleformfromdateLG(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy"
                  name="from_date"
                />
              </div>
              <div className="form-group d-flex mr-3 align-items-center">
                <div className="mr-1">Đến</div>
                <DatePicker
                  className="heigth_date"
                  selected={toDateLG}
                  value={toDateLG}
                  onChange={(date) => handleformtodateLG(date)}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy"
                  name="to_date"
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={submitLG}>Thực hiện</button>
            </div> */}
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
                        <td>{`${(item.tong_tien)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</td>
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
