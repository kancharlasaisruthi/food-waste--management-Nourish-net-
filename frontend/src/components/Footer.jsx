
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-section donations">
            <h3>ABOUT US</h3>
            <p> Our mission is to create a sustainable food system that connects excess food from donors to those in need in our community. By establishing local food hubs, we aim to reduce food waste while providing nutritious meals to individuals and families who may be facing food insecurity.</p>
            <p>Click the below button if you wish to Donate.</p>
           
            <Link to="donate" className='nav-link p-2' style={{background: '#f0a500',color:'white' ,width:'100px'}}>Donate Fund</Link>
          </div>

        
          <div className="footer-section contact">
            <h3>CONTACT US</h3>
            <address>
              WZ-49/2A F/F, Budella Village,<br />
              Near Community Hall, Vikas Puri,<br />
              New Delhi – 110018 Delhi, India<br /><br />
              Email : myangelsacademy@gmail.com<br />
              Mobile: +91 7701927625, +91 9654793872<br />
            </address>
            <div className="social-icons">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://www.linkedin.com/in/sruthi-kancharla-862736303/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
