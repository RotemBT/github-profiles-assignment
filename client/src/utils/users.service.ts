import axios from "axios";

const SERVICE_URL = "http://localhost:3010/api";
export default async function getUsers(q: string, page: number) {
    const urlSearchParams = new URLSearchParams({q, page: String(page)});
    return await axios.get(`${SERVICE_URL}?${urlSearchParams.toString()}`, {});
}