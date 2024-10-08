import axios from "axios"
import { Organization } from "../state/orgSlice/types"

export const fetchOrgsData = async (): Promise<Organization[]> => {
    try {
        const { data } = await axios.get("http://localhost:5000/organization");
        return data;
    } catch (error) {
        console.error("Error fetching organization data:", error);
        return [];
    }
};

export const updateOrgData = async (data: Organization, id: number): Promise<Organization> => {
    const response = await axios.put(`http://localhost:5000/organization/${id}`, data)
    return response?.data
}