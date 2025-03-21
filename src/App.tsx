import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./page/Home";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="navbar bg-base-100">
          {/* 홈페이지 제목 */}
          <div className="flex-1">
            <Link to={'/'}><a className="btn btn-ghost text-xl">Sodanen_Bot</a></Link>
          </div>
          {/* 프로필 사진 */}
          <div className="flex-none mr-6">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://pbs.twimg.com/profile_images/1734752113190985728/lLY9P2HT_400x400.jpg" />
                </div>
              </div>

              {/* 프로필 사진 드롭다운 메뉴 */}
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
  
    </BrowserRouter>
  );
}

export default App;