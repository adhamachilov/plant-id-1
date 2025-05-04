// Plant information interface
export interface PlantInfo {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  wateringNeeds: 'low' | 'medium' | 'high';
  sunlight: 'low' | 'medium' | 'high';
  temperature: string;
  description: string;
  careInstructions?: {
    watering: string;
    light: string;
    soil: string;
    humidity: string;
    fertilizing: string;
  };
  facts?: string[];
}
