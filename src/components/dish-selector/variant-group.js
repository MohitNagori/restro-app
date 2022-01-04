import './dish-selector.css';

function VariantGroup({variant_group, disabledVariants, onVariantSelect}) {
    
    const onChange = (vg_id, variation_id) => {
        onVariantSelect(vg_id, variation_id);
    }

    return (
        <div key={variant_group.group_id} className="column">
            <p>{variant_group.name}</p>
            <ul className="radio-list">
                {
                    variant_group.variations.map(variation => 
                        <li key={variation.id}>
                            <input type="radio" id={variation.id} name={variant_group.name} value={variation.name} 
                            onChange={() => onChange(variant_group.group_id, variation.id)}
                            disabled={disabledVariants[variation.id]}/>
                          <label htmlFor={variation.id}>{variation.name}</label><br></br>
                        </li>
                    )
                }
            </ul>
        </div>  
    )
}

export { VariantGroup }

