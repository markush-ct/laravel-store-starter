import Container from "@/Components/Container";
import Breadcrumbs from "@/Components/Store/Breadcrumbs";
import Comments from "@/Components/Store/Comments";
import Ratings from "@/Components/Store/Ratings";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

const Product = ({ product, categories, breadcrumbs }) => {
    console.log(product);
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
                <Container>
                    <h1 className="text-3xl font-bold">{product.data.name}</h1>

                    <div className="grid grid-cols-12 gap-10 py-10">
                        <div className="col-span-12 md:col-span-7 flex justify-center md:justify-start">
                            <img
                                src={product.data.images[0].url}
                                alt="Product image"
                                className="size-[400px] md:size-[500px]"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            {product.data.variations.map((variation) => (
                                <div
                                    className="text-xl flex justify-between items-center gap-5"
                                    key={variation.id}
                                >
                                    <div className="flex gap-8 items-center py-5">
                                        <input
                                            type="radio"
                                            id={variation.id}
                                            name="variation-price"
                                            value={variation.id}
                                            className="size-7 rounded-none focus:ring-0 focus:ring-offset-0 text-primary"
                                        />
                                        <label
                                            htmlFor={variation.id}
                                            className="cursor-pointer"
                                        >
                                            {variation.name}
                                        </label>
                                    </div>
                                    <div>{variation.price} PHP</div>
                                </div>
                            ))}

                            <hr className="my-5" />

                            <div className="flex justify-between text-2xl font-bold">
                                <span>Total:</span>
                                <span>500 PHP</span>
                            </div>

                            <div className="py-10 text-right">
                                <button
                                    type="button"
                                    className="uppercase py-5 px-16 bg-green-600 text-white font-medium hover:bg-opacity-80 transition ease-in-out duration-300"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="flex justify-center">
                <Container className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Description</h2>
                        <p>{product.data.long_description}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-5">
                            Customer Reviews
                        </h2>

                        <div className="space-y-5">
                            {product.data.reviews.map((review) => (
                                <Comments
                                    id={review.id}
                                    rating={review.rating}
                                    comment={review.comment}
                                    user={review.user}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Product;
