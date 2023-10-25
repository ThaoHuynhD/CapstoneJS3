import React from 'react';
import Seat from './Seat';

export default function SeatList({ movieShowDetail, cart }) {
    if (!movieShowDetail || !movieShowDetail.danhSachGhe || !cart) {
        return <div>Loading...</div>;
    }
    else return (
        <div className='seatList'>
            <div className='py-5'>
                <div className="row">
                    {movieShowDetail.danhSachGhe.map((seat, index) => (
                        <Seat
                            key={index}
                            seat={seat}
                            isChecked={cart.some(ticket => ticket.maGhe === seat.maGhe)}
                        />
                    ))}
                </div>
                <div className='text-center mx-auto my-5'>
                    <button
                        style={{ width: 40, margin: 5 }}
                        className={`text-center px-0 mx-4 btn btn-dark`}
                        disabled={true}
                    >X</button> <span>Ghế Đã Đặt</span>
                    <button
                        style={{ width: 40, margin: 5 }}
                        className={`text-center px-0 mx-4 btn btn-success`}
                    >00</button> <span>Ghế Đang Chọn</span>
                    <button
                        style={{ width: 40, margin: 5 }}
                        className={`text-center px-0 mx-4 btn btn-warning`}
                    >00</button> <span>Ghế Hạng Vip</span>
                    <button
                        style={{ width: 40, margin: 5 }}
                        className={`text-center px-0 mx-4 btn btn-light`}
                    >00</button> <span>Ghế Hạng Thường</span>
                </div>
            </div>
        </div>
    );
}
