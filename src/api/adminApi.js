import axios from "axios";
import { BASE_URL, configHeaders, configHeaders2 } from "./config";
const maNhom = 'GP01';
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
        url: `${BASE_URL}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataUserListPerPage = (soTrang = 1, soPhanTu = 40) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataUserSearch = (userSearch) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${maNhom}&tuKhoa=${userSearch}`,
        method: "GET",
        headers: configHeaders(),
    })
}
export const getDataUserSearchPerPage = (userSearch, soTrang = 1, soPhanTu = 40) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${userSearch}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
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
export const getDataMovieUpdated = (movieInfo) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/CapNhatPhimUpload`,
        method: "POST",
        data: movieInfo,
        headers: configHeaders2(),
    });
 }
export const getDataMovieAddNew = (movieInfo) => { 
    return axios({
        url: `${BASE_URL}/QuanLyPhim/ThemPhimUploadHinh`,
        method: "POST",
        data: movieInfo,
        headers: configHeaders(),
    });
}
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
