import adminStyle from './admin.module.css';

export default function PostList() {
    return (
        <div className={adminStyle.adminPostContent}>
            <div className={adminStyle.createPost}>
                New Post
            </div>
            <div>두번째 포스트</div>
        </div>
    )
}