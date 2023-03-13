import { useEffect, useRef } from "react";
import adminStyle from "./admin.module.css";

export default function CateInput({ onSubmitTitle, enterTitle, titling }) {
    const focusInput = useRef();

    useEffect(() => {
        //Category 생성 버튼 클릭 -> Title Input에 자동으로 포커싱
        titling ? focusInput.current.focus() : console.log();
    }, [titling]);

    return (
        <div className={adminStyle.makePostBlock}>
            <div className={adminStyle.cateArrowBtn}></div>
            <input
                ref={focusInput}
                className={adminStyle.newCateTitle}
                placeholder="이름을 정해주세요"
                maxLength={18}
                onKeyDown={onSubmitTitle}
                onBlur={enterTitle}></input>
        </div>
    );
}