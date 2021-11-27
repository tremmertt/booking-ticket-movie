/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unreachable */
import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/cricle.css";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListInfoDetailFilm } from "../../redux/actions/ManageCineActions";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.ManageFilmReducer.filmDetail);
  console.log({ filmDetail });

  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;

    dispatch(getListInfoDetailFilm(id));
    window.scrollTo({ x: 0, y: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{
          paddingTop: 150,
          minHeight: "150vh",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3 ">
              <img
                className="col-span-1 mt-20"
                src={filmDetail.hinhAnh}
                style={{ width: 300, height: 350 }}
                alt="123"
              />

              <div className=" col-span-2 ml-10" style={{ marginTop: "20%" }}>
                <p className="text-xl">
                  {" "}
                  Day Start :{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}{" "}
                </p>
                <p className="text-5xl font-semibold mt-5">
                  {" "}
                  {filmDetail.tenPhim}{" "}
                </p>
                <p className="text-xl">
                  {" "}
                  {filmDetail.moTa?.replace("<p>", "").replace("</p>", "")}{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2 pt-12">
            <h1
              className="flex justify-center"
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {" "}
              RATING{" "}
            </h1>
            <h1 className="text-pink-600 text-2xl flex justify-center">
              <Rate
                allowHalf
                defaultValue={filmDetail.danhGia / 2}
                style={{ color: "#ff6090", fontSize: 30 }}
              />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big mx-8 my-6`}>
              <span className="text-white">{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 ml-72 w-2/3 container px-5 py-5 bg-white">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Showtimes" key="1" style={{ minHeight: 300 }}>
              <div>
                <Tabs tabPosition={"left"}>
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <div className="flex flex-row items-center justify-center ml-5 mr-2">
                            {" "}
                            <img
                              src={htr.logo}
                              alt={htr.logo}
                              className="rounded-full w-full"
                              style={{ width: 50 }}
                            />{" "}
                            <div className="text-center ml-5">
                              {htr.tenHeThongRap}
                            </div>
                          </div>
                        }
                        key={index}
                      >
                        {htr.cumRapChieu?.map((cine, index) => {
                          return (
                            <div className="mt-5" key={index}>
                              <div className="flex flex-row">
                                <img
                                  style={{ width: 60, height: 60 }}
                                  src={cine.hinhAnh}
                                  alt={cine.hinhAnh}
                                />
                                <div className="ml-2">
                                  <p
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {" "}
                                    {cine.tenCumRap}{" "}
                                  </p>
                                  <p
                                    className="text-gray-500 font-light"
                                    style={{ marginTop: 0 }}
                                  >
                                    {" "}
                                    {cine.diaChi}{" "}
                                  </p>
                                </div>
                              </div>

                              <div className="info-show-times grid grid-cols-4">
                                {cine.lichChieuPhim
                                  ?.slice(0, 12)
                                  .map((showtime, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${showtime.maLichChieu}`}
                                        key={index}
                                        className="col-span-1 font-bold text-blue-400 ml-5"
                                      >
                                        {moment(
                                          showtime.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Information" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Rating" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
