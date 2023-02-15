import LoginForm from "../component/loginForm";
import LoginIntro from "../component/loginIntro";
import './login.css';

function Login() {

    return (
        <div className="login">
            <div className='container'>
                <LoginIntro />
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;