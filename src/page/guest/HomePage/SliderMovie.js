import React, { useEffect, useState } from 'react'
import { Carousel, message } from 'antd';
import { getMovieBanner } from '../../../api/mainApi.js';

export default function SliderMovie() {
    const [banner, setBanner] = useState([]);
    let fetchData = async () => {
        try {
            let response = await getMovieBanner();
            setBanner(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='SliderMovie'>
            <Carousel autoplay>
                {banner.map((item, index) => {
                    return (
                        <div className='item' key={index}>
                            <div className='container'>
                                <img src={item.hinhAnh} alt="" />
                            </div>
                            <div className='bg' style={{
                                backgroundImage: `url(${item.hinhAnh})`,
                            }}
                            ></div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}

