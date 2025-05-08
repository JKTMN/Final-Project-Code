import axios from 'axios'

export const handleHealthCheck = async () => {
    try {
        const response = await axios.get('http://localhost:3001/health')

        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Server offline or not responding')
        }
    } catch (error) {
        console.error('Error during health check:', error)
        return false
    }
};