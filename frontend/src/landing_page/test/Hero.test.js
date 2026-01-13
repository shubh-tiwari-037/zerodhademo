import React from "react";
import {render, screen}  from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect";
import Hero from "../landing_Page/home/Hero.jest";

describe("Hero Component",()=>{
    test ("renders hero image",()=>{
        render (<Hero/>);
        const heroImage = screen.getByAltText("Hero Image");
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute("src","media/images/homeHero.png")
    });
});