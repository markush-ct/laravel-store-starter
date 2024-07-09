import React from "react";
import Container from "../Container";
import { Link } from "@inertiajs/react";

const Breadcrumbs = ({ data }) => {
    return (
        <Container className="flex items-center flex-wrap gap-2 py-10 uppercase font-light">
            <div>You are here:</div>

            <div className="breadcrumbs">
                <ul>
                    {data &&
                        data.map((item) => (
                            <li>
                                <Link
                                    href={item.url}
                                    className={
                                        route().current(item.route)
                                            ? "font-bold"
                                            : "font-light"
                                    }
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </Container>
    );
};

export default Breadcrumbs;
