import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Receiver() {
    const obj = useLocation();
    const [currentUser, setCurrentUser] = useState(obj.state);
    const [donations, setDonations] = useState([]);

    // Fetch data from the donations endpoint
    useEffect(() => {
      fetch('http://localhost:5000/api/donations/available')
        .then((response) => response.json())
        .then((data) => setDonations(data))
        .catch((error) => console.error('Error fetching donations:', error));
    }, []);
    


    const handleOrder = async (donationId) => {
      const quantity = prompt('Enter the quantity you need:');
      if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
        alert('Please enter a valid number.');
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:5000/api/donations/order/${donationId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestedQuantity: parseInt(quantity) })
        });
    
        const result = await response.json();
    
        if (response.ok) {
          alert(result.message);
          // Refresh donations
          const updatedData = await fetch('http://localhost:5000/api/donations/available').then(res => res.json());
          setDonations(updatedData);
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error('Order failed:', err);
        alert('Failed to place order.');
      }
    };
    

    return (
        <div>
            <center>
                <h3 className='p-3'>Hey! {currentUser.name}, I'm glad you are back....</h3>
                <h3>These are the available food items:</h3>
            </center>
            <div className="donation-list" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {donations.length > 0 ? (
                    donations.map((donation) => (
                        <div key={donation.id} className="donation-card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', width: '200px', textAlign: 'center' }}>
                            <h4>{donation.food}</h4>
                            <p><strong>Quantity:</strong> {donation.foodQuantity}</p>
                            <p><strong>FoodItem:</strong> {donation.foodItem}</p>
                            <p><strong>Expiration date:</strong> {donation.expirationdate}</p>
                            <p><strong>Food hub location:</strong> {donation.address}</p>
                            <button
                              onClick={() => handleOrder(donation._id)}
                                style={{backgroundColor: '#556B2F',color: '#fff',padding: '0.5rem 1rem',borderRadius: '4px',border: 'none',cursor: 'pointer'}}>
                                Order
                            </button>

                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading available food items...</p>
                )}
            </div>
        </div>
    );
}

export default Receiver;