/* eslint-disable no-fallthrough */
import { SET_DETAIL_FILM } from "../actions/type/ManageCineType";
import {
  SET_FILM_COMMING_SOON,
  SET_FILM_NOW_PLAYING,
  SET_LIST_FILM,
} from "../actions/type/ManageFilmType";

const stateDefault = {
  arrFilm: [
    {
      idFilm: 8068,
      nameFilm: "Suicide Squad 22",
      nickName: "suicide-squad-22",
      trailer: "https://www.youtube.com/watch?v=JuDLepNa7hw",
      image: "http://movieapi.cyberlearn.vn/hinhanh/suicide-squad-22_gp01.jpg",
      descripte: "Suicide Squad 22",
      idGroup: "GP00",
      dayStart: "2021-08-22T08:08:14.043",
      rate: 10,
      hot: true,
      nowPlaying: true,
      commingSoon: true,
    },
    {
      idFilm: 8068,
      nameFilm: "Suicide Squad 22",
      nickName: "suicide-squad-22",
      trailer: "https://www.youtube.com/watch?v=JuDLepNa7hw",
      image: "http://movieapi.cyberlearn.vn/hinhanh/suicide-squad-22_gp01.jpg",
      description: "Suicide Squad 22",
      idGroup: "GP00",
      dayStart: "2021-08-22T08:08:14.043",
      rate: 10,
      hot: true,
      nowPlaying: true,
      commingSoon: true,
    },
  ],
  nowPlaying: true,
  commingSoon: true,
  arrFilmDefault: [],
  filmDetail: {},
};

export const ManageFilmReducer = (state = stateDefault, action) => {
  console.log("action", action);
  switch (action.type) {
    case SET_LIST_FILM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }

    case SET_FILM_NOW_PLAYING: {
      state.nowPlaying = state.arrFilmDefault.filter((film) => film.dangChieu);
      return { ...state };
    }

    case SET_FILM_COMMING_SOON: {
      console.log("state", state);
      state.commingSoon = state.arrFilmDefault.filter((film) => film.sapChieu);
      return { ...state };
    }

    case SET_DETAIL_FILM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
