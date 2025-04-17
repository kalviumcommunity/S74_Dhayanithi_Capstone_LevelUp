import {useNavigate} from "react-router-dom"
import React from "react";

function Home(){
    const navigate = useNavigate();
    return (
        <section className="hero">
            <h1>Welcome to LevelUp</h1>
            <p>Track your Habits. Build your future.</p>

            <div>
                <button onClick={() => navigate("/login")} >Login</button>
                <button onClick={() => navigate("/signup")} >Signup</button>
            </div>
        </section>
    )
}
export default Home;


