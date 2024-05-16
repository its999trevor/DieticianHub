import React, { useState,useEffect } from 'react';
import Dashboardnavbar from '../Dashboardnavbar';
import { useParams } from 'react-router-dom';
import foodproducts from '../../api/services/food';
import mealService from '../../api/services/mealservice';
import {useNavigate,Link} from 'react-router-dom'

const Addfood = () => {
    const { mealtype } = useParams();
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const searchHandler = async (e) => {
        e.preventDefault();
        const data = await foodproducts.getData(name);
        setSearchResults(data.map(item => ({ ...item, quantity: 1 }))); // Initialize quantity to 1
    };

    const toggleChecked = (itemId) => {
        setSearchResults(searchResults.map(item =>
            item._id === itemId ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleQuantityChange = (itemId, quantity) => {
        setSearchResults(searchResults.map(item =>
            item._id === itemId ? { ...item, quantity: parseInt(quantity) } : item
        ));
    };

    const addCheckedItems = async (e) => {
        try {
            const checkedItems = searchResults.filter(item => item.checked);
            const foodProducts = checkedItems.map(item => ({
                productid: item._id,
                quantity: item.quantity || 1 
            }));
            await mealService.postMeal(mealtype, foodProducts);
            navigate("/diary");
        } catch (error) {
            console.error('Error adding checked items to meal:', error);
        }
    };

    return (
        <div>
            <Dashboardnavbar />
            <h1>Add food to {mealtype}</h1>
            <h3>Search our food database by name</h3>
            <form onSubmit={searchHandler}>
                <input onChange={(e) => setName(e.target.value)} placeholder='search' />
                <button type="submit">search</button>
            </form>
            <div>
                {searchResults.map((item) => (
                    <div key={item._id}>
                        <input
                            type="checkbox"
                            id={item._id}
                            name="food"
                            value={item.name}
                            checked={item.checked || false}
                            onChange={() => toggleChecked(item._id)}
                        />
                        <label htmlFor={item._id}>{item.name}</label>
                        <input 
                            type="number" 
                            name="quantity" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item._id, e.target.value)} 
                        />
                    </div>
                ))}
                <button onClick={addCheckedItems}>add checked</button>
            </div>
            <h3>or, add your favorites for {mealtype}</h3>
            <button>add checked</button>
        </div>
    );
};

export default Addfood;
