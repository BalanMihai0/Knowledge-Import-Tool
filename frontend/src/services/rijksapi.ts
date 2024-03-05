import ArtObject from "../models/ArtObject";
import config from "../../config.json";

class RijksmuseumService {
  private apiUrl: string = "https://www.rijksmuseum.nl/api/en/collection";

  async getArtObjects(query: string): Promise<ArtObject[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}?q=${query}&key=${config.rijksKey}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from Rijksmuseum API: ${response.statusText}`
        );
      }

      const data = await response.json();
      const artObjects: ArtObject[] = data.artObjects.map((artObject: any) => ({
        objectNumber: artObject.objectNumber,
        title: artObject.title,
        imageUrl: artObject.webImage.url,
        // map more here
      }));

      return artObjects;
    } catch (error) {
      console.error("Error fetching data from Rijksmuseum API:", error);
      throw error;
    }
  }
}

export default RijksmuseumService;
