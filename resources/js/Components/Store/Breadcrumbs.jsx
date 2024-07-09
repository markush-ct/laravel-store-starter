import React from "react";
import Container from "../Container";
import { Link } from "@inertiajs/react";

const Breadcrumbs = ({ data }) => {
    return (
        <Container className="flex flex-wrap gap-2 py-10 uppercase font-light">
            <span>You are here:</span>
            {data &&
                data.map((item) => (
                    <>
                        <span>
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
                        </span>
                        {item.separator && <span>/</span>}
                    </>
                ))}
        </Container>
    );
};

export default Breadcrumbs;
