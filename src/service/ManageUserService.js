/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ManageUserService extends baseService {
  constructor() {
    super();
  }

  getInfoUser = async () => {
    return await this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };

  login = async (infoLogin) => {
    return await this.post(`api/QuanLyNguoiDung/DangNhap`, infoLogin);
  };
}

export const manageUserService = new ManageUserService();
