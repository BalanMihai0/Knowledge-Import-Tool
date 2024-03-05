class customapi {
    
    async makeApiRequest(link: string, key: string, header: string): Promise<any> {
      try {
        const response = await fetch(`${link}?q=${""}&key=${key}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${key}`, 
            'Custom-Header': header, // Add custom header
          },
        });
  
        if (!response.ok) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          throw new Error(`Failed to fetch data from API: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error making API request:', error);
        throw error;
      }
    }
  }
  
  export default customapi;
  