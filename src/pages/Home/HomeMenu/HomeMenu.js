/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { SELECTION_INVERT } from "antd/lib/table/hooks/useSelection";
// import renderEmpty from "antd/lib/config-provider/renderEmpty";

const { TabPane } = Tabs;

export default class HomeMenu extends React.PureComponent {
  state = {
    tabPosition: "left",
  };

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };

  componentDidMount() {}

  renderCineSystem = () => {
    let { tabPosition } = this.state;
    return this.props.cineSystem?.map((cineSystem, index) => {
      return (
        <TabPane
          tab={
            <img src={cineSystem.logo} className="rounded-full" width="70" />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {cineSystem.lstCumRap.map((cine, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      style={{ width: "500px", display: "flex" }}
                      className="my-1 align-middle justify-start"
                    >
                      <img
                        src={cine.hinhAnh}
                        className="rounded-full"
                        width="70"
                        height="70"
                      />
                      <div className="text-left ml-5 text-xl ">
                        {cine.tenCumRap}
                        <p className="my-1 text-red-200"> Chi Tiết </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cine.danhSachPhim.slice(0, 4).map((film, index) => {
                    return (
                      <Fragment
                        key={index}
                        className="my-4 py-2"
                        style={{ width: "500px !important", display: "flex" }}
                      >
                        <div
                          style={{ width: "500px !important", display: "flex" }}
                          className="my-4"
                        >
                          <div style={{ display: "flex" }}>
                            <img
                              width="160"
                              height="200"
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/75/75";
                              }}
                            />
                            <div className="ml-6">
                              <h3
                                className=" pt-4 pb-4 text-3xl text-green-800"
                                style={{
                                  width: "500px !important",
                                  display: "flex",
                                }}
                              >
                                {" "}
                                {film.tenPhim}{" "}
                              </h3>
                              <p className="text-xl"> {cine.diaChi} </p>
                              <p className="text-xl"> </p>
                              <div className="grid grid-cols-6 grid-gap-2">
                                {film.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((showTime, index) => {
                                    return (
                                      <NavLink
                                        className="text-2xl text-pink-400 mx-2 my-2"
                                        to="/"
                                        key={showTime.ngayChieuGioChieu}
                                      >
                                        {moment(
                                          showTime.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  render() {
    console.log(this.props, "props123");
    const { tabPosition } = this.state;
    return (
      <>
        <Tabs tabPosition={tabPosition}>{this.renderCineSystem()}</Tabs>
      </>
    );
  }
}
