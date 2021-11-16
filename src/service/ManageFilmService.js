/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class ManageFilmService extends baseService {
  constructor() {
    super();
  }

  getListBanner = async () => {
    return await this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  getListFilm = async () => {
    const res = await this.get(
      `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`
    );
    console.log("res", res);
    return res;
  };

  getListCineSystem = async () => {
    return await this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    )
      .then((res) => res)
      .catch((err) => {
        console.log("err", err);
        return [];
      });
  };
}

export const manageFilmService = new ManageFilmService();
