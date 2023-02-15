import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Description from './description';
import ToAdd from './to-add';
import Modify from './modify';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      {modal === 'basket' && <Basket/>}
      {modal === 'modify' && <Modify/>}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article/:id" element={<Description />} />
        <Route path="/create/" element={<ToAdd />} />
      </Routes>
    </>
  );
}

export default React.memo(App);
