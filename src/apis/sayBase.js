import axios from "axios";

export default axios.create({
	baseURL: `${window.location.origin}`,
});

// export default axios.create({
//   baseURL: 'http://localhost:3000',
// });