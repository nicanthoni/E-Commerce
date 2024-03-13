// Parent component to neatly render other Home components within
import React from "react";
import HomeInfo from "./HomeInfo"
import HomeModels from "./HomeModels"
import "./HomeMain.css";

export default function HomeMain() {
    return (
        <main className="home-main-Container">
            <HomeInfo/>
            <HomeModels/>
        </main>
    )
}