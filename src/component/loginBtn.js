import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

function LoginBtn() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({ id: "", pw: "" });

    const onChangeAccount = (el) => {
        setAccount({
            ...account,
            [el.target.name]: el.target.value
        })
    }

    const onClickLogin = (e) => {
        e.preventDefault();
        account.id !== "hong" && account.pw !== "jeongmin" ? console.log("not correct id or pw."): navigate("/");;
    }

    return (
        <div className={styles.loginBox}>
            <form className={styles.loginForm} onSubmit={onClickLogin}>
                <span className={styles.loginForm_title}>LOGIN</span>
                <input name='id' className={styles.loginForm_input} placeholder='ID' onChange={onChangeAccount} />
                <input type="password" name='pw' className={styles.loginForm_input} placeholder='PASSWORD' onChange={onChangeAccount} />
                <button className={styles.loginForm_button}>LOG IN</button>
            </form>
        </div>
    );
}

export default LoginBtn;