import Sidebar from "./sidebar";
import Logo from "../assets/iqadot_logo_small_transparent.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import callHome from "../services/callHome";
import isAuthorized from "../token/isAuthorized";
import Background from "../assets/BackgroundWebsite.jpg";

function Home() {
  const [email, setEmail] = useState<string>("undefined");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
    isAuthorized(navigate, true);
    fetchData();
  }, []);

  const fetchData = async () => {
    if (true) {
      setEmail(await callHome(navigate));
    }
  };

  return (
    <>
      <div 
      className=""
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}>
      <Sidebar></Sidebar>
      <a href="https://iqadot.com">
        <img className="fixed top-0 right-0 w-52 " src={Logo} />
      </a>
      <div className="p-4 h-screen flex sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-auto mb-auto dark:border-gray-700 ">
          <h3 className="text-center text-9xl text-white">
            Welcome to KIT, <br /> {email}
          </h3>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
