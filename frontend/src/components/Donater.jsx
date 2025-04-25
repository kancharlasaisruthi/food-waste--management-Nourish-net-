import  { useState } from 'react';
import './donater.css'; // We'll use a separate CSS file for styling
import { useLocation } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
function DonorPage () {
    const navigate=useNavigate();
  const [foodDetails, setFoodDetails] = useState({
    foodType: '',
    quantity: '',
    expirationDate: '',
    condition: '',
    storage: '',
    qualityAssured: false,
  });
  const obj = useLocation();
  const [err,setErr]=useState()
  const [currentUser, setCurrentUser] = useState(obj.state);
  const {register,handleSubmit,formState:{errors}}=useForm()
  function handleFormSubmit(formData) {
    const newDonation = {
      name: currentUser.username,
      email: currentUser.email,
      phone: currentUser.phone,
      foodType: formData.foodType,
      foodItem: formData.food,
      foodQuantity:  parseInt(formData.quantity),
      address: formData.address,
      city: formData.city,
      expirationdate: formData.expiration,
      storagemethod: formData.storage,
      condition: formData.condition || ''
    };
  
    fetch('http://localhost:5000/api/donations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDonation)
    })
      .then(res => {
        if (res.status === 201) {
          console.log(newDonation)
          console.log(formData)
          navigate('/thankyou');
        } else {
          setErr({ message: res.message });
        }
      })
      .catch(err => setErr(err));
  }
  

  return (
    <div className="donor-page">
        <div >
            <h3 className='p-3'>Hey! {currentUser.name} I'am glad you are back....</h3>
        </div>
      <div className="guide-section">
        <h2>Donor Guidelines</h2>
        <p>
          Welcome, and thank you for your interest in donating! Please ensure the following:
        </p>
        <ul>
          <li>Only donate foods that are fresh or safely packaged.</li>
          <li>No expired items are allowed.</li>
          <li>Properly package and label your food donations.</li>
          <li>Perishable items should be refrigerated or frozen as necessary.</li>
        </ul>
      </div>

      <form className="donation-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <h3>Food Donation Form</h3>
        
        <label>
          Food Type:
          <select value={foodDetails.foodType}
          {...register("foodDetails")} onChange={(e) => setFoodDetails({ ...foodDetails, foodType: e.target.value })}>
            <option value="">Select Food Type</option>
            <option value="Fresh Produce">Fresh Produce</option>
            <option value="Bakery">Bakery</option>
            <option value="Packaged">Packaged</option>
            <option value="Prepared Meals">Prepared Meals</option>
          </select>
        </label>
        <br />
        <label htmlFor="food">What food:</label>
        <input type="text" {...register("food")} />
        <label>
          Quantity:
          <input type="text" {...register("quantity")} onChange={(e) => setFoodDetails({ ...foodDetails, quantity: e.target.value })} required />
        </label>
        
        <label>
          Expiration Date (if applicable):
          <input type="date" {...register("expiration")} onChange={(e) => setFoodDetails({ ...foodDetails, expirationDate: e.target.value })} />
        </label>
        
        <h3>Food Quality Check</h3>
        <label>
          Condition:
          <select value={foodDetails.condition} {...register("condition")} onChange={(e) => setFoodDetails({ ...foodDetails, condition: e.target.value })}>
            <option value="">Select Condition</option>
            <option value="Fresh">Fresh</option>
            <option value="Near Expiry">Near Expiry</option>
            <option value="Frozen">Frozen</option>
            <option value="Non-perishable">Non-perishable</option>
          </select>
        </label>
        
        <label>
          Storage Method:
          <select value={foodDetails.storage} onChange={(e) => setFoodDetails({ ...foodDetails, storage: e.target.value })}>
            <option value="">Select Storage</option>
            <option value="Refrigerated">Refrigerated</option>
            <option value="Frozen">Frozen</option>
            <option value="Room Temperature">Room Temperature</option>
          </select>
        </label>

        <label >Address of food hub Drop point
        <input type="text"  {...register("address")} onChange={(e) => setFoodDetails({ ...foodDetails, address: e.target.value })} />
        </label>
        <label >City of food hub Drop point
        <input type="text"  {...register("city")} onChange={(e) => setFoodDetails({ ...foodDetails, city: e.target.value })} />
        </label>
        <label>
          <input
            type="checkbox"
            checked={foodDetails.qualityAssured}
            onChange={() => setFoodDetails({ ...foodDetails, qualityAssured: !foodDetails.qualityAssured })}
          />
          I confirm that the food is safe and was stored properly.
        </label>
        
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default DonorPage;