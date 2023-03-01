import adminStyle from './admin.module.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    const location = useLocation();

    useEffect(() => {
        cateData.map((data) => {
            data.key === parseFloat(location.search.slice(1)) ? console.log(data.title) : console.log();
        });
    }, [location, cateData]);

    function onCreatePost(e) {
        setTitling(true);
    }

    function onSubmitTitle(e) {
        if (e.key === 'Escape')
            setTitling(false);
        if (e.key !== 'Enter') {

        } else {
            const postCateBlock = new postCateNode(Math.random(), e.target.value, "", []);
            setCateData(prev => [...prev, postCateBlock]);
            console.log(postCateBlock);
            setTitling(false);
        }
    }

    return (
        <aside className={adminStyle.adminSideCate}>
            <div className={adminStyle.postBlock} style={{ borderBottom: "1px solid silver", alignItems: "center" }}>
                <div>목록</div>
                <div className={adminStyle.addCate} onClick={onCreatePost}></div>
            </div>
            {cateData.map((value) => {
                return (
                    <Link key={value.key} to={`/admin?${value.key}`} >
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
                        className={adminStyle.newCateTitle}
                        placeholder="이름을 정해주세요"
                        maxLength={18}
                        onKeyDown={onSubmitTitle}></input>
                </div> : null}
        </aside>
    )
}