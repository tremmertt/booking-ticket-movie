import {
  SET_LIST_FILM,
  SET_FILM_NOW_PLAYING,
  SET_FILM_COMMING_SOON,
} from "./type/ManageFilmType";
import { manageFilmService } from "../../service/ManageFilmService";

export const getListFilmAction = () => {
  return async (dispatch) => {
    try {
      const result = await manageFilmService.getListFilm();
      dispatch({
        type: SET_LIST_FILM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const getListFilmNowPlayingAction = () => {
  console.log("213123", 123);
  return async (dispatch) => {
    console.log("dispatch", dispatch);
    try {
      dispatch({
        type: SET_FILM_NOW_PLAYING,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};

export const getListFilmCommingSoonAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_FILM_COMMING_SOON,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
