import axios from "axios";
import { BASE_URL, configHeaders, configHeaders2 } from "./config";

// TODO==================QUAN LY DAT VE==========================
// =========================USER==============================
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
// ====================USER LA QUAN TRI=======================
export const getShowTimeCreate = (showTimeInfo) => {
    return axios({
        url: `${BASE_URL}/QuanLyDatVe/TaoLichChieu`,
        method: "POST",
        data: showTimeInfo,
        headers: configHeaders2(),
    });
}
// TODO==================QUAN LY NGUOI DUNG==========================
// =========================USER==============================
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
// ====================USER LA QUAN TRI=======================
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
export const getDataUserListPerPage = (soTrang, soPhanTu) => {
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
export const getDataUserSearchPerPage = (userSearch, soTrang, soPhanTu) => {
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
// =========================USER==============================
export const getDataMovieBanner = () => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachBanner?maNhom=GP15`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieList = () => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhim?maNhom=GP15`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieListPerPage = (soTrang, soPhanTu) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTu}`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getMovieListPerDay = (tuNgay, denNgay) => {
    return axios({
        url: `${BASE_URL}/QuanLyPhim/LayDanhSachPhimTheoNgay?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=10&tuNgay=${tuNgay}&denNgay=${denNgay}`,
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
// ====================USER LA QUAN TRI=======================
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

// TODO==================QUAN LY RAP==========================
// =========================USER==============================
export const getDataTheaterGroup = (maHeThongRap) => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${maHeThongRap}`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataTheaterByTheaterGroup = (maHeThongRap) => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
        method: "GET",
        headers: configHeaders(),
    });
}
export const getDataShowTimeByTheaterGroup = (maHeThongRap) => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`,
        method: "GET",
        headers: configHeaders(),
    });
};
export const getDataShowTimeByMovie = (maPhim) => {
    return axios({
        url: `${BASE_URL}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: "GET",
        headers: configHeaders(),
    });
}
