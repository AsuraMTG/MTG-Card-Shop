import githublogo from '../public/githublogo.png' ;
import wotc from '../public/wotc-logo.webp';
import "./Footer.css";
const Footer = () => {
    return (
        <footer
            className="footer text-center p-3 mt-5"
            style={{ backgroundColor: 'var(--header-bg)', color: 'white' }}
        >
            <div className="flex justify-center gap-3 mt-2 d-flex justify-content-evenly">
                <a href="https://github.com/AsuraMTG/MTG-Card-Shop" target="_blank" className="logo-link">
                    <img src={githublogo} alt="Github-logo" target="_blank"
                    className='footer-logo' />
                </a>
                <a href="https://magic.wizards.com/en" target="_blank" className='logo-link'>
                    <img src={wotc} alt="Wizards-Logo" target="_blank"
                    className='footer-logo' />

                </a>
            </div>
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} MTG Card Shop.</p>
            </div>
        </footer>
    );
}

export default Footer;
