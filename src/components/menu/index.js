import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';


function Menu(props) {

  const cn = bem('Menu');

  const callbacks = {
    createItem: useCallback((e) => props.createItem(), [])
  };

  return (
    <div className={cn()}>
      <div className={cn('onMain')}>
        <NavLink to={'/'}> Главная </NavLink>
      </div>
      <div className={cn('onMain')}>
        <NavLink to={'/create/'}> Создать</NavLink>
      </div>
    </div>
  )
}

Menu.propTypes = {
  createItem: propTypes.func,
}

Menu.defaultProps = {
  createItem: () => {},
}

export default React.memo(Menu);
