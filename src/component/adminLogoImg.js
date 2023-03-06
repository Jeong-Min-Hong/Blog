
import adminStyles from './admin.module.css';

function AdminLogoImg() {
    return (
        <header className={adminStyles.logoFrame}>
            <div className={adminStyles.logoProfile}>
                <img className={adminStyles.logoProfilePhoto} alt="logo"></img>
                <input></input>
            </div>
        </header>
    );
}

export default AdminLogoImg;