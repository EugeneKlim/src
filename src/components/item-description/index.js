import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';


function ItemDescription(props) {

  
  const cn = bem('ItemDescription');
  const img = props.item.media

  return (
    <div className={cn('wraper')}>
      <div className={cn('title')}>
        <p>Название: <span className={cn('value')}>{props.item.title}</span></p>
      </div> 
      <div className={cn('description')}>
        <p>Описание: <span className={cn('value')}>{props.item.description}</span></p>
      </div> 
      <div className={cn('price')}>
        <p>Цена: <span className={cn('value')}>{numberFormat(props.item.price)} ₽</span></p>
      </div>
      <div className={cn('quantity')}>
        <p>Количество: <span className={cn('value')}>{numberFormat(props.item.quantity)} шт.</span></p>
      </div>
      <div className={cn('media')}>
        <img src={img} alt='pic' className={cn('value-img')}/>
      </div>
      <button className={cn('button')} onClick={() => props.onAdd(props.item._id)}>Добавить</button>
      <button className={cn('button')} onClick={props.onOpen}>Изменить</button>
    </div>
  )
}

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ItemDescription.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemDescription);
