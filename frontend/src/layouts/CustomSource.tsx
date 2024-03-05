import { useState } from 'react';
import Sidebar from './sidebar';
import Logo from "../assets/iqadot_logo_small_transparent.png";
import Background from "../assets/BackgroundWebsite.jpg"
import customapi from '../services/customapi';

const Customapi = new customapi();

const CustomRequests = () => {

  const [formData, setFormData] = useState({ apiLink: "", apiKey: "", requestHeader: "" });
  const [outputText, setOutputText] = useState<string>('');
  const [apiData, setApiData] = useState<any>(null); 

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function HandleFormSubmit(e: any) {
    e.preventDefault();
    try {
      const apiDetails = {
        apiLink: formData.apiLink,
        apiKey: formData.apiKey,
        requestHeader: formData.requestHeader
      };
      

      const apiResponse = await Customapi.makeApiRequest(apiDetails.apiLink, apiDetails.apiKey, apiDetails.requestHeader);

      //set the response to the state
      setApiData(apiResponse);
      setOutputText(JSON.stringify(apiResponse, null, 2));
      console.log(outputText);
    } catch (error) {
      console.error('Error making API request:', error);
      setOutputText(`Error: ${error}`);
      setApiData(null);
    }
    
  }

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
            <img className="fixed top-0 w-52  right-0" src={Logo} />
        </a>
        <div className="p-4 min-h-screen flex sm:ml-64">
          <form className="justify-self-center self-center m-auto">
            <label style={{ fontSize: '1.5rem' }} className="text-lg font-semibold" htmlFor="select-channel">Make Your Own Api Call:</label>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold" htmlFor="select-channel">API link:</label>
                    <input
                        type="text"
                        placeholder="API link"
                        name="apiLink"
                        className="form-input bg-blue-200 w-full mt-2 rounded-lg"
                        value={formData.apiLink}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold" htmlFor="select-question">Your personal API Key:</label>
                    <input
                        type="text"
                        placeholder="API key"
                        name="apiKey"
                        className="form-input bg-blue-200 w-full mt-2 rounded-lg"
                        value={formData.apiKey}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-semibold" htmlFor="select-question">Request Header(optional):</label>
                    <input
                        type="text"
                        placeholder="Request Header"
                        name="requestHeader"
                        className="form-input bg-blue-200 w-full mt-2 rounded-lg"
                        value={formData.requestHeader}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="rounded-full text-white font-semibold bg-primary mt-3 w-full h-10" onClick={HandleFormSubmit}>
                    Submit
                </button>
                {apiData && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">API Response Data:</h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Results</th>
                </tr>
              </thead>
              {/* to be implemented! Displaying the results from the new api */}
              <tbody>
                {/* Map through the API data and populate the table rows */}
                {apiData.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.property1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </form>
        </div>
      </div>
    </div>
)
};

export default CustomRequests;
