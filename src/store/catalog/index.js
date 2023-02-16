import axios from "axios";
import StateModule from "../module";



/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      limit: 5,
      currentPage: 1,
      quantity: 1
    };
  }
    
  /**
   * Сервер
   */
  proxyServer = `https://cors-anywhere.herokuapp.com/`
  requestURL = `http://62.113.103.77:3010/api/base`
  headers = {
        'Content-Type': 'application/json'
    }

  /**
   * Загрузка с сервера
   */
  async load(limit, page, quantity = 1){
    const response = await fetch(`${this.proxyServer}${this.requestURL}?limit=${limit}&page=${page}&quantity=${quantity}`);
    const json = await response.json();
    console.log(json)
    this.setState({
      ...this.getState(),
      items: json.data,
      count: json.total,
      total_page: json.total_page
    });
  }

  changePage(num) {
    this.setState({ ...this.getState(), currentPage: num });
  }



  /**
   * Удаление записи по её коду
   * @param _id
   */
  async removeItem(_id) {
    await axios.delete(`${this.requestURL}/${_id}`);
    this.setState({
      ...this.getState(),
    });
    this.load()
  }
}

export default CatalogState;
