import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = ({filters}) => {
    const [search, setSearch] = useState(filters && filters.search);

    const handleSearch = () => {
        router.get(
            route("store.index"),
            { search: search },
            { preserveState: true }
        );
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <label className="flex items-center relative">
            <input
                type="text"
                className="grow border border-primary/10 focus:border-primary transition ease-in-out focus:ring-0 py-3 px-4 placeholder:text-primary/60"
                placeholder="Search..."
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <BsSearch
                className="cursor-pointer absolute right-[16px] top-[50%] -translate-y-1/2"
                onClick={handleSearch}
            />
        </label>
    );
};

export default SearchBox;
