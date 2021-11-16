import { manageUserService } from "../../service/ManageUserService";
import { LOGIN_ACTION, SET_INFO_USER } from "./type/ManageUserType";
import { history } from "../../App";

export const loginAction = (infoLogin) => {
  return async (dispatch) => {
    try {
      console.log("info", infoLogin);
      const result = await manageUserService.login(infoLogin);

      if (result.data.statusCode === 200) {
        dispatch({
          type: LOGIN_ACTION,
          infoLogin: result.data.content,
        });

        history.goBack();
      }

      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getInfoUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await manageUserService.getInfoUser();
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_INFO_USER,
          infoUser: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
