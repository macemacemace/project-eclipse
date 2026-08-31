import {Link } from 'react-router-dom'
import {useState, useEffect,useRef} from 'react'
import { supabase  } from './supabaseClient'




const Navbar = () => {


    const [user, setUser] = useState(null)
    const[favourites, setFavourites] = useState([])
    const[favOpen, setFavOpen] = useState(false)
    const favRef = useRef(null)


useEffect(() =>{
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const {data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
}, [])



const toggleFavourites = async () => {
    if (favOpen) {
        setFavOpen(false)
        return
    }

    setFavOpen(true)

    const { data, error } = await supabase
        .from('favourites')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error.message)
        return
    }

    setFavourites(data)
}

useEffect(() => {
    function handleClickOutside(e) {
        if (favRef.current && !favRef.current.contains(e.target)) {
            setFavOpen(false)
        }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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

            {user && (
    <div className='favDropdown' ref={favRef}>
        <div className='favSelected' onClick={toggleFavourites}>
            <span>My Favourites</span>
        </div>

        {favOpen && (
            <div className='favOptions'>
                {favourites.length === 0 && (
                    <div className='favEmpty'>No favourites yet</div>
                )}

                {favourites.map(fav => (
                    <Link
                        key={fav.id}
                        to={`/${fav.region}/${fav.name}/${fav.tag}`}
                        className='favOption'
                        onClick={() => setFavOpen(false)}
                    >
                        {fav.name} #{fav.tag}
                    </Link>
                ))}
            </div>
        )}
    </div>
)}
           


            {user ? (
                <div className='nav-user'>
                    <span>{user.user_metadata?.username || user.user_metadata?.full_name || user.email}</span>
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