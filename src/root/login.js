import LoginBtn from "../component/loginBtn";
import LoginIntro from "../component/loginIntro";
import './login.css';

function Login() {

    return (
        <div className='container'>
            <LoginBtn />
            <LoginIntro />
        </div>
    )
}

export default Login;