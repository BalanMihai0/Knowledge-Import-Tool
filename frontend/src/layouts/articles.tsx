import { FormEvent, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Logo from "../assets/iqadot_logo_small_transparent.png";
import getChannels from "../services/getChannels";
import addArticle from "../services/addArticle";
import ArticleData from "../models/ArticleData";
import Background from "../assets/BackgroundWebsite.jpg"
import React from "react";
import "./custom.css"

function Article() {
  const [formData, setFormData] = useState<ArticleData>({
    subject: "",
    body: "",
    channel: "",
  });
  const [file, setFile] = useState<File | undefined>(undefined);
  const [channels, setChannels] = useState<{ [key: string]: string }>({});
  const [mode, setMode] = useState("plain-text");

  useEffect(() => {
    getChannels().then((res) => {
      setChannels(res);
    });
  }, []);

  const toggleMode = (newMode: string) => {
    setMode(newMode);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "optional-body" || name === "plain-body") {
      setFormData((prevData) => ({
        ...prevData,
        body: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension === "pdf") {
        setFile(file);
      }
    } else {
      alert("Please select a .pdf");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "pdf" && file === null) {
      alert("Please upload a file");
      return;
    }

    if (mode === "plain-text" && !formData.body) {
      alert("Please fill in a body");
      return;
    }

    if (!formData.subject || !formData.channel) {
      alert("Not all required fields are filled in!");
      return;
    }

    addArticle(formData, file).then(() => {
      // Reset form data
      setFormData({
        subject: "",
        body: "",
        channel: "",
      });
      setFile(undefined);
    });
  };

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
      <Sidebar />
      <a href="https://iqadot.com">
        <img className="fixed top-0 right-0 w-52 " src={Logo} alt="IQADot Logo" />
      </a>
      <div className="p-4 min-h-screen flex sm:ml-64">
        <form
          className="justify-self-center self-center m-auto flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mt-5">
            <label className="text-lg font-semibold" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              className="rounded-xl mt-3"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  type="button"
                  className={`inline-block p-4 ${
                    mode === "plain-text"
                      ? "text-blue-600 border-b-2 border-blue-600 active"
                      : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
                  } rounded-t-lg`}
                  onClick={() => toggleMode("plain-text")}
                >
                  Plain text
                </button>
              </li>
              <li className="me-2">
                <button
                  type="button"
                  className={`inline-block p-4 ${
                    mode === "pdf"
                      ? "text-blue-600 border-b-2 border-blue-600 active"
                      : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
                  } rounded-t-lg`}
                  onClick={() => toggleMode("pdf")}
                  aria-current="page"
                >
                  PDF
                </button>
              </li>
            </ul>
          </div>
          <div className={`${mode === "pdf" ? "" : "hidden"} md:w-2/3`}>
            <label className="text-lg font-semibold" htmlFor="pdf-body">
              Body
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="fileInput"
              type="file"
              name="pdf-body"
              onChange={handleFileChange}
            />
          </div>
          <div
            className={`${mode === "pdf" ? "" : "hidden"} flex flex-col mt-1`}
          >
            <label className="text-lg font-semibold" htmlFor="optional-body">
              Optional further body
            </label>
            <input
              type="text"
              className="rounded-xl mt-3"
              name="optional-body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`${
              mode === "plain-text" ? "" : "hidden"
            } flex flex-col mt-5`}
          >
            <label className="text-lg font-semibold" htmlFor="plain-body">
              Body
            </label>
            <input
              type="text"
              className="rounded-xl mt-3"
              name="plain-body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-semibold" htmlFor="channel">
              Select Channel
            </label>
            <select
              className="rounded-xl mt-3"
              name="channel"
              value={formData.channel}
              onChange={handleInputChange}
            >
              <option value="">Select a channel</option>
              {Object.keys(channels).map((channel) => (
                <option key={channels[channel]} value={channels[channel]}>
                  {channel}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="flex flex-col mt-5">
            <label className="text-lg font-semibold" htmlFor="tags">Tags</label>
            <input
              type="text"
              className="rounded-xl mt-3"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-center mt-5">
            <label className="text-lg font-semibold mr-3" htmlFor="allow_comments">Allow Comments</label>
            <input
              type="checkbox"
              className="form-checkbox rounded-xl mt-3"
              name="allow_comments"
              checked={formData.allow_comments}
              onChange={handleInputChange}
            />
          </div> */}
          <button
            type="submit"
            className="rounded-xl mt-5 w-full bg-primary text-white px-4 py-2"
          >
            Create Article
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Article;
