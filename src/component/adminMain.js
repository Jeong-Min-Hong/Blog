import adminStyle from './admin.module.css';

function AdminMain() {

    return (
        <main>
            <div className= {adminStyle.adminWorkspace}>
                <section className={adminStyle.postCategory}>
                    a
                </section>
                <section className={adminStyle.postList}>
                    b
                </section>
            </div>
        </main>
    );
}

export default AdminMain;