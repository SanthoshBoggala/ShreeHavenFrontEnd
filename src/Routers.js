import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SingleProductPage from './SingleProductPage/SingleProductPage';
import CartPage from './CartPage/CartPage';
import ProductPage from './ProductsPage/ProductsPage';
import ProfilePage from './ProfilePage/ProfilePage';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import ContactPage from './ContactPage/ContactPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import MyOrdersPage from './MyOrdersPage/MyOrdersPage';
import UploadProductPage from './UploadProductPage/UploadProductPage';
import TypeCategory from './TypeCategory/TypeCategory';
import StylesForYouPage from './StylesForYouPage/StylesForYouPage';
import TopRatedPage from './TopRatedPage/TopRatedPage';
import BuyPage from './BuyPage/BuyPage';
import NotFoundAndUnAuthorized from './Components/NotFoundAndUnAuthorized/NotFoundAndUnAuthorized';

const Routers = () => {
  return ( 
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path='/products/:category/:id' element={<SingleProductPage />} />
        <Route path='/products/:category/:id/buy' element={<BuyPage />} />
        <Route path='/products/:category/:id/edit' element={<UploadProductPage />} />
        <Route path="/products/styles/:id" element={<StylesForYouPage />} />
        <Route path="/products/top_rated/:id" element={<TopRatedPage />} />
        <Route path="/products/for_you/:id" element={<StylesForYouPage />} />
        <Route path="/my/cart" element={<CartPage />} />
        <Route path="/my/profile" element={<ProfilePage />} />
        <Route path="/my/orders" element={<MyOrdersPage />} />
        <Route path="/my/all_orders" element={<MyOrdersPage />} />
        <Route path="/my/reviews" element={<ProfilePage />} />
        <Route path="/my/upload_product" element={<UploadProductPage />} />
        <Route path="/my/type_category" element={<TypeCategory />} />
        <Route path='/:notAPage' element={<NotFoundAndUnAuthorized type={'notFound'}/>} />
    </Routes>
  );
};

export default Routers;
