import DataSource from "./DataSource";
import axios from "axios";

class DataSourceHttp extends DataSource {
  async retrieve(search: {}): Promise<any> {
    try {
      const response = await axios.get(
        "https://panacea-q5h5b8doi-rauls-projects-d37b0ed8.vercel.app/costos/products"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

export default DataSourceHttp;
