import { useState } from "react";
import NavBar from "../../components/NavBar";
import './dashboard.css'
import axios from "axios";
import PostList from "../../components/PostList";
import AddPost from "../../components/AddPost";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
const Dashboard = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [posts,setPosts]=useState([]);
    const [myPosts,setMyPosts]=useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const handleOpenAddModal = () => setIsAddModalOpen(true)
    const handleCloseAddModal = () => setIsAddModalOpen(false)
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
    const handleOpenSearchModal = () => setIsSearchModalOpen(true)
    const handleCloseSearchModal = () => setIsSearchModalOpen(false)
    // const handleSearch = () =>{
    //     if(isSearchOpen){
    //         setIsSearchOpen(false)
    //     } else{
    //         setIsSearchOpen(true)
    //     }
    // }

    const handleMyPosts = (myPost) =>{
        if(myPost){
            setMyPosts(true)
        } else{
            setMyPosts(false)
        }
    }

    const config={
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    };


    const handlelike = async (post_id,following_id) => {
        try{
            const response=await axios.post(`http://localhost:8000/api/like-post/`,{post_id:post_id,following_id:following_id},config);
            if(response.data['status']=="success"){
                console.log(response.data);
            }
        }catch(e){
            console.log(e);
        }
    }
    const navigate=useNavigate();

    const logout = async () =>{
        try{
            const response=await axios.post(`http://localhost:8000/api/logout`,{},config);
            if(response.data['status']=="success"){
                localStorage.clear();
                navigate('/');
            }
        }catch(e){
            console.log(e);
        }
    }
    return ( 
        <div className="dashboard-container flex-row">
            <div className="side-container flex-row start">
                <NavBar className='side-nav' handleOpenSearchModal={handleOpenSearchModal} handleMyPosts={handleMyPosts} handleOpenAddModal={handleOpenAddModal} logout={logout}/>
                {/* {
                    isSearchOpen && <div className="search-bar flex-col align-center">

                        <input type="text" id="search" placeholder="Username or Name" onKeyUp={handleSearchSubmit}/>
                        <div className="users flex-col between">
                            {users.map((user)=>(
                                <div className="user-card" key={user.id}>
                                    <div className="flex-row">{user.name} </div>
                                    <div className="flex-row between">{user.username}<i id ={user.id} className="fa-solid fa-user-plus" onClick={handleFollowSubmit}></i></div>
                                </div>
                            ))}
                        </div>
                    </div>
                } */}
            </div>
            <SearchBar isOpen={isSearchModalOpen} handleCloseSearchModal={handleCloseSearchModal} config={config}></SearchBar>
            <AddPost isOpen={isAddModalOpen} handleCloseAddModal={handleCloseAddModal}></AddPost>
            <div className="post-container flex-col">
                <PostList setPosts={setPosts} posts={posts} handlelike={handlelike} myPosts={myPosts}/>
            </div>
        </div>

    );
}
 
export default Dashboard;