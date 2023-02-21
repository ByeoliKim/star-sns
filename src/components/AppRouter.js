import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

export default function AppRouter () {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </>
    )
}