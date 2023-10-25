import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/mainApi';
import { userDetailLocalStorage } from '../../api/localServices';
import PersonalDetail from './PersonalDetail';
import BookingHistory from './BookingHistory';

export default function PersonalPage() {
    const [userDetail, setUserDetail] = useState([]);
    useEffect(() => {
        const fetchDataUserDetail = async () => {
            try {
                const response = await getUserInfo();
                userDetailLocalStorage.set(response.data.content)
                setUserDetail(userDetailLocalStorage.get());
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataUserDetail();
    }, []);

    return (
        <div className='container'>
            <PersonalDetail userDetail={userDetail} />
            <BookingHistory userDetail={userDetail} />
        </div>
    );
};
