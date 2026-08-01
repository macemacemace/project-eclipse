import { useEffect } from "react";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Navbar from './Navbar'
import './LoginPage.css'



const LoginPage = () => {






    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [isSignUp,setIsSignUp] =useState(false);
    const [error,setError] =useState(null);
    const [loading,setLoading] =useState(false);


    const navigate = useNavigate()


    const handleEmailAuth = async(e)=>{
        e.preventDefault()
        setError(null)
        setLoading(true)

        const {error} = isSignUp
        ?await supabase.auth.signUp({email, password})
        : await supabase. auth.signInWithPassword({email, password})

        setLoading(false)


        if (error) {
            setError(error.message)
        } else {
            navigate('/')
        }
    }



   const handleGoogle = async () =>{
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
    })
}

return (
    <div className="loginPage">
        <Navbar />

        <div className="loginBox">

            <h1>{isSignUp ? 'Create an account' : 'Welcome back'}</h1>
            <form onSubmit={handleEmailAuth}>
                <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                 />

                 <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                />

                {error &&  <div className="loginError">{error}</div>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Please wait...' : isSignUp ? 'Sign up' : 'Log in'}
                </button>
            </form>

            <div className="loginDivider"><span>or</span></div>

            <button className="googleBtn" onClick={handleGoogle}>
                Continue with Google
            </button>

            <p className="loginToggle">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </div>

    </div>

    
)








}

export default LoginPage;