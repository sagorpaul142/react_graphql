import './App.css';
import AllPost from "./Components/AllPost";
import AllUser from "./Components/AllUser";
import AddPost from "./Components/addPost";
import {Route, Routes} from "react-router-dom";
import Layout from "./Components/Layout";
import EditPost from "./Components/EditPost";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path={"/posts"} element={<AllPost/>}></Route>
                <Route path={"/add-post"} element={<AddPost/>}></Route>
                <Route path={"/edit-post/:id"} element={<EditPost/>}></Route>
                <Route path={"/users"} element={<AllUser/>}></Route>
            </Routes>
        </Layout>
    );
}

export default App;
