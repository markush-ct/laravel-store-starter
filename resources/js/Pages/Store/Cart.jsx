import React from 'react'
import MainLayout from "@/Layouts/MainLayout";
import Container from '@/Components/Container';
import { Link, router } from '@inertiajs/react';
import Breadcrumbs from '@/Components/Store/Breadcrumbs';
import AlertMessage from '@/Components/Store/AlertMessage';

const Cart = ({totalincart, cart, carttotalprice, breadcrumbs, flash}) => {
    const handleRemoveProductInCart = (variationId) => {
        router.post(route('cart.remove.product'), {
            variation_id: variationId
        }, {preserveScroll: true})
    }

    return (
        <MainLayout totalincart={totalincart}>
            <div className="flex justify-center">
                <Container className="text-center py-10">
                    <h1 className='text-3xl font-bold uppercase'>Cart</h1>
                </Container>
            </div>

            <div className="flex justify-center">
                <Breadcrumbs data={breadcrumbs} />
            </div>

            {flash && (
                <div className='flex justify-center'>
                    <Container>
                        <AlertMessage type={flash && flash.success ? 'success': 'danger'} message={flash}/>
                    </Container>
                </div>
            )}

            {totalincart === 0 && (
                <div className="flex justify-center">
                    <Container className='py-10'>
                        <div className="flex flex-col items-center gap-10">
                            <p className='uppercase opacity-60'>There are no items in your cart now</p>
                            <Link
                                href={route('store.index')}
                                className="uppercase py-5 px-16 border border-primary font-medium hover:bg-primary hover:text-white transition ease-in-out duration-300"
                            >
                                Go Shopping
                            </Link>
                        </div>
                    </Container>
                </div>
            )}

            <div className="flex justify-center">
                <Container className="space-y-10">
                    {cart.data.map((item) => (
                        <div key={item.variation.id} className="flex flex-col md:flex-row border">
                            <div className='flex'>
                                <Link href={route('store.show.product', item.product.slug)}>
                                    <img
                                        src={item.product.cover_image}
                                        alt="Product cover image"
                                        className='aspect-square size-60'
                                    />
                                </Link>
                                <div className='md:hidden px-10 py-5 text-right flex-grow'>
                                    <a href="#" className="link" onClick={() => handleRemoveProductInCart(item.variation.id)}>
                                        Remove
                                    </a>
                                </div>
                            </div>

                            <div className="flex-grow space-y-5 py-5 px-10">
                                <div className="text-right hidden md:block">
                                    <a href="#" className="link" onClick={() => handleRemoveProductInCart(item.variation.id)}>
                                        Remove
                                    </a>
                                </div>
                                <div className="flex flex-col gap-5 md:flex-row justify-between items-start">
                                    <div className="flex flex-col gap-2">
                                        <Link href={route('store.show.product', item.product.slug)}>
                                            <h1 className="text-3xl font-bold">
                                                {item.product.name}
                                            </h1>
                                        </Link>
                                        <p className="text-xl">
                                            {item.variation.name}
                                        </p>
                                    </div>

                                    <div className="text-3xl font-medium">
                                        {item.variation.price} <span className="text-xl">PHP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {totalincart > 0 && (
                        <div className="text-3xl text-right font-bold">
                            <div className='inline-flex'>
                                <div className='mr-28'>Total: </div>
                                <div>
                                {carttotalprice} <span className="text-xl">PHP</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </div>

            <div className="flex justify-center">
                <Container className="py-10 uppercase">
                    <div className="join grid grid-cols-2">
                        <Link
                            href={cart.links.prev}
                            className="join-item btn btn-outline rounded-none"
                            preserveScroll
                            preserveState
                        >
                            &laquo; Previous
                        </Link>
                        <Link
                            href={cart.links.next}
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
}

export default Cart
