import axios from "axios";
import { BASE_URL, configHeaders, configHeaders2 } from "./config";
const maNhom = 'GP01';
export const getTicketBooked = (ticketInfo) => {
    return axios({
        url: `${BASE_URL}/QuanLyDatVe/DatVe`,
        method: "POST",
        data: ticketInfo,
        headers: configHeaders2(),
    });
}
export const getMovieShowTime = (maLichChieu) => {
    return axios({
        url: `${BASE_URL}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
        method: "GET",
        headers: configHeaders(),
    })
}

export const getUserSignIn = (userInput) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/DangNhap`,
        method: "POST",
        data: userInput,
        headers: configHeaders(),
    });
};
export const getUserSignUp = (userInput) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/DangKy`,
        method: "POST",
        data: userInput,
        headers: configHeaders(),
    });
};
export const getUserInfo = () => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/ThongTinTaiKhoan`,
        method: "POST",
        headers: configHeaders2(),
    });
};
export const getUserInfoUpdated = (userInput) => {
    return axios({
        url: `${BASE_URL}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "PUT",
        data: userInput,
        headers: configHeaders2(),
    });
}
export const getMovieBanner = () => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachBanner?maNhom=${maNhom}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieList = () => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieListSearchByName = (tenPhim) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieListPerPage = (soTrang, soPhanTu) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieListPerDay = (tuNgay, denNgay) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=${maNhom}&soTrang=1&soPhanTuTrenTrang=10&tuNgay=${tuNgay}&denNgay=${denNgay}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieDetail = (maPhim) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getTheaterGroup = () => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinHeThongRap`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getTheaterByTheaterGroup = (maHeThongRap) => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getShowTimeByTheaterGroup = () => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getShowTimeByMovie = (maPhim) => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: "GET",
        headers: configHeaders(),
    });
}
