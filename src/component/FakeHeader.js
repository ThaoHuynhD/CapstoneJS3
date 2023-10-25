import React from 'react'
import { NavLink } from 'react-router-dom'

export default function FakeHeader() {
    return (
        <div className='container text-center'>
            <NavLink className="btn btn-outline-primary m-3" to='/'>Logo</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/sign-in'>Sign In</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/sign-up'>Sign Up</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/homepage'>HomePage</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/detail/:4420'>Detail</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/personal'>Personal</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/purchasing/:39257'>Cart</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/*'>Page Not Found</NavLink>

            <NavLink className="btn btn-outline-primary m-3" to='/admin/homepage'>AdminHomePage</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/admin/user'>UserManagementPage</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/admin/showtime'>ShowTimeManagementPage</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/admin/report'>ReportingManagementPage</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/admin/movie'>MovieManagementPage</NavLink>
            <NavLink className="btn btn-outline-primary m-3" to='/admin/booking'>BookingManagementPage</NavLink>


        </div>
    )
}
