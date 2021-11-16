import { manageBookTicketService } from "../../service/ManageBookTicketService";
import { InfoBookTicket } from "../../_core/models/InfoBookTicket";
import {
  BOOK_TICKET_COMPLETE,
  CHANGE_TAB,
  SET_DETAIL_TICKET_ROOM,
} from "./type/ManageBookTicketType";
import { SET_BOOK_TICKET_USER } from "../actions/type/ManageUserType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const getDetailTicketRoomAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await manageBookTicketService.getDetailTicketRoom(
        maLichChieu
      );

      console.log("resultdsds", result);
      if (result.status === 200) {
        dispatch({
          type: SET_DETAIL_TICKET_ROOM,
          detailTicketRoom: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
    }
  };
};

export const bookTicketAction = (infoBookTicket = new InfoBookTicket()) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await manageBookTicketService.bookTicket(infoBookTicket);
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_BOOK_TICKET_USER,
          infoBookTicket: { ...infoBookTicket },
        });
      }

      await dispatch(getDetailTicketRoomAction(infoBookTicket.maLichChieu));

      await dispatch({
        type: BOOK_TICKET_COMPLETE,
      });

      await dispatch(hideLoadingAction);

      dispatch({ type: CHANGE_TAB });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
