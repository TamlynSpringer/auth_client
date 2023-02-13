import AdminProductList from "./products/AdminProductList.jsx";
import {fakeProducts} from "../../fakedata/fakedata.js";

function AdminPage() {
    const currentStore = "Salt store number 2";
    return (
        <>
            <header>
                Welcome to the {currentStore}
            </header>
            <AdminProductList products={fakeProducts} storeName={currentStore} />
            <section>
                <h1>Admins page</h1>
                <br />
                <Users />
                <br />
                <div>
                    <Link to='/'></Link>
                </div>
            </section>
        </>
    )
}

export default AdminPage;