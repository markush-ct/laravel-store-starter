import Container from "@/Components/Container";
import Breadcrumbs from "@/Components/Store/Breadcrumbs";
import Comments from "@/Components/Store/Comments";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import EmblaCarousel from "@/Components/Store/EmblaCarousel";
import SearchBox from "@/Components/Store/SearchBox";
import VariationItem from "@/Components/Store/VariationItem";

const Product = ({ product, categories, totalincart, breadcrumbs }) => {
    const OPTIONS = {};
    const SLIDE_COUNT = product.data.images.length;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
    const firstProductVariationId = product.data.variations[0].id
    const firstProductVariationPrice = product.data.variations[0].price

    const [totalPrice, setTotalPrice] = useState(firstProductVariationPrice)
    const [selectedVariation, setSelectedVariation] = useState(firstProductVariationId)
    const [addedToCart, setAddedToCart] = useState(false)

    const handleAddToCartProduct = (e) => {
        e.preventDefault()

        router.post(route('cart.store.product'), {
            variation_id: selectedVariation
        }, {
            preserveScroll: true,
            onSuccess: setAddedToCart(true)
        })
    }

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

                    <SearchBox filters="" />
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
                            <EmblaCarousel
                                slides={SLIDES}
                                images={product.data.images}
                                options={OPTIONS}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            {product.data.variations.map((variation, index) => (
                                <VariationItem
                                    title={variation.name}
                                    price={variation.price}
                                    id={variation.id}
                                    name="variation-id"
                                    setTotalPrice={setTotalPrice}
                                    setSelectedVariation={setSelectedVariation}
                                    index={index}
                                />
                            ))}

                            <hr className="my-5" />

                            <div className="flex justify-between text-2xl font-bold">
                                <span>Total:</span>
                                <span>{totalPrice} PHP</span>
                            </div>

                            <div className="py-10 text-right">
                                {!addedToCart ?
                                    <Link
                                        href="#"
                                        className="uppercase py-5 px-16 bg-green-600 text-white font-medium hover:bg-opacity-80 transition ease-in-out duration-300"
                                        onClick={handleAddToCartProduct}
                                        preserveState
                                        preserveScroll
                                    >
                                        Add to cart
                                    </Link> :
                                    <Link
                                        href={route('cart.index')}
                                        className="uppercase py-5 px-16 bg-orange-600 text-white font-medium hover:bg-opacity-80 transition ease-in-out duration-300"
                                    >
                                        Checkout
                                    </Link>
                                }
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

            <div className="flex justify-center">
                <Container>
                    <div className="flex gap-3 border-b border-t py-5 uppercase">
                        <span>Tags:</span>

                        <div className="flex gap-3">
                            {product.data.tags.map((tag) => (
                                <Link
                                    href={route("store.show.tag", tag.slug)}
                                    className="hover:font-bold"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Product;
