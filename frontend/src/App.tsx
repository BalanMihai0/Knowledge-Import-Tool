import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./../dist/output.css";
import Login from "./layouts/Login";
import Home from "./layouts/home";
import RijksMuseumDisplayComponent from "./components/RijksMuseumDisplayComponent";
import Questions from "./layouts/questions"
import Articles from "./layouts/articles";
import CustomSource from "./layouts/CustomSource";
import ArticleRequestHistory from "./layouts/ArticleRequestHistory";

function App() {
  return (
    <>
      <Router>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rijks" element={<RijksMuseumDisplayComponent />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/customsources" element = {<CustomSource/>}/>
            <Route path="/article-history" element = {<ArticleRequestHistory/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
