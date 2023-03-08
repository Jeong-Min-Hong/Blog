import { useEffect } from 'react';
import adminStyle from './admin.module.css';
import AdminCategory from './adminCategory';
import AdminPost from './adminPost';

function AdminMain() {
    useEffect(() => {
        
    }, []);

    return (
        <main>
            <div className= {adminStyle.adminWorkspace}>
                <AdminCategory />
                <AdminPost />
            </div>
        </main>
    );
}

export default AdminMain;