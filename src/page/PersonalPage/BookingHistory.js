import React from 'react'

export default function BookingHistory({ userDetail }) {
    let thongTinDatVe = userDetail.thongTinDatVe;
    if (!thongTinDatVe || !userDetail) {
        return <div>Loading...</div>;
    }
    const renderDanhSachGheDaDat = (danhSachGhe) => {
        let chairArr = [];
        let tenHeThongRap = '';
        let tenRap = '';
        danhSachGhe.forEach(ghe => {
            chairArr.push(ghe.tenGhe);
            tenHeThongRap = ghe.tenHeThongRap;
            tenRap = ghe.tenRap;
        })
        return (
            <tbody>
                <tr>
                    <th>Tên Hệ Thống Rạp: </th>
                    <td>{tenHeThongRap}</td>
                </tr>
                <tr>
                    <th>Tên Rap: </th>
                    <td>{tenRap}</td>
                </tr>
                <tr>
                    <th>Danh Sách Ghế: </th>
                    <td>{chairArr.map((seat, index) => <span key={index}>{seat}{index !== chairArr.length - 1 ? ', ' : ''}</span>)}</td>
                </tr>
            </tbody>
        )
    }
    const renderDanhSachDatVe = () => {
        return thongTinDatVe.map((ticketBill, index) => {
            return (
                <div className='col-6 p-3' key={index}>
                    <table className='table border bg-light'>
                        <tbody>
                            <tr>
                                <th>Ngày Đặt: </th>
                                <td>
                                    <span className='text-success'>{ticketBill.ngayDat.substring(0, 10)} - {ticketBill.ngayDat.substring(14, 20)}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Tên Phim: </th>
                                <td><span className="text-danger font-bold"> {ticketBill.tenPhim}</span></td>
                            </tr>
                            <tr>
                                <th>Thời Lượng Phim: </th>
                                <td><span>{ticketBill.thoiLuongPhim}</span></td>
                            </tr>
                        </tbody>
                        {renderDanhSachGheDaDat(ticketBill.danhSachGhe)}
                    </table>
                </div>)
        })
    }
    return (
        <div className="row">{renderDanhSachDatVe()}</div>
    )
}
