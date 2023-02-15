import React, {useCallback} from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    removeItem: useCallback((e) => props.removeItem(props.item._id), [props.removeItem, props.item])

  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <NavLink to={props.link} className={cn('link')}>{props.item.title}</NavLink>
      </div>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('button')} onClick={callbacks.onAdd}>В корзину</button>
        <button onClick={callbacks.removeItem}>Удалить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
}

export default React.memo(Item);
