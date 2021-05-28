import { apiUrl } from "../env";
import axios from "axios";

// export default axios.create({
// 	baseURL: `${window.location.origin}`,
// });

const api = axios.create({
	baseURL: apiUrl,
});
// export default axios.create({
//   baseURL: 'http://localhost:3000',
// });

export { api };
