import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Container from "@/Components/Container";
import { Link } from "@inertiajs/react";
import { BsSearch } from "react-icons/bs";
import Breadcrumbs from "@/Components/Store/Breadcrumbs";

const Index = ({ products, categories, breadcrumbs }) => {
    console.log(products, categories);
    return (
        <MainLayout>
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
                    <label className="flex items-center relative">
                        <input
                            type="text"
                            className="grow border border-primary/10 focus:border-primary transition ease-in-out focus:ring-0 py-3 px-4 placeholder:text-primary/60"
                            placeholder="Search..."
                        />
                        <BsSearch className="cursor-pointer absolute right-[16px] top-[50%] -translate-y-1/2" />
                    </label>
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
                                        ></img>
                                    </Link>
                                </div>
                                <div className="flex flex-col lg:flex-row items-start gap-4">
                                    <div className="text-[20px] hover:font-medium">
                                        <Link
                                            href={route(
                                                "store.show.product",
                                                product.slug
                                            )}
                                        >
                                            {product.name}
                                        </Link>
                                    </div>
                                    <div className="text-[32px] font-bold -order-1 lg:order-1">
                                        {product.lowest_variation_price}
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
                        >
                            &laquo; Previous
                        </Link>
                        <Link
                            href={products.links.next}
                            className="join-item btn btn-outline rounded-none"
                            preserveScroll
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
