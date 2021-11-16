import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  LOGIN_ACTION,
  SET_INFO_USER,
  SET_BOOK_TICKET_USER,
} from "../actions/type/ManageUserType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,

  infoUser: {},
};

export const ManageUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_ACTION: {
      const { infoLogin } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(infoLogin));
      localStorage.setItem(TOKEN, infoLogin.accessToken);
      return { ...state, userLogin: infoLogin };
    }

    case SET_INFO_USER: {
      console.log("SET", action);
      return {
        ...state,
        infoUser: {
          ...action.infoUser,
          infoBookTicket: action.thongTinDatVe,
        },
      };
    }

    default:
      return { ...state };
  }
};
