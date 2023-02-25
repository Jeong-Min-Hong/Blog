import adminStyle from './admin.module.css';

export default function PostList() {
    return (
        <div className={adminStyle.adminPostContent}>
            <div className={adminStyle.createPost}>새 글</div>
            <div>두번째 포스트</div>
        </div>
    )
}