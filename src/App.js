import { useEffect, useState } from "react";
import { getItem } from "./apis";
import { DishSelector } from './components';
import './App.css';

function App() {
  const [item, setItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [disabledItems, setDisabledItems] = useState({});

  useEffect(() => {
    getItem().then(res => {
      setItem(res.data)
    });
  }, [setItem]);

  const onChange = (vg_id, variation_id) => {
    setSelectedItems({
      ...selectedItems,
      [vg_id]: variation_id
    });  
  }

  useEffect(() => {
    checkForVariantDisability();
  }, [selectedItems]);

  const checkForVariantDisability = () => {
    if (item) {
      const localDisabledItems = {};
  
      item.variants.exclude_list.forEach(exclude_group => {
        const exclude_group_selected_item = exclude_group.find(eg => selectedItems[eg.group_id] === eg.variation_id)
  
        if (exclude_group_selected_item) {
          exclude_group.forEach(eg => {
            if (exclude_group_selected_item.group_id !== eg.group_id) {
              localDisabledItems[eg.variation_id] = true;
            }
          })
        } 
      });
      
      setDisabledItems(localDisabledItems);  
    }
  }

  return (
    <div>
      <p>Select Item</p>
      {/* {
        item && <DishSelector item={item.variants}></DishSelector>
      } */}

      <div className="row">
        {
          item && item.variants.variant_groups.map((vg) =>
            <div key={vg.group_id} className="column">
              <p>{vg.name}</p>
              <ul className="radio-list">
                {
                  vg.variations.map(variation => 
                    <li key={variation.id}>
                        <input type="radio" id={variation.id} name={vg.name} value={variation.name} 
                          onChange={() => onChange(vg.group_id, variation.id)}
                          disabled={disabledItems[variation.id]}/>
                        <label htmlFor={variation.id}>{variation.name}</label><br></br>
                    </li>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>

    </div>
  );
}

//disabled={isDisable(vg.id, variation.id)} 

export default App;