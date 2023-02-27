import adminStyle from './admin.module.css';
import { useState } from 'react';

class postCateNode {
    constructor(key, title, parents, child) {
        this.key = key;
        this.title = title;
        this.parents = parents;
        this.child = child;
    }
};

export default function AdminCategory() {
    const [cateData, setCateDate] = useState([]);
    const [titling, setTitling] = useState(true);

    function onCreatePost(e) {
        setTitling(false);
        const postCateBlock = new postCateNode(Math.random(), "", "", []);
        setCateDate(prev => [...prev, postCateBlock]);
        console.log(titling);
    }

    function onSubmitTitle(e) {
        
        if(e.key !== 'Enter') {

        } else {
            setTitling(1);
        }
    }

    return (
        <section className={adminStyle.adminSideCate}>
            <div className={adminStyle.postBlock}>
                <div>목록</div>
                <div className={adminStyle.addCate} onClick={onCreatePost}></div>
            </div>
            <hr />
            {titling ? <div></div> : 
                <div className={adminStyle.postBlock}>
                    <div className={adminStyle.cateArrowBtn}></div>
                    <input onKeyDown={onSubmitTitle}></input>
                </div>}

            {cateData.map((value) => {
                return (
                    <div key={value.key} className={adminStyle.postBlock}>
                        <div className={adminStyle.cateArrowBtn}></div>
                        <div>value.title</div>
                    </div>
                )
            })}
        </section>
    )
}