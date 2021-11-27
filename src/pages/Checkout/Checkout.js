/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookTicketAction,
  setQRimage,
  getDetailTicketRoomAction,
} from "../../redux/actions/ManageBookTicketAction";
import { getListCinemaAction } from "../../redux/actions/ManageCineActions";
import style from "./Checkout.module.css";
import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./Checkout.css";
import _ from "lodash";
import { BOOK_TICKET } from "../../redux/actions/type/ManageBookTicketType";
import { InfoBookTicket } from "../../_core/models/InfoBookTicket";
import { Tabs } from "antd";
import { getInfoUserAction } from "../../redux/actions/ManageUserAction";
import moment from "moment";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { NavLink } from "react-router-dom";
import PayPal from "./PayPal";
function Checkout(props) {
  const { userLogin } = useSelector((state) => state.ManageUserReducer);
  const { listCinema } = useSelector((state) => state.ManageCineReducer);
  const filmDetail = useSelector((state) => state.ManageFilmReducer.filmDetail);
  const { detailTicketRoom, listSeatBooking } = useSelector(
    (state) => state.ManageBookTicketReducer
  );

  const dispatch = useDispatch();
  console.log("listSeatBooking", listSeatBooking);

  useEffect(() => {
    dispatch(getDetailTicketRoomAction(props.match.params.id));
    dispatch(getListCinemaAction());
  }, []);

  const { thongTinPhim, danhSachGhe } = detailTicketRoom;

  const renderSeats = () => {
    return danhSachGhe?.map((seat, index) => {
      if (seat["stt"] == "30") console.log("set", seat);
      let classSeatVip = seat.loaiGhe === "Vip" ? "seatVip" : "";
      let classSeatBooked = seat.daDat === true ? "seatBooked" : "";
      let classSeatBooking = "";
      let indexSeatB = listSeatBooking.findIndex(
        (seatB) => seatB.maGhe === seat.maGhe
      );

      let classSeatBookedByMyself = "";
      if (userLogin.taiKhoan === seat.taiKhoanNguoiDat) {
        classSeatBookedByMyself = "seatBookedByMyself";
      }

      if (indexSeatB !== -1) {
        classSeatBooking = "seatBooking";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: BOOK_TICKET,
                seatChoose: seat,
              });
            }}
            disabled={seat.daDat}
            className={`seat ${classSeatVip} ${classSeatBooked} ${classSeatBooking} ${classSeatBookedByMyself} text-center`}
            key={index}
          >
            {" "}
            {seat.seatBooked ? (
              classSeatBookedByMyself != "" ? (
                <UserOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : (
              seat.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>

            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black"> SCREEN </h3>
            </div>

            <div>{renderSeats()}</div>
          </div>

          <div className="mt-10 flex justify-center ">
            <table className=" divide-y divide-gray-200 w-2/3">
              {/* <thead className="bg-gray-50 p-5">
                <tr>
                  <th> Unbooked Seat </th>
                  <th> Booking Seat </th>
                  <th> Vip Seat </th>
                  <th> Reserved Seat </th>
                  <th> Ordered Seat </th>
                </tr>
              </thead> */}
              <tbody className=" bg-gray-50 divide-y divide-gray-200 block">
                <tr>
                  <td className=" block-inline w-1/5">
                    <button className="seat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>
                    <span className="  font-bold"> Unbooked Seat</span>
                  </td>

                  <td className=" block-inline w-1/5">
                    <button className="seat seatBooking text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                    <span className=" p-2 font-bold"> Booking Seat</span>
                  </td>

                  <td className=" block-inline w-1/5">
                    <button className="seat seatVip text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>
                    <span className=" p-2 font-bold"> Vip Seat</span>
                  </td>

                  <td className=" block-inline w-1/5">
                    <button className="seat seatBooked text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                    <span className=" p-2 font-bold"> Reserved Seat</span>
                  </td>

                  <td className=" block-inline w-1/5">
                    <button className="seat seatBookedByMyself text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                    <span className=" p-2 font-bold"> Ordered Seat</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3">
          <h3 className="text-center text-2xl mt-2 mb-5 text-pink-800">
            {" "}
            {listSeatBooking
              .reduce((total, seat, index) => {
                return (total += seat.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            đ{" "}
          </h3>
          <hr />
          <h3 className="text-xl"> {thongTinPhim.tenPhim} </h3>
          <p>
            {" "}
            ADDRESS: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}{" "}
          </p>
          <p>
            {" "}
            DAY START: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}{" "}
          </p>
          <hr />

          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-600 text-lg"> SEAT </span>
              {_.sortBy(listSeatBooking, ["maGhe"]).map((seatB, index) => {
                return (
                  <span key={index} className="text-xl text-green-700 mr-1">
                    {seatB.stt}
                  </span>
                );
              })}
            </div>

            <div className="text-right col-span-1">
              <span className="text-green-700 text-lg">
                {" "}
                {listSeatBooking
                  .reduce((total, seat, index) => {
                    return (total += seat.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
              </span>
            </div>
          </div>

          <hr />

          <div className="my-5">
            <i> Email: </i> <br />
            {userLogin.email}
          </div>

          <div className="my-5">
            <i> Phone: </i> <br />
            {userLogin.soDT}
          </div>

          <hr />
          <div className="text-lg p-2 mb-5">
            <h4> PAY METHOD </h4>

            <PayPal id={props.match.params.id} list={listSeatBooking} />
          </div>
          <hr />

          <div
            className="mb-0 h-full flex flex-col items-center"
            style={{ marginBottom: 0 }}
          >
            <div
              onClick={() => {
                let infoBookTicket = new InfoBookTicket();
                infoBookTicket.maLichChieu = props.match.params.id;
                infoBookTicket.danhSachVe = listSeatBooking;
                dispatch(bookTicketAction(infoBookTicket));
              }}
              className="bg-pink-600 text-black w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              BOOK TICKET
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QRcode() {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.ManageUserReducer);
  const { contentLink } = useSelector((state) => state.ManageBookTicketReducer);

  const [qrCode, setQrCode] = useState("");

  console.log("infoUser,1212", contentLink, infoUser);
  // Changing the URL only when the user
  // changes the input

  useEffect(() => {
    dispatch(getInfoUserAction());
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/checkout-finish/${contentLink}!&size=300x300&bgcolor=ffffff`
    );
  }, [qrCode, contentLink]);

  const renderTicketItem = function () {
    console.log("infoUser.infoBkooTicket", infoUser);
    const ticket = infoUser.thongTinDatVe[parseInt(contentLink)];
    const danhSachGhe = _.first(ticket.danhSachGhe);
    return (
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src="https://picsum.photos/200/200"
          />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">
              {ticket.tenPhim}
            </h2>
            <p className="text-gray-500">
              {" "}
              Time Start: {moment(ticket.ngayDat).format("hh:mm")} - Day Start:{" "}
              {moment(ticket.ngayDat).format("DD-MM-YYYY")}
            </p>
            <p> Address: {danhSachGhe.tenHeThongRap} </p>
            <p>
              {" "}
              Cinema: {danhSachGhe.tenCumRap} - Seat:{" "}
              {ticket.danhSachGhe.map((seat, index) => {
                return <span key={index}>{seat.tenGhe}-</span>;
              })}{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              Confirm ticket
            </h1>

            <div className="flex justify-center">
              {" "}
              {renderTicketItem()}
              <img src={qrCode} alt="" />
              <a href={qrCode} download="QRCode">
                {/* <button type="button">Download</button> */}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const { TabPane } = Tabs;

export default function Demo(props) {
  const { tabActive } = useSelector((state) => {
    console.log("state", state);
    return state.ManageBookTicketReducer;
  });
  console.log("tabActive", tabActive);
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.ManageUserReducer);
  useEffect(() => {
    return () => {
      dispatch({
        type: "CHANGE_TAB_ACTIVE",
        number: "1",
      });
    };
  }, []);

  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <button
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-3 mb-5 mr-5 rounded-full bg-pink-300"
            >
              {" "}
              {userLogin.taiKhoan.substr(0, 1)}
            </div>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            {" "}
            Log Out{" "}
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <div className="p-5">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: "CHANGE_TAB_ACTIVE",
            number: key,
          });
        }}
      >
        <TabPane
          tab={
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink to="/">
                <HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} />
              </NavLink>
            </div>
          }
          key="4"
        ></TabPane>
        <TabPane tab="01. CHOOSE SEAT & PAYMENT" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02. RESULT" key="2">
          <ResultBookTicket {...props} />
        </TabPane>
        <TabPane tab="03. CONFIRM" key="3">
          <QRcode />
        </TabPane>
      </Tabs>
    </div>
  );
}

function ResultBookTicket(props) {
  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.ManageUserReducer);
  const { userLogin } = useSelector((state) => state.ManageUserReducer);

  useEffect(() => {
    dispatch(getInfoUserAction());
  }, []);

  const renderTicketItem = function () {
    console.log("infoUser.infoBkooTicket", infoUser);
    return infoUser?.thongTinDatVe?.map((ticket, index) => {
      console.log("ticket", ticket);
      const danhSachGhe = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src="https://picsum.photos/200/200"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                {" "}
                Time Start: {moment(ticket.ngayDat).format("hh:mm")} - Day
                Start: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p> Address: {danhSachGhe.tenHeThongRap} </p>
              <p>
                {" "}
                Cinema: {danhSachGhe.tenCumRap} - Seat:{" "}
                {ticket.danhSachGhe.map((seat, index) => {
                  return <span key={index}>{seat.tenGhe}-</span>;
                })}{" "}
              </p>
              <div className="flex justify-end">
                <button
                  className=" bg-gray-400 text-black duration-300 hover:bg-black hover:text-white font-semibold-border font-light py-2 px-6 rounded-md"
                  onClick={() => {
                    dispatch(setQRimage(index));
                  }}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              Booking History
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Please double-check your booking information and time. Hope you
              can enjoy this moment with us.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
