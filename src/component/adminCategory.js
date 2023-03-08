import adminStyle from './admin.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

class postCateNode {
    constructor(key, title, parents, child, showChild) {
        this.key = key;
        this.title = title;
        this.parents = parents;
        this.child = child;
        this.showChild = showChild;
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
        //Category 생성 버튼 클릭 -> Title Input에 자동으로 포커싱
        titling ? focusInput.current.focus() : console.log();
    }, [titling]);

    function goRoot(e) {
        e.preventDefault();
        e.stopPropagation();
        cateData.map((cate) => {
            return (cate.key === parseFloat(location.search.slice(1)) ? cate.showChild = true : null); 
        });
        setTitling(true);
    }

    function enterTitle(e) {
        //Category 생성할 때, 제목이 있어야 생성 가능
        if (e.target.value === "") {
            setTitling(false);
            return;
        }

        const postCateBlock = new postCateNode(Math.random(), e.target.value, location.search.slice(1), [], true);

        location.search.slice(1) === "" ? setCateTree(prev => [...prev, postCateBlock]) : console.log();
        setCateData((prev) => [...prev, postCateBlock]);

        //Category 생성 후, 곧바로 생성한 Category 쿼리 스트링으로 이동
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

    function Input(padding = "0") {
        return titling ?
            <div className={adminStyle.makePostBlock} style={{ paddingLeft: padding }}>
                <div className={adminStyle.cateArrowBtn}></div>
                <input
                    ref={focusInput}
                    className={adminStyle.newCateTitle}
                    placeholder="이름을 정해주세요"
                    maxLength={18}
                    onKeyDown={onSubmitTitle}
                    onBlur={enterTitle}></input>
            </div>
            : null;
    }

    function showChild(clickBlcok) {
        cateData.map((cate) => {
            if (cate.title === clickBlcok.target.innerText) {
                cate.showChild ? cate.showChild = false : cate.showChild = true;
            }
            return cate.showChild;
        });
    }

    return (
        <aside className={adminStyle.adminSideCate}>
            <Link to="/admin" className={adminStyle.noLinkDeco}>
                <div
                    className={location.search.slice(1) !== "" ? adminStyle.postBlock : adminStyle.focusPostBlock}
                    style={{ borderBottom: "1px solid silver", alignItems: "center" }}>
                    <div>목록</div>
                    <div className={adminStyle.addCate} onClick={goRoot}></div>
                </div>
            </Link>
            {cateTree.map((node) => {
                return (
                    <Link key={node.key} to={`/admin?${node.key}`} className={adminStyle.noLinkDeco}>
                        <div
                            className={parseFloat(location.search.slice(1)) !== node.key ? adminStyle.postBlock : adminStyle.focusPostBlock}
                            onClick={showChild}>
                            <div className={adminStyle.cateArrowBtn}></div>
                            <div className={adminStyle.catePostTitle}>{node.title}</div>
                        </div>
                        {node.child.length !== 0 && node.showChild ? node.child.map((node) => {
                            return (
                                <Link key={node.key} to={`/admin?${node.key}`} className={adminStyle.noLinkDeco}>
                                    <div
                                        className={parseFloat(location.search.slice(1)) !== node.key ? adminStyle.postBlock : adminStyle.focusPostBlock}
                                        style={{ paddingLeft: "1em" }}>
                                        <div className={adminStyle.cateArrowBtn}></div>
                                        <div className={adminStyle.catePostTitle}>{node.title}</div>
                                    </div>
                                </Link>
                            );
                        }) : null}
                        {(parseFloat(location.search.slice(1))) === node.key ? Input("1em") : null}
                    </Link>
                )
            })}
            {isNaN(parseFloat(location.search.slice(1))) ? Input() : null}
        </aside>
    )
}