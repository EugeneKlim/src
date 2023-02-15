import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Sidebar from "../../components/sidebar";
import ItemToAdd from "../../components/item-to-add";


function ToAdd(){

  console.log('To-add');
  
  const store = useStore();

  const select = useSelector(state => ({
    item: state.description.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //Создание товара
    createItem: useCallback(newElement => store.get('catalog').createItem(newElement), []),

  };

  return (
    <Layout head={<h1>"Новый товар"</h1>}>
      <Sidebar onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemToAdd createItem={callbacks.createItem}/>
    </Layout>
  )
}

export default React.memo(ToAdd);
