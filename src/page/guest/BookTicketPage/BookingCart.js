import React from 'react'
import { getTicketBooked } from '../../../api/mainApi';
import { PUCHASING_CART } from '../../../constant/constant';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

export default function BookingCart({ movieShowDetail, cart }) {
    let dispatch = useDispatch();

    if (!movieShowDetail || !movieShowDetail.danhSachGhe || !cart) {
        return <div>Loading...</div>;
    }
    const renderTicketCart = () => {
        let normalTicketList = [];
        let vipTicketList = [];
        cart.forEach(seat => {
            if (seat.loaiGhe === 'Thuong') {
                normalTicketList.push(seat);
            } else {
                vipTicketList.push(seat);
            }
        });
        return (
            <tbody>{normalTicketList.length !== 0 ?
                <tr>
                    <td>{normalTicketList.map((seat, index) => (<span key={index}>{seat.tenGhe}{index !== normalTicketList.length - 1 ? ', ' : ''}</span>))}</td>
                    <td>Phổ Thông</td>
                    <td>{normalTicketList.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}</td>
                </tr>
                : null}
                {vipTicketList.length !== 0 ?
                    <tr>
                        <td>{vipTicketList.map((seat, index) => (<span key={index}>{seat.tenGhe}{index !== vipTicketList.length - 1 ? ', ' : ''}</span>))}</td>
                        <td>Vip</td>
                        <td>{vipTicketList.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}</td>
                    </tr>
                    : null}

            </tbody>
        )
    }
    // TODO:=====================
    const fetchData = async (values) => {
        try {
            const response = await getTicketBooked(values);
            console.log("response: ", response);
            dispatch({
                type: PUCHASING_CART,
            });
            message.success("Mua vé thành công");
            setTimeout(() => {
                // window.location.reload();
                window.location.href = '/personal';
            }, 1000);
        } catch (error) {
            message.error("Mua vé thất bại");
            console.log(error);
        }
    };
    let handleShoppingCart = (values) => {
        fetchData(values);
    }

    let { diaChi, maLichChieu, gioChieu, hinhAnh, ngayChieu, tenCumRap, tenPhim } = movieShowDetail.thongTinPhim;
    let danhSachVeUpdate = [];
    cart.forEach(ticket => {
        let newTicket = {
            maGhe: ticket.maGhe,
            giaVe: ticket.giaVe,
        }
        danhSachVeUpdate.push(newTicket);
    })
    let shoppingValue = {
        maLichChieu: maLichChieu,
        danhSachVe: danhSachVeUpdate,
    }

    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Tên cụm rạp:</b></td>
                        <td>{tenCumRap}</td>
                    </tr>
                    <tr>
                        <td><b>Địa Chỉ:</b></td>
                        <td>{diaChi}</td>
                    </tr>
                    <tr>
                        <td><b>Thời Gian Chiếu:</b></td>
                        <td>{ngayChieu} - {gioChieu}</td>
                    </tr>
                    <tr>
                        <td><b>Tên Phim:</b></td>
                        <td>{tenPhim}</td>
                    </tr>
                    <tr>
                        <td><b>Hình Ảnh:</b></td>
                        <td><img width={200} src={hinhAnh} alt='' /></td>
                    </tr>
                    <tr>
                        <td><b>Vé Chọn:</b></td>
                        <td>{cart.length !== 0 ? <table className='table'>
                            <thead>
                                <tr>
                                    <th>Danh sách vé:</th>
                                    <th>Hạng vé:</th>
                                    <th>Thành tiền:</th>
                                </tr>
                            </thead>
                            {renderTicketCart()}
                        </table> : null}
                        </td>
                    </tr>
                    <tr>
                        <td><b>Tổng tiền:</b></td>
                        <td>
                            <h4 className='text-success'>{cart.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}</h4>
                        </td>
                    </tr>
                    <tr><td><button className='btn btn-danger' onClick={() => handleShoppingCart(shoppingValue)}>Buy Ticket</button></td></tr>
                </tbody>
            </table>
        </div>
    )
}
