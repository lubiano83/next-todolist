"use client";
import { useState } from "react";

export const useShow = () => {
    try {
        const [show, setShow] = useState(false);
    
        const handleShow = () => {
            setShow(!show);
        };
    
        return {handleShow, show};
    } catch (error) {
        console.log("useShow", error.message);
    }
};