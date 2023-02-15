import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import React, { useState } from "react";
import axios from "axios";

function ItemToAdd() {

  const cn = bem('ItemDescription');

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const UPLOAD_ENDPOINT =
    "https://cors-anywhere.herokuapp.com/http://62.113.103.77:3010/api/base";

  const handleSubmit = async e => {
    e.preventDefault();
    let res = await saveForm();
    console.log(res.data);
  };

  const saveForm = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("media", file);
 
    console.log("form", formData)

    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  };

  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const onPriceChange = (e) => {
    setPrice(e.target.value)
  }
  const onQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('wraper')}>
        <div className={cn('title')}>
            <input type="text" placeholder="название" value={title} required onChange={onTitleChange} />
        </div>
        <div className={cn('description')}>
            <input type="text" placeholder="описание" value={description} onChange={onDescriptionChange} />
        </div>
        <div className={cn('price')}>
            <input type="number" placeholder="цена" value={price} required onChange={onPriceChange} />
        </div>
        <div className={cn('quantity')}>
            <input type="number" placeholder="сортировка" value={quantity} required onChange={onQuantityChange} />
        </div>
        <div className={cn('media')}>
            <input type="file" required onChange={handleOnChange} />
        </div>
      <button type="submit">Отправить</button>
    </form>
  );
}


ItemToAdd.propTypes = {
  onAdd: propTypes.func,
}

ItemToAdd.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemToAdd);
