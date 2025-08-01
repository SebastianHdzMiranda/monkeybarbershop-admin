import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import menu from '/menu.svg'
import { useState } from 'react'

function Header() {
    const [ viewMenu, setViewMenu ] = useState(false);

    const handleMenu = (e) => {
        e.preventDefault();
        setViewMenu(!viewMenu);
    }

    return (
        <div className='header'>
            <div className="logoContainer">
                <a href="/" className='logo-enlace'>
                    <img className='logo' src={logo} alt="Logo" />
                </a>
            </div>

            <div className='header__menu'>
                <div className="header__menu-link">
                    <a href="#" onClick={handleMenu}>
                        <img className='header__menu-img' src={menu} alt="menu img" />
                    </a>
                </div>



                <nav className={`navegacion ${viewMenu ? 'navegacion--activo' : ''}`}>
                    <ul className="navegacion__list">
                        <li className="navegacion__item">
                            <Link to={`/`} className="navegacion__enlace" onClick={e => setViewMenu(!viewMenu)}>Registros</Link>
                        </li>
                        <li className="navegacion__item">
                            <Link to={`/registerDay`} className="navegacion__enlace" onClick={e => setViewMenu(!viewMenu)}>Registros de Asistencia</Link>
                        </li>
                    </ul>
                </nav>
            </div>


        </div>
    )
}

export default Header