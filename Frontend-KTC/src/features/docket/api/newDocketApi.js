import axiosInstance from '../../../api/axios.js'

export const addNewDocketApi = async (payload) => {
    const response = await axiosInstance.post(
        '/docket/new',
        payload
    )

    return response.data
}

export const newDocketInitialData = async (payload) => {

    try {
        const response = await axiosInstance.post(
            '/docket/nextDocketData',
            payload
        )

        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }

}


export const getTruckDetails = async (payload) => {

    try {
        const response = await axiosInstance.get(
            '/vehicle/getTruckDetails',
           {
            params:payload
           }
        )

        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }

}


export const getRateDetails = async (payload) => {

    try {
        const response = await axiosInstance.get(
            '/rates/getRateDetails',
           {
            params:payload
           }
        )

        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong";
    }

}


