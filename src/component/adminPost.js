import adminStyle from './admin.module.css';
import PostList from './adminPostList';
import { useState } from 'react';

export default function AdminPost() {
    const [workCate, setWorkCate] = useState(0);

    function onClickPost() {
        setWorkCate(0);
    }

    function onClickProfiles() {
        setWorkCate(1);
    }

    return (
        <section className={adminStyle.postList}>
            <div className={adminStyle.adminWorkFrame}>
                <div className={adminStyle.adminWorkCate}>
                    <div onClick={onClickPost}>
                        <span>글</span>
                    </div>
                    <div onClick={onClickProfiles}>
                        <span>프로필</span>
                    </div>
                </div>
                {workCate ? <div></div> : <PostList />}
            </div>
        </section>
    )
}