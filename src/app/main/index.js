import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginator from "../../components/paginator";
import Sidebar from "../../components/sidebar";





function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage: state.catalog.currentPage,
  }));


  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //загрузка с сервера
    load: useCallback((limit, page) => store.get('catalog').load(limit, page), []),
    //смена страницы
    changePage: useCallback(num => store.get('catalog').changePage(num), []),
    // Добавление в корзину
    removeItem: useCallback(_id => store.get('catalog').removeItem(_id), []),
    
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} removeItem={callbacks.removeItem} link={`article/${item._id}`}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Sidebar onOpen={callbacks.openModalBasket}
               createItem={callbacks.createItem}
               amount={select.amount} 
               sum={select.sum}/>
      <List items={select.items} renderItem={renders.item} onOpen={callbacks.openModalChange}/>
      <Paginator count={select.count}
                 currentPage={select.currentPage}
                 load={callbacks.load}
                 changePage={callbacks.changePage}
                 />
    </Layout>
  )
}

export default React.memo(Main);
