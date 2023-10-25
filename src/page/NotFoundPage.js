import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    let navigate = useNavigate();
    return (
        <div className='pageNotFound text-white text-center'
            style={{
                padding: 200, backgroundImage: `url(./img/bg-page.jpg)`,
                backgroundSize: 'cover', height: '100vh', width: '100vw'
            }}>
            <h1 style={{ fontSize: 200 }}><strong>404</strong></h1>
            <h3 className='p-3'><b>WE'RE SORRY. BUT THE PAGE YOU REQUESTED WAS NOT FOUND</b></h3>
            <button className='btn btn-light mr-3' onClick={() => { navigate('/homepage') }}><b>GO HOME</b></button>

            <button className='btn btn-outline-light'>CONTACT US</button>
        </div>
    )
}
