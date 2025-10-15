import React from "react";
import Layout from "./layout/Layout";
import AddBlog from "./pages/AddBlog";
import BlogList from "./pages/BlogList";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddAbout from "./pages/AddAbout";
import AddContact from "./pages/AddContact";
import AddHero from "./pages/AddHero";
import AddSeting from "./pages/AddSeting";
import AddIcone from "./pages/AddIcone";
import MainContent from "./pages/frontend/MainContent";
import Header from "./pages/frontend/Header";
import Footer from "./pages/frontend/Footer";
import FrontendLayout from "./layout/FrontendLayout";
import AllArticles from "./pages/frontend/AllArticles";
import BlogPage from "./pages/frontend/BlogPage";
import Category from "./pages/frontend/Category";
import SearchPage from "./pages/frontend/SearchPage";
import About from "./pages/frontend/About";
import Contact from "./pages/frontend/Contact";
import GetInTouch from "./pages/GetInTouch";





export default function Routing() {
  return (
    <Routes>

<Route path="/" element={<FrontendLayout />}>
        <Route index element={<MainContent />}/>
        <Route path="show/:id" element={<BlogPage />}/>
        <Route path="header" element={<Header />} />
        <Route path="footer" element={<Footer />} />
        <Route path="all" element={<AllArticles />} />
        <Route path="nev/:category" element={<Category />} />
        <Route path="search/:search" element={<SearchPage />} />
         <Route path="about" element={<About />} />
         <Route path="contact" element={<Contact/>} />
         
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="deshboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="add-blog" element={<AddBlog />} />
        <Route path="edit-blog/:id" element={<AddBlog />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="das" element={<Dashboard />} />
        <Route path="addabout" element={<AddAbout />} />
        <Route path="addcontact" element={<AddContact />} />
         <Route path="addcontact/getintouch" element={<GetInTouch />} />
        <Route path="addhero" element={<AddHero/>} />
        <Route path="addseting" element={<AddSeting/>} />
        <Route path="addicone" element={<AddIcone/>} />
      </Route>
      
    </Routes>
  );
}
