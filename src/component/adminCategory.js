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
    const [cateTree, setCateTree] = useState([]);
    const [cateData, setCateData] = useState([]);
    const [titling, setTitling] = useState(false);

    const focusInput = useRef();
    const nav = useNavigate();
    const location = useLocation();

    console.log(cateTree);

    useEffect(() => {
        cateData.map((data) => {
            return data.key === parseFloat(location.search.slice(1)) ? console.log(data.title) : null;
        });

    }, [location, cateData]);

    useEffect(() => {
        titling ? focusInput.current.focus() : console.log();
    }, [titling]);

    function onCheckTitle(e) {
        e.preventDefault();
        e.stopPropagation();
        setTitling(true);
    }

    function enterTitle(e) {
        //카테고리 블록 생성
        const postCateBlock = new postCateNode(Math.random(), e.target.value, location.search.slice(1), []);

        //CateTree변수에 트리형태로 PostBlock 저장
        location.search.slice(1) === "" ? setCateTree(prev => [...prev, postCateBlock]) : console.log();
        //CateData에 postBlock 저장. 클릭한 것을 map함수 중첩 없이 빠르게 찾기위해
        setCateData((prev) => [...prev, postCateBlock]);
        nav(`?${postCateBlock.key}`);

        cateTree.map((data) => {
            return data.key === parseFloat(location.search.slice(1)) ? data.child.push(postCateBlock) : null;
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
            <Link to="/admin" className={adminStyle.noLinkDeco}>
                <div className={adminStyle.postBlock} style={{ borderBottom: "1px solid silver", alignItems: "center" }}>
                    <div >목록</div>
                    <div className={adminStyle.addCate} onClick={onCheckTitle}></div>
                </div>
            </Link>
            {cateTree.map((node) => {
                return (
                    <Link key={node.key} to={`/admin?${node.key}`} className={adminStyle.noLinkDeco}>
                        <div key={node.key} className={adminStyle.postBlock}>
                            <div className={adminStyle.cateArrowBtn}></div>
                            <div className={adminStyle.catePostTitle}>{node.title}</div>
                        </div>
                        {node.child.length !== 0 ? node.child.map((node) => {
                            return (
                                <Link key={node.key} to={`/admin?${node.key}`} className={adminStyle.noLinkDeco}>
                                    <div key={node.key} className={adminStyle.postBlock} style={{paddingLeft: "1em"}}>
                                        <div className={adminStyle.cateArrowBtn}></div>
                                        <div className={adminStyle.catePostTitle}>{node.title}</div>
                                    </div>
                                </Link>
                            );
                        }) : console.log()}
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