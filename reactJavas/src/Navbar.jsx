import {Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { supabase  } from './supabaseClient'



const Navbar = () => {


    const [user, setUser] = useState(null)


useEffect(() =>{
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const {data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
}, [])







const handleLogout = async () => {
    await supabase.auth.signOut()
}



    return (
        <nav className='navbar'>

            <Link to = "/">
            <img src="/favicon-white.png" alt="logo" className='nav-logo' />
            
            </Link>

            <Link to = "/champions" className='nav-link'>Champion Stats</Link>


            {user ? (
                <div className='nav-user'>
                    <span>{user.user_metadata?.full_name || user.email}</span>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            ) : (
                <Link to="/login" className='nav-signin'>Sign in</Link>
            )
        }
        </nav>





    )

}

export default Navbar