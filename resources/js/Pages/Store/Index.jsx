import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Container from "@/Components/Container";
import { Link, router } from "@inertiajs/react";
import Breadcrumbs from "@/Components/Store/Breadcrumbs";
import SearchBox from "@/Components/Store/SearchBox";

const Index = ({ products, categories, breadcrumbs, totalincart, filters }) => {
    return (
        <MainLayout totalincart={totalincart}>
            <div className="border-b flex justify-center">
                <Container className="flex flex-col lg:flex-row justify-between lg:items-start gap-5">
                    <ul className="flex flex-wrap justify-center lg:justify-start lg:items-center gap-10 uppercase font-light">
                        <li>
                            <Link
                                href={route("store.index")}
                                className={
                                    route().current("store.index")
                                        ? "font-bold"
                                        : "font-light"
                                }
                            >
                                All Products
                            </Link>
                        </li>
                        {categories.data.map((category) => (
                            <li>
                                <Link
                                    key={category.id}
                                    href={route(
                                        "store.show.category",
                                        category.slug
                                    )}
                                    className={
                                        route().current(
                                            "store.show.category",
                                            category.slug
                                        )
                                            ? "font-bold"
                                            : "font-light"
                                    }
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <SearchBox filters={filters} />
                </Container>
            </div>

            <div className="flex justify-center">
                <Breadcrumbs data={breadcrumbs} />
            </div>

            <div className="flex justify-center">
                <Container className="py-0">
                    <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 lg:gap-10">
                        {products.data.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col gap-4"
                            >
                                <div className="hover:opacity-50 transition-opacity ease-in-out duration-300">
                                    <Link
                                        href={route(
                                            "store.show.product",
                                            product.slug
                                        )}
                                    >
                                        <img
                                            src={product.cover_image}
                                            alt="Product cover image"
                                            className="w-full aspect-square"
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <div className="text-[20px] hover:font-medium leading-none w-full">
                                        <Link
                                            href={route(
                                                "store.show.product",
                                                product.slug
                                            )}
                                        >
                                            {product.name}
                                        </Link>
                                    </div>
                                    <div className="-order-1 md:order-1 flex items-end leading-none">
                                        <span className="text-[32px] font-bold">
                                            {product.lowest_variation_price}
                                        </span>

                                        <span className="text-[20px] font-medium ml-2">
                                            PHP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            <div className="flex justify-center">
                <Container className="py-10 uppercase">
                    <div className="join grid grid-cols-2">
                        <Link
                            href={products.links.prev}
                            className="join-item btn btn-outline rounded-none"
                            preserveScroll
                            preserveState
                        >
                            &laquo; Previous
                        </Link>
                        <Link
                            href={products.links.next}
                            className="join-item btn btn-outline rounded-none"
                            preserveScroll
                            preserveState
                        >
                            Next &raquo;
                        </Link>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Index;
