import axios from 'axios';
import { fetchLocationData } from '../api';

jest.mock('axios');

describe('fetchLocationData', () => {
    it('should return correct location data', async () => {
        const mockResponse = {
            data: {
                geonames: [
                    { lat: 48.8566, lng: 2.3522, countryName: 'France' }
                ]
            }
        };
        axios.get.mockResolvedValue(mockResponse);

        const result = await fetchLocationData('Paris');
        expect(result).toEqual({
            lat: 48.8566,
            lng: 2.3522,
            country: 'France'
        });
    });

    it('should throw an error if no location data is found', async () => {
        const mockResponse = { data: { geonames: [] } };
        axios.get.mockResolvedValue(mockResponse);

        await expect(fetchLocationData('UnknownPlace')).rejects.toThrow('Unable to fetch location data.');
    });

});
