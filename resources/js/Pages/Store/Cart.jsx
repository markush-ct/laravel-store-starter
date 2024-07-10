import React from 'react'
import MainLayout from "@/Layouts/MainLayout";
import Container from '@/Components/Container';

const Cart = ({totalincart, cart}) => {
    console.log(cart);

    return (
        <MainLayout totalincart={totalincart}>
            <div className='flex justify-center'>
                <Container className="space-y-10">
                    {cart.map((item) => (
                        <div key={item.product_id} className='flex border'>
                            <div className='aspect-square size-60'>
                                <img src={item.product.cover_image} alt="Product cover image" />
                            </div>

                            <div className='flex-grow space-y-5 py-5 px-10'>
                                <div className='text-right'>
                                    <a href="#" className='link'>Remove</a>
                                </div>
                                <div className='flex justify-between items-start'>
                                    <div className='flex flex-col gap-3'>
                                        <h1 className='text-3xl font-bold'>{item.product.name}</h1>
                                        <p className='text-xl'>{item.variation.name}</p>
                                    </div>

                                    <div className='text-3xl font-medium'>
                                        {item.variation.price} <span className='text-xl'>PHP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Container>
            </div>
        </MainLayout>
    )
}

export default Cart
