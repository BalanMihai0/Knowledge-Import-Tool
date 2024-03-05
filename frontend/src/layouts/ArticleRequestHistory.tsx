import Sidebar from './sidebar';
import Logo from "../assets/iqadot_logo_small_transparent.png";
import Background from "../assets/BackgroundWebsite.jpg"
import getAllArticles from '../services/getAllArticles';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import getChannels from '../services/getChannels';
import "./custom.css"

const ArticleRequestHistory = () => {
  const [articleHistoryData, setArticleHistoryData] = useState<ArticleHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getAllArticles();
        getChannels().then((res) => {
          articles.forEach(article => {
            const channelName = Object.keys(res).find(key => res[key] === article.channel);
            if (channelName)
              article.channel = channelName;
          })
          setArticleHistoryData(articles);
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
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
          <img className="fixed w-52 top-0 right-0" src={Logo} />
        </a>
        <div className="p-4 min-h-screen flex flex-col justify-center items-center sm:ml-64">
          <p className='text-4xl mb-5 font-extrabold text-white self-start'>Request history</p>
          <table className="table-auto w-full text-sm rounded-xl text-left rtl:text-right text-gray-500">
            <thead className='bg-primary text-xs text-gray-700 uppercase'>
              <tr>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Channel</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Updated At</th>
              </tr>
            </thead>
            <tbody className='bg-transparent text-black'>
              {articleHistoryData.map((article: any, index: any) => (
                <tr key={index} className='bg-white border-b'>
                  <td className="px-4 py-2">{article.subject}</td>
                  <td className="px-4 py-2">{article.channel}</td>
                  <td className="px-4 py-2">{new Date(article.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">{new Date(article.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};
export default ArticleRequestHistory;