import React from "react";

const Ratings = ({ rating, ...props }) => {
    return (
        <div className="rating">
            <input
                {...props}
                type="radio"
                className="mask mask-star-2 bg-orange-400 checked:text-orange-400"
                checked={rating >= 1}
                disabled
            />
            <input
                {...props}
                type="radio"
                className="mask mask-star-2 bg-orange-400 checked:text-orange-400"
                checked={rating >= 2}
                disabled
            />
            <input
                {...props}
                type="radio"
                className="mask mask-star-2 bg-orange-400 checked:text-orange-400"
                checked={rating >= 3}
                disabled
            />
            <input
                {...props}
                type="radio"
                className="mask mask-star-2 bg-orange-400 checked:text-orange-500"
                checked={rating >= 4}
                disabled
            />
            <input
                {...props}
                type="radio"
                className="mask mask-star-2 bg-orange-400 checked:text-orange-400"
                checked={rating >= 5}
                disabled
            />
        </div>
    );
};

export default Ratings;
