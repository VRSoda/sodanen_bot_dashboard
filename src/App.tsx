import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="navbar bg-base-100">

          {/* 홈페이지 제목 */}
          <div className="flex-1">
            <Link to={'/'}><a className="btn btn-ghost text-xl">Sodanen_Bot</a></Link>
          </div>

          <div className="btn btn-ghost text-xl mr-4 bg-indigo-500 hover:bg-indigo-700"><a href="https://discord.com/oauth2/authorize?client_id=1134660695871471727" target="_blank">Bot Invite</a></div>
          <Link to={'/Dashboard'}><div className="btn btn-ghost text-xl mr-4 bg-cyan-500 hover:bg-cyan-600">Dash board</div></Link>
          
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
          <Route path="/Dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
      <div className="btm-nav">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button className="active">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;