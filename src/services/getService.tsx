import axios from "axios";

class GetService {
  private URL = `https://api.kinopoisk.dev`;
  private headers = {
    accept: "application/json",
    "X-API-KEY": "XMNC75V-WMTMP7X-K9GTNHA-R9YK8VX",
  };
  async searchData(
    params: { page: string; limit: string; query: string },
    catalog: string,
  ) {
    if (params) {
      const options = {
        method: "GET",
        url: `${this.URL}/${catalog}`,
        params: params,
        headers: this.headers,
      };
      return await axios.request(options);
    } else {
      const options = {
        method: "GET",
        url: `${this.URL}/${catalog}`,
        headers: this.headers,
      };
      return await axios.request(options);
    }
  }
}
export default new GetService();
