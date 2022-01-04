import './dish-selector.css';

export default function DishSelector({item}) {
    return (
        <div className="row">
            {
                item.variant_groups.map((variant_group) => 
                    <p>{variant_group}</p>
                )
            }
        </div>
    )
}

