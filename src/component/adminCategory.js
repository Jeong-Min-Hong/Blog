import adminStyle from './admin.module.css';
import { useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CateInput from './adminCateInput';

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

    const nav = useNavigate();
    const location = useLocation();
    const urlPoint = parseFloat(location.search.slice(1));

    useEffect(() => {
        if (cateData.length === 0) {
            const postCateBlock = new postCateNode(Math.random(), "목록", null, [], true);
            setCateTree((prev) => [...prev, postCateBlock]);
            setCateData((prev) => [...prev, postCateBlock]);
            nav(`?${postCateBlock.key}`);
        }
    }, [cateData, nav]);
    
    function goRoot(e) {
        e.preventDefault();
        e.stopPropagation();
        cateData.map((cate) => {
            return (cate.key === urlPoint ? cate.showChild = true : null);
        });
        setTitling(true);
    }

    function enterTitle(e) {
        //Category 생성할 때, 제목이 있어야 생성 가능
        if (e.target.value === "") {
            setTitling(false);
            return;
        }

        const postCateBlock = new postCateNode(Math.random(), e.target.value, urlPoint, [], true);

        //Category 생성 후, 곧바로 생성한 Category 쿼리 스트링으로 이동
        nav(`?${postCateBlock.key}`);

        treeSearch(cateTree, postCateBlock);
        setTitling(false);
    }

    function treeSearch(tree, newBlock) {
        if (!tree.length) {
            return;
        }
        tree.map((node) => {
            return node.key === urlPoint ? node.child.push(newBlock) : treeSearch(node.child, newBlock);
        });
    }

    function onSubmitTitle(e) {
        if (e.key === 'Escape')
            setTitling(false);
        else if (e.key === 'Enter')
            enterTitle(e);
    }
    function Input(padding = "0") {
        return titling ?
            <CateInput
                onSubmitTitle={onSubmitTitle}
                enterTitle={enterTitle}
                titling={titling} /> : null;
    }

    function showChild(clickBlcok) {
        cateData.map((cate) => {
            if (cate.title === clickBlcok.target.innerText) {
                cate.showChild ? cate.showChild = false : cate.showChild = true;
            }
            return cate.showChild;
        });
    }

    function treeRender(tree, parentsKey) {
        if(!tree.length) {
            return (
                <div>
                    {urlPoint === parentsKey ? Input() : null}
                </div>
            );
        }
        return (
            <div>
                {tree.map((node) =>
                    <div key={node.key} onClick={showChild}>
                        <Link
                            to={`/admin?${node.key}`}
                            className={`${urlPoint !== node.key ? adminStyle.postBlock : adminStyle.focusPostBlock} ${adminStyle.noLinkDeco}`}>
                            <div className={adminStyle.cateArrowBtn}></div>
                            <div className={adminStyle.catePostTitle}>{node.title}</div>
                        </Link>
                        {treeRender(node.child, node.key)}
                    </div>
                )}
                {urlPoint === parentsKey ? Input() : null}
            </div>
        )
    }
    
    return (
        <aside className={adminStyle.adminSideCate}>
            <div className={adminStyle.addCate} onClick={goRoot}></div>
            {treeRender(cateTree)}
        </aside>
    )
}