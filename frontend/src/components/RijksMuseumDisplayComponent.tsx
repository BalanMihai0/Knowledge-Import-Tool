// YourComponent.tsx
import React, { useState, useEffect } from "react";
import RijksmuseumService from "../services/rijksapi";
import ArtObject from "../models/ArtObject";
import isAuthorized from "../token/isAuthorized";
import { useNavigate } from "react-router";
import Sidebar from "../layouts/sidebar";
import Logo from "../assets/iqadot_logo_small_transparent.png"
import Background from "../assets/BackgroundWebsite.jpg"

const rijksmuseumService = new RijksmuseumService();

const RijksMuseumDisplayComponent: React.FC = () => {
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthorized(navigate, true);
    const fetchData = async () => {
      try {
        const result = await rijksmuseumService.getArtObjects(""); //query here
        setArtObjects(result);
        console.log(result); //test
      } catch (error) {
        // Handle the error here
        console.error("Error fetching data:", error);
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
        <img className="fixed top-0 right-0" src={Logo} />
      </a>
      <div className="p-4 h-screen sm:ml-64 w-fit m-auto flex flex-col">
        <h1 className="font-bold text-2xl mb-5">Rijksmuseum Art Objects</h1>
        <ul className="flex flex-col">
          {artObjects.map((artObject) => (
            <li key={artObject.objectNumber}>
              <p>{artObject.title}</p>
              <img src={artObject.imageUrl} alt={artObject.title} className="w-32 h-32" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default RijksMuseumDisplayComponent;
