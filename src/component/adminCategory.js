import adminStyle from './admin.module.css';

class postCateNode {
    constructor(key, value, parents, child) {
        this.key = key;
        this.value = value;
        this.parents = parents;
        this.child = child;    
    }
};

export default function AdminCategory() {
 
    function onCreateDir() {
        
    }

    return (
        <section className={adminStyle.adminSideCate}>
            <span>목록</span>
            <hr />
            <div className={adminStyle.postBlock}>
                <div className={adminStyle.cateArrowBtn}></div>
                <div>value</div>
                <div className={adminStyle.cateMoreBtn}>
                    <div>추가</div>
                    <div>삭제</div>
                </div>
            </div>
        </section>
    )
}