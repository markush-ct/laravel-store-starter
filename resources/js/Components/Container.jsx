import { cn } from "@/utils";
import React from "react";

const Container = ({ children, className }) => {
    return (
        <div className={cn("w-full max-w-[1200px] p-5", className)}>
            {children}
        </div>
    );
};

export default Container;
