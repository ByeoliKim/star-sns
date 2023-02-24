import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile () {
    const navigate = useNavigate();
    const onLogOutClick = () => { 
        authService.signOut();
        navigate("/");
    }
    return(
        <>
            <p>Profile 페이지 입니다!</p>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}