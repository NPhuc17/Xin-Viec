import React from 'react'
import EmployerNavbar from '../components/employernavbar'
import Navbar from '../components/Navbar'


function Employerpage() {
    return (
        <>
            <EmployerNavbar />
            <header className=' bg-secondary text-white py-20'>
                <h1 className='text-4xl font-bold text-center mt-0 text-[var(--color-highlight)]'>
                    Đăng tin tuyển dụng,
                    tìm kiếm ứng viên hiệu quả</h1>

            </header>
        </>
    )
}

export default Employerpage