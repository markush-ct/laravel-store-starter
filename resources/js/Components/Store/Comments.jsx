import React from "react";
import Ratings from "./Ratings";

const Comments = ({id, rating, comment, user}) => {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 font-medium">
                <Ratings name={id} rating={rating} />
                <span>-</span>
                {user.name}
            </div>
            <div>{comment}</div>
        </div>
    );
};

export default Comments;
