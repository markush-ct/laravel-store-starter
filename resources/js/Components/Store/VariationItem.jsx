import React from 'react'

const VariationItem = ({title, price, setTotalPrice, setSelectedVariation, index,...props}) => {
    const firstItem = 0;

    const handleVariationSelected = () => {
        setTotalPrice(price)
        setSelectedVariation(props.id)
    }

    return (
        <div className="text-xl flex justify-between items-center gap-5">
            <div className="flex gap-8 items-center py-5">
                <input
                    {...props}
                    type="radio"
                    className="size-7 rounded-none focus:ring-0 focus:ring-offset-0 text-primary"
                    onClick={handleVariationSelected}
                    defaultChecked={index === firstItem}
                />
                <label
                    htmlFor={props.id}
                    className="cursor-pointer"
                >
                    {title}
                </label>
            </div>
            <div>{price} PHP</div>
        </div>
    )
}

export default VariationItem
