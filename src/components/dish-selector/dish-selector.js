import { useEffect, useState } from "react";
import { VariantGroup } from './variant-group';
import './dish-selector.css';

function DishSelector({item}) {
    
    const [selectedVariants, setSelectedItems] = useState({});
    const [disabledVariants, setDisabledItems] = useState({});

    const onVariantSelect = (vg_id, variation_id) => {
        setSelectedItems({
            ...selectedVariants,
            [vg_id]: variation_id
        });  
    }

    useEffect(() => {
        checkForVariantDisability();
    }, [selectedVariants]);

    const checkForVariantDisability = () => {
        if (item) {
            const localDisabledItems = {};
        
            item.exclude_list.forEach(exclude_group => {
                const exclude_group_selected_item = exclude_group.find(eg => selectedVariants[eg.group_id] === eg.variation_id)
        
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
        <div className="row">
            {
                item && item.variant_groups.map((vg) =>
                    <VariantGroup key={vg.group_id} variant_group={vg} disabledVariants={disabledVariants} onVariantSelect={onVariantSelect}></VariantGroup>
                )
            }
        </div>
    )
}


export { DishSelector }
