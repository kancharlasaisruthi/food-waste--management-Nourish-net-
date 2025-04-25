import { useState } from 'react';
import { createDonation } from '../api';
import './Donate.css';

function Donate() {
  const [citizenship, setCitizenship] = useState('Indian');
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState(4000);
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    panNumber: '',
    acceptTerms: false
  });
  
  // For food donation data
  const [foodDonation, setFoodDonation] = useState({
    foodItemId: '', // This would be selected from available food items
    pickupLocation: ''
  });
  
  // Success/error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle food donation inputs
  const handleFoodDonationChange = (e) => {
    const { name, value } = e.target;
    setFoodDonation(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // For monetary donations
      if (donationType === 'once' || donationType === 'monthly') {
        // This would connect to a payment gateway
        console.log('Processing monetary donation:', {
          amount,
          donationType,
          ...formData
        });
        
        // Placeholder for payment processing
        setSubmitSuccess(true);
      } 
      // For food donations
      else {
        const response = await createDonation({
          foodItemId: foodDonation.foodItemId,
          pickupLocation: foodDonation.pickupLocation || formData.address
        });
        
        console.log('Donation created:', response.data);
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrorMessage(error.response?.data?.message || 'Error processing your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donation-container">
      {/* Show success message if submission was successful */}
      {submitSuccess ? (
        <div className="success-message">
          <h2>Thank you for your donation!</h2>
          <p>We appreciate your generosity and support.</p>
          <button onClick={() => setSubmitSuccess(false)}>Make Another Donation</button>
        </div>
      ) : (
        <>
          {/* First Card */}
          <div className="donation-card">
            <h2>Donate and Save Tax</h2>

            <div className="citizenship-section">
              <label>Citizenship*</label>
              <div className="options">
                <button
                  className={`option ${citizenship === 'Indian' ? 'selected' : ''}`}
                  onClick={() => setCitizenship('Indian')}
                  type="button"
                >
                  Indian Citizen
                </button>
                <button
                  className={`option ${citizenship === 'Foreign' ? 'selected' : ''}`}
                  onClick={() => setCitizenship('Foreign')}
                  type="button"
                >
                  Foreign Citizen/NRI
                </button>
              </div>
              <p className="info-text">
                Indian citizen option is for transacting through Indian bank accounts or cards issued by Indian banks.
              </p>
            </div>

            <div className="donation-type-section">
              <button
                className={`donation-type ${donationType === 'once' ? 'selected' : ''}`}
                onClick={() => setDonationType('once')}
                type="button"
              >
                Give Once
              </button>
              <button
                className={`donation-type ${donationType === 'monthly' ? 'selected' : ''}`}
                onClick={() => setDonationType('monthly')}
                type="button"
              >
                Give Monthly
              </button>
              <button
                className={`donation-type ${donationType === 'food' ? 'selected' : ''}`}
                onClick={() => setDonationType('food')}
                type="button"
              >
                Donate Food
              </button>
            </div>

            {donationType !== 'food' ? (
              <>
                <div className="amount-section">
                  <p>Choose an amount to donate</p>
                  <div className="amount-options">
                    {[4000, 8000, 12000, 24000].map((amt) => (
                      <button
                        key={amt}
                        className={`amount-option ${amount === amt ? 'selected' : ''}`}
                        onClick={() => setAmount(amt)}
                        type="button"
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <div className="info-section">
                    <span role="img" aria-label="heart">💛</span>
                    Ensure 4 children are completely immunized against preventable deadly diseases through the govt system
                  </div>
                </div>

                <div className="other-amount-section">
                  <p>Other Amount</p>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="other-amount-input"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="food-donation-section">
                <h3>Food Donation Details</h3>
                <label>Food Item Description</label>
                <select 
                  name="foodItemId" 
                  value={foodDonation.foodItemId}
                  onChange={handleFoodDonationChange}
                >
                  <option value="">Select Food Item</option>
                  <option value="temp-id-1">Rice (5kg)</option>
                  <option value="temp-id-2">Wheat Flour (2kg)</option>
                  <option value="temp-id-3">Vegetables (Assorted)</option>
                  {/* In a real app, you'd fetch this list from the backend */}
                </select>
                
                <label>Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Enter location for food pickup"
                  value={foodDonation.pickupLocation}
                  onChange={handleFoodDonationChange}
                />
              </div>
            )}
          </div>

          <div>
            <form onSubmit={handleSubmit} className="details-card">
              <h2>Donor Details</h2>
              
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              
              <div className="form-section">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="Enter your full name" 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />

                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob}
                  onChange={handleInputChange}
                />

                <label>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <label>Mobile Number *</label>
                <input 
                  type="tel" 
                  name="mobile" 
                  placeholder="Enter your mobile number" 
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />

                <label>Address *</label>
                <input 
                  type="text" 
                  name="address" 
                  placeholder="Enter your address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />

                <label>Pincode *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  placeholder="Enter your pincode" 
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />

                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  placeholder="Enter your city" 
                  value={formData.city}
                  onChange={handleInputChange}
                />

                <label>State</label>
                <input 
                  type="text" 
                  name="state" 
                  placeholder="Enter your state" 
                  value={formData.state}
                  onChange={handleInputChange}
                />

                <label>PAN Number</label>
                <input 
                  type="text" 
                  name="panNumber" 
                  placeholder="Enter your PAN number" 
                  value={formData.panNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="disclaimer">
                <input 
                  type="checkbox" 
                  name="acceptTerms" 
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                />
                <label>I hereby declare I am a citizen of India...</label>
                <p>Information is being collected to comply with government regulations...</p>
              </div>

              <button 
                className="payment-button" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Continue To Payment'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Donate;