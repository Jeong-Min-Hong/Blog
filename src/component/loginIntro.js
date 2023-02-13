import styles from './login.module.css';
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from 'react';

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
async function getImg() {
    const response = await openai.createImage({
        prompt: "cherry blossom load",
        n: 1,
        size: "1024x1024",
    });

    return response.data.data[0].url
}


function LoginIntro() {
    const [backGround, setBackGround] = useState();
    useEffect(() => {
        const url = getImg().then((url) => {
            console.log(url);
            setBackGround(url)
        });
    }, []);

    return (
        <div className={styles.introBox} style={{
            backgroundImage: `url(${backGround})`
        }}>
            <div className={styles.intro}>
                <h2>Welcome new visitor!</h2>
                <p>We are readied introducing my blog. <br></br>Let's explore website.</p>
            </div>
        </div>
    );
}

export default LoginIntro;