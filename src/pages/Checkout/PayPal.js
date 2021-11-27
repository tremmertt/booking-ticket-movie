import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { bookTicketAction } from "../../redux/actions/ManageBookTicketAction";
import { InfoBookTicket } from "../../_core/models/InfoBookTicket";

export default function Paypal({ id, list }) {
  const paypal = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Booking Ticket",
                amount: {
                  currency_code: "USD",
                  value: 650.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          let infoBookTicket = new InfoBookTicket();
          infoBookTicket.maLichChieu = id;
          infoBookTicket.danhSachVe = list;
          dispatch(bookTicketAction(infoBookTicket));
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
