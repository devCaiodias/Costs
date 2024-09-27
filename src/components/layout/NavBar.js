import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

import Container from './Container';
import logo from '../../img/costs_logo.png'

function NavBar() {
    return (
        <nav className={styles.navBar}>
            <Container>
                <Link to='/' ><img src={logo} alt='costs'/> </Link>
                <ul className={styles.list}>
                    <li className={styles.itens}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.itens}>
                        <Link to="/Projects">Projetos</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default NavBar;