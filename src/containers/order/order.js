import { useEffect, useState } from "react";
import { getItem } from "../../apis";
import { DishSelector } from '../../components';

function Order() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItem().then(res => {
      setItem(res.data)
    });
  }, [setItem]);

  return (
    <div>    
      <p className="center">Select Items</p>    
      {
        item && <DishSelector item={item.variants}></DishSelector>  
      }
    </div>
  );
}

export { Order };