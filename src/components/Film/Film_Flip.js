import React from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./Film_Flip.css";
import { NavLink } from "react-router-dom";

export default function Film_Flip(props) {
  const { item } = props;

  return (
    <div className="flip-card mt-2">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={item.hinhAnh}
            alt="Avatar"
            style={{ width: 300, height: 300 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/75/75";
            }}
          />
        </div>
        <div
          className="flip-card-back"
          style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img
              src={item.hinhAnh}
              alt="Avatar"
              style={{ width: 300, height: 300 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/75/75";
              }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="rounded-full cursor-pointer">
                <PlayCircleOutlined style={{ fontSize: "50px" }} />
              </div>
              <div className="text-2xl mt-2 font-bold w-auto px-10">
                {item.tenPhim}
              </div>

              <div className="mx-20 w-40 bg-orange-300 cursor-pointer py-2 bg-white rounded-lg my-2 text-success-50 font-bold">
                <NavLink to={`/detail/${item.maPhim}`}> BOOK TICKET</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
