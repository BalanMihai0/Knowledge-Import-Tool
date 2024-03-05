import { useNavigate } from "react-router";
import { useState } from "react";
import "./custom.css";

function Sidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <aside id="default-sidebar" aria-label="default-sidebar" className={`fixed flex flex-col bg-primary top-0 left-0 z-40 w-64 min-h-screen transition-transform ${sidebarVisible ? '' : `-translate-x-full sm:translate-x-0`}`}>
        <ul className="flex-col space-y-2 font-medium p-2">
          <li>
            <a
              href="/"
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="ml-3">Home</span>
            </a>
          </li>
          <li>
            <a
              href="/rijks"
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Rijksmuseum</span>
            </a>
          </li>
          <li>
            <a
              href="/questions"
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Questions</span>
            </a>
          </li>
          <li>
            <a
              href="/articles"
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">
                Article requests
              </span>
            </a>
          </li>
          <li>
            <a
              href="/article-history"
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">
                Article requests histroy
              </span>
            </a>
          </li>
          <li>
            <a
              href="/customsources"
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Custom Sources</span>
            </a>
          </li>
        </ul>
        <ul className="space-y-2 font-medium mt-auto p-2">
          <li>
            <a
              onClick={logOut}
              className="flex text-white items-center p-2 rounded-lg hover:bg-light-sidebar"
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
