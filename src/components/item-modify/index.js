import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import axios from 'axios';


function ItemModify(props) {

  const cn = bem('ItemModify');

  const UPLOAD_ENDPOINT =
  `https://cors-anywhere.herokuapp.com/http://62.113.103.77:3010/api/base/${props.item._id}`;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

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

    return await axios.put(UPLOAD_ENDPOINT, formData, {
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
    <form onSubmit={handleSubmit}>
    <div>
        <p>Название: <span className={cn('value')}>{props.item.title}</span></p>
        <input type="text" placeholder="название" value={title} required onChange={onTitleChange} />
    </div>
    <div>
        <p>Описание: <span className={cn('value')}>{props.item.description}</span></p>
        <input type="text" placeholder="описание" value={description} onChange={onDescriptionChange} />
    </div>
    <div>
        <p>Цена: <span className={cn('value')}>{numberFormat(props.item.price)} ₽</span></p>
        <input type="number" placeholder="цена" value={price} required onChange={onPriceChange} />
    </div>
    <div>
        <p>Количество: <span className={cn('value')}>{numberFormat(props.item.quantity)} шт.</span></p>
        <input type="number" placeholder="сортировка" value={quantity} required onChange={onQuantityChange} />
    </div>
    <div>
        <input type="file" required onChange={handleOnChange} />
    </div>
  <button type="submit">Отправить</button>
</form>
    // <div className={cn('wraper')}>
    //   <div className={cn('title')}>
    //     <p>Название: <span className={cn('value')}>{props.item.title}</span></p>
    //       <div>
    //         <input type="text" placeholder="название" name="title" value={title}  onChange={onTitleChange} required  />
    //       </div>
    //       <input type="button" name="submit" value="Изменить" onClick={titleUpdate}/>
          
    //   </div> 

    //   <div className={cn('description')}>
    //     <p>Описание: <span className={cn('value')}>{props.item.description}</span></p>
    //     <div>
    //       <input type="text" placeholder="описание"  id="description" required  />
    //     </div>
    //     <button type="submit">Изменить</button>
    //   </div> 

    //   <div className={cn('price')}>
    //     <p>Цена: <span className={cn('value')}>{numberFormat(props.item.price)} ₽</span></p>
    //     <div>
    //       <input type="text" placeholder="цена" id="price" required />
    //     </div>
    //     <button type="submit">Изменить</button>
    //   </div>

    //   <div className={cn('quantity')}>
    //     <p>Количество: <span className={cn('value')}>{numberFormat(props.item.quantity)} шт.</span></p>
    //     <div>
    //       <input type="text" placeholder="количество" id="quantity" required  />
    //     </div>
    //     <button type="submit">Изменить</button>
    //   </div>

    //   <div className={cn('media')}>
    //     <img src={props.item.media} alt='pic' className={cn('value-img')}/>
    //     <div>
    //       <input type="file" id="media" required  />
    //     </div>
    //     <button type="submit">Изменить</button>
    //   </div>

    // </div>
  )
}

ItemModify.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ItemModify.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemModify);
