import React, {useCallback, useEffect} from "react";
import LayoutModal from "../../components/layout-modal";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import ItemModify from "../../components/item-modify";

function Modify(){

    const { id } = useParams();

    const store = useStore();
  
    const select = useSelector(state => ({
      item: state.description.item,
    }));

    useEffect(() => {
      store.get('modify').changeItem(select.item);
    }, [])
  
  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
  };


  return (
    <LayoutModal title='Редактор' onClose={callbacks.closeModal}>
        <ItemModify item={select.item} onAdd={callbacks.addToBasket} onOpen={callbacks.openModalChange}/>
    </LayoutModal>
  )
}

export default React.memo(Modify);
