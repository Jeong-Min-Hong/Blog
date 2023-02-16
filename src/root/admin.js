import AdminLogoImg from '../component/adminLogoImg';
import AdminMain from '../component/adminMain';
import { useEffect, useState } from 'react';
import './admin.css';

function Admin() {
    
    return (
        <div className='admin'>
            <AdminLogoImg />
            <AdminMain />
            <footer></footer>
        </div>
    );
}

export default Admin;