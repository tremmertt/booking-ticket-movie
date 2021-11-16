/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class ManageCineService extends baseService {
  constructor() {
    super();
  }

  getListBanner = async () => {
    return await this.get(
      `api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };

  getListInfoShowTime = (maPhim) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`);
  };

  getListCinema = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };
}

export const manageCineService = new ManageCineService();
