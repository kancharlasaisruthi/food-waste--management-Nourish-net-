import React from 'react';
import { useNavigate } from 'react-router-dom';
import register5 from "../assets/register5.png";
import register6 from "../assets/register6.jpg";
import register7 from "../assets/register7.jpg";
import image2 from "../assets/image2.jpeg"
import image3 from "../assets/image3.jpeg"
import './home.css';

function Home() {
    const navigate = useNavigate();
    
    function moveToRegister() {
        navigate('/register');
    }
    
    function moveToLogin() {
        navigate('/login');
    }
    
    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay">
                    <h1 className="hero-title">W E L C O M E</h1>
                    <h3 className="hero-subtitle">"Turn excess into impact. <br /> Share food, share hope."</h3>
                    <button className="hero-button" onClick={moveToRegister}>Join Our Mission</button>
                </div>
            </div>
            
            {/* Mission Section */}
            <div className="mission-section">
                <div className="mission-content">
                    <h2 className="section-title">Our Mission</h2>
                    <p className="mission-text">
                        At Food Hub, we believe that no food should go to waste while people go hungry. 
                        Our platform connects food donors with those in need, creating a community of 
                        sharing and support. Through our network of volunteers, donors, and receivers, 
                        we're building a more sustainable and compassionate world.
                    </p>
                </div>
                <div className="mission-image-container">
                    <div className="mission-image-placeholder">
                        <span>
                            <img src={image2} alt="" style={{width:'400px',height:'300px',borderRadius: '15px',boxShadow:'var(--shadow)'}}/>
                        </span>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="how-it-works">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Register</h3>
                        <p>Create an account as a donor, receiver, or volunteer</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Connect</h3>
                        <p>Donors list available food, receivers browse listings. Find your nearby food hub location and donate excess food.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Share</h3>
                        <p>Volunteers help facilitate the food transfer process</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Impact</h3>
                        <p>Track your contributions and see the difference you make</p>
                    </div>
                </div>
            </div>
            
            {/* Cards Section */}
            <div className="user-roles-section">
                <h2 className="section-title">Join Our Community</h2>
                <div className="cards-container">
                    {/* Donor Card */}
                    <div className="user-card">
                        <div className="card-header donor">
                            <h2>Food Donor</h2>
                        </div>
                        <div className="card-body">
                            <img src={register5} alt="Donor" className="card-avatar" />
                            <p className="card-text">Have excess food to share? Register as a donor to help reduce food waste and feed those in need.</p>
                            <button className="card-button donor-btn my-4" onClick={moveToRegister}>
                                Become a Donor
                            </button>
                        </div>
                    </div>
                    
                    {/* Receiver Card */}
                    <div className="user-card">
                        <div className="card-header receiver">
                            <h2>Food Receiver</h2>
                        </div>
                        <div className="card-body">
                            <img src={register6} alt="Receiver" className="card-avatar" />
                            <p className="card-text">Need food assistance? Register as a receiver to connect with local food donations in your area.</p>
                            <button className="card-button receiver-btn my-4" onClick={moveToRegister}>
                                Register as Receiver
                            </button>
                        </div>
                    </div>
                    
                    {/* Volunteer Card */}
                    <div className="user-card">
                        <div className="card-header volunteer">
                            <h2>Volunteer</h2>
                        </div>
                        <div className="card-body">
                            <img src={register7} alt="Volunteer" className="card-avatar" />
                            <p className="card-text">Want to make a difference? Join our volunteer network to help coordinate food donations.</p>
                            <button className="card-button volunteer-btn my-4" onClick={moveToRegister}>
                                Volunteer Sign Up
                            </button>
                        </div>
                    </div>
                    
                    {/* Login Card */}
                    <div className="user-card">
                        <div className="card-header login">
                            <h2>Existing User</h2>
                        </div>
                        <div className="card-body">
                            <img src={register5} alt="Login" className="card-avatar" />
                            <p className="card-text">Already registered? Sign in to your account to continue making a difference.</p>
                            <button className="card-button login-btn my-4" onClick={moveToLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="impact-section">
                <div className="impact-image-container">
                    <div className="impact-image-placeholder">
                        <img src={image3} alt="" style={{width:'400px',height:'300px',borderRadius:'15px',boxShadow:' var(--shadow)'}} />
                    </div>
                </div>
                <div className="impact-content">
                    <h2 className="section-title">Our Impact</h2>
                    <div className="stats-container">
                        <div className="stat">
                            <span className="stat-number">10,000+</span>
                            <span className="stat-label">Meals Shared</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Active Donors</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">1,000+</span>
                            <span className="stat-label">Families Helped</span>
                        </div>
                    </div>
                    <p className="impact-text">
                        Together, we're reducing food waste and addressing hunger in our communities.
                        Join us in making a meaningful difference, one meal at a time.
                    </p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                <h2 className="section-title">What Our Community Says</h2>
                <div className="testimonials-container">
                    <div className="testimonial">
                        <p>"As a restaurant owner, I love that I can now donate our excess food instead of throwing it away. The process is simple and rewarding."</p>
                        <span className="testimonial-author">- Sarah, Food Donor</span>
                    </div>
                    <div className="testimonial">
                        <p>"Food Hub has been a blessing for my family during tough times. The dignity and ease of the process make all the difference."</p>
                        <span className="testimonial-author">- Michael, Food Receiver</span>
                    </div>
                    <div className="testimonial">
                        <p>"Volunteering with Food Hub gives me purpose. Connecting donors and receivers creates such meaningful impact in our community."</p>
                        <span className="testimonial-author">- James, Volunteer</span>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="footer-cta">
                <h2>Ready to Make a Difference?</h2>
                <p>Join our community today and be part of the solution to food waste and hunger.</p>
                <button className="cta-button" onClick={moveToRegister}>Get Started Now</button>
            </div>
        </div>
    );
}

export default Home;