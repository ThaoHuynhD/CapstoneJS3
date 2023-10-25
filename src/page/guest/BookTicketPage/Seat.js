import React from 'react';
import { useDispatch } from 'react-redux';
import { DESELECT_SEAT, SELECT_SEAT } from '../../../constant/constant';

export default function Seat({ seat, isChecked }) {
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        if (isChecked) {
            dispatch({ type: DESELECT_SEAT, payload: { seat } });
        } else {
            dispatch({ type: SELECT_SEAT, payload: { seat } });
        }
    };
    return (
        <div className="col p-0">
            <button
                style={{ width: 40, margin: 5 }}
                className={`text-center px-0 btn ${seat.taiKhoanNguoiDat !== null ? 'btn-dark' : isChecked ? 'btn-success' : seat.loaiGhe === 'Thuong' ? 'btn-light' : 'btn-warning'}`}
                disabled={seat.taiKhoanNguoiDat !== null}
                onClick={handleButtonClick}
            >{seat.taiKhoanNguoiDat !== null ? 'X' : seat.tenGhe}
            </button>
        </div>
    );
}