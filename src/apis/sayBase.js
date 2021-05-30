import { apiUrl } from "../env";
import axios from "axios";


export default axios.create({
	baseURL: apiUrl,
});

