import {Link } from 'react-router-dom'



const Navbar = () => {

    return (
        <nav className='navbar'>

            <Link to = "/">
            <img src="/favicon-white.png" alt="logo" className='nav-logo' />
            
            </Link>

            <Link to = "/champions" className='nav-link'>Champion Stats</Link>
        </nav>





    )

}

export default Navbar