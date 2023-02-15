import { useState } from "react";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class DescriptionState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {}
    };
  }



  async loadById(id){
    const response =  await fetch(`https://cors-anywhere.herokuapp.com/http://62.113.103.77:3010/api/base/${id}`)
    const json = await response.json();
    this.setState({
      item: json
    });
  }

}

export default DescriptionState;
