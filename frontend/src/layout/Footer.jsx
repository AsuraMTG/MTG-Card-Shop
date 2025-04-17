import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css";
function Footer() {
    return (
        <footer
            className="footer text-center p-3 mt-5"
            style={{ backgroundColor: 'var(--header-bg)', color: 'white' }}
        >
            <div className="flex justify-center gap-3 mt-2 d-flex justify-content-evenly">
                <a href="#" className="text-white hover:text-blue-300 flex items-center gap-1">
                    <FontAwesomeIcon icon={faFacebookF} />&nbsp;
                    Facebook
                </a>
                <a href="#" className="text-white hover:text-blue-300 flex items-center gap-1">
                    <FontAwesomeIcon icon={faTwitter} />&nbsp;
                    Twitter
                </a>
                <a href="#" className="text-white hover:text-blue-300 flex items-center gap-1">
                    <FontAwesomeIcon icon={faInstagram} />&nbsp;
                    Instagram
                </a>
            </div>
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} MTG Card Shop. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
