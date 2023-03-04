import adminStyle from './admin.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

class postCateNode {
    constructor(key, title, parents, child) {
        this.key = key;
        this.title = title;
        this.parents = parents;
        this.child = child;
    }
};

export default function AdminCategory() {
    const [cateData, setCateData] = useState([]);
    const [titling, setTitling] = useState(false);

    const focusInput = useRef();
    const nav = useNavigate();
    const location = useLocation();
    useEffect(() => {
        let curCate;
        cateData.map((data) => {
            return data.key === parseFloat(location.search.slice(1)) ? curCate = data.title : console.log();
        });
    }, [location, cateData]);

    useEffect(() => {
        titling ? focusInput.current.focus() : console.log();
    }, [titling]);

    function onCheckTitle(e) {
        setTitling(true); 
    }
    console.log(cateData);
    function enterTitle(e) {
        const postCateBlock = new postCateNode(Math.random(), e.target.value, location.search.slice(1), []);
        setCateData(prev => [...prev, postCateBlock]);
        nav(`?${postCateBlock.key}`);

        cateData.map((data) => {
            return data.key === parseFloat(location.search.slice(1)) ? data.child.push(postCateBlock.key) :null;
        });

        setTitling(false);
    }

    function onSubmitTitle(e) {
        if (e.key === 'Escape')
            setTitling(false);
        else if (e.key === 'Enter') 
            enterTitle(e);
    }

    return (
        <aside className={adminStyle.adminSideCate}>
            <div className={adminStyle.postBlock} style={{ borderBottom: "1px solid silver", alignItems: "center" }}>
                <div>목록</div>
                <div className={adminStyle.addCate} onClick={onCheckTitle}></div>
            </div>
            {cateData.map((value) => {
                return (
                    <Link key={value.key} to={`/admin?${value.key}`} style={{textDecoration: "none", color: "black"}} >
                        <div key={value.key} className={adminStyle.postBlock}>
                            <div className={adminStyle.cateArrowBtn}></div>
                            <div className={adminStyle.catePostTitle}>{value.title}</div>
                        </div>
                    </Link>
                )
            })}
            {titling ?
                <div className={adminStyle.makePostBlock}>
                    <div className={adminStyle.cateArrowBtn}></div>
                    <input
                        ref={focusInput}
                        className={adminStyle.newCateTitle}
                        placeholder="이름을 정해주세요"
                        maxLength={18}
                        onKeyDown={onSubmitTitle}
                        onBlur={enterTitle}></input>
                </div> : null}
        </aside>
    )
}