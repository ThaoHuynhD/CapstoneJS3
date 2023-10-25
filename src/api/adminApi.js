import axios from "axios";
import { BASE_URL, configHeaders, configHeaders2 } from "./config";

// TODO==================QUAN LY DAT VE==========================
export const getShowTimeCreate = (showTimeInfo) => {
    return axios({
        url: `${BASE_URL}/QuanLyDatVe/TaoLichChieu`,
        method: "POST",
        data: showTimeInfo,
        headers: configHeaders2(),
    });
}
// TODO==================QUAN LY NGUOI DUNG==========================
export const getUserType = () => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataUserList = () => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/LayDanhSachNguoiDung`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataUserListPerPage = (soTrang = 1, soPhanTu = 40) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataUserSearch = (userSearch) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${userSearch}`,
        method: "GET",
        headers: configHeaders(),
    })
}
export const getDataUserSearchPerPage = (userSearch, soTrang = 1, soPhanTu = 40) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP01&tuKhoa=${userSearch}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
        method: "GET",
        headers: configHeaders(),
    })
}
export const getDataUser = (tenTaiKhoan) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${tenTaiKhoan}`,
        method: "POST",
        headers: configHeaders2(),
    });
}
export const getDataUserAddNew = (userInfo) => {
    // {
    //     "taiKhoan": "string23tretre45678",
    //     "matKhau": "string",
    //     "email": "phan031109rtetrettr91@gmail.com",
    //     "soDt": "0396544569",
    //     "maNhom": "GP01",
    //     "maLoaiNguoiDung": "QuanTri",
    //     "hoTen": "string fdgtretdrt"
    //   }
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/ThemNguoiDung`,
        method: "POST",
        data: userInfo,
        headers: configHeaders2(),
    });
}
export const getDataUserInfoUpdated = (userInfo) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "POST",
        data: userInfo,
        headers: configHeaders2(),
    });
}
export const getDataUserDelete = (tenTaiKhoan) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${tenTaiKhoan}`,
        method: "DELETE",
        headers: configHeaders2(),
    });
}
// TODO==================QUAN LY PHIM==========================
//! Chua hieu
// export const getDataMoviePictureUpdated = () => { }
// export const getDataMovieUpdated = () => { }
// export const getDataMovieAddNew = () => { }
export const getDataMovieDeleteIfNoShowTime = (maPhim) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/XP?MaPhim=${maPhim}`,
        method: "DELETE",
        headers: configHeaders2(),
    });
}
export const getDataMovieDeleteAll = (maPhim) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: "DELETE",
        headers: configHeaders2(),
    });
}
