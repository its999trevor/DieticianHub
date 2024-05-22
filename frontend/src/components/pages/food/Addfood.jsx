import React, { useState, useEffect } from 'react';
import Dashboardnavbar from '../Dashboardnavbar';
import { useParams } from 'react-router-dom';
import foodproducts from '../../api/services/food';
import mealService from '../../api/services/mealservice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Typography, Button, Autocomplete, Input, Checkbox, Modal } from '@mui/joy';
import Newfood from './Newfood';

const Addfood = () => {
    const { mealtype, date } = useParams();
    const [selectedDate, setSelectedDate] = useState(dayjs(date));
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [options, setOptions] = useState([]);
    const [recentItems, setRecentItems] = useState([]);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            if (name) {
                const data = await foodproducts.getData(name);
                setOptions(data);
            }
        };
        fetchOptions();
    }, [name]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('recentItems')) || [];
        setRecentItems(storedItems.map(item => ({ ...item, checked: false })));
    }, []);

    const searchHandler = async (event, value) => {
        setName(value);
        if (value) {
            const data = await foodproducts.getData(value);
            setSearchResults(data.map(item => ({ ...item, quantity: 1, checked: false })));
        }
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

    const addCheckedItems = async () => {
        try {
            const checkedItems = searchResults.filter(item => item.checked);
            const foodProducts = checkedItems.map(item => ({
                productid: item._id,
                quantity: item.quantity || 1 
            }));
            await mealService.postMeal(mealtype, foodProducts, selectedDate.format('MM-DD-YYYY'));
            updateRecentItems(checkedItems);
            navigate(`/diary/${selectedDate.format('YYYY-MM-DD')}`);
        } catch (error) {
            console.error('Error adding checked items to meal:', error);
        }
    };

    const updateRecentItems = (items) => {
        const updatedItems = [...recentItems];
        items.forEach(item => {
            if (!updatedItems.some(recentItem => recentItem._id === item._id)) {
                updatedItems.push(item);
            }
        });
        localStorage.setItem('recentItems', JSON.stringify(updatedItems.slice(-10)));
        setRecentItems(updatedItems.slice(-10).map(item => ({ ...item, checked: false })));
    };

    const toggleRecentChecked = (itemId) => {
        setRecentItems(recentItems.map(item =>
            item._id === itemId ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleRecentQuantityChange = (itemId, quantity) => {
        setRecentItems(recentItems.map(item =>
            item._id === itemId ? { ...item, quantity: parseInt(quantity) } : item
        ));
    };

    const addRecentItems = async () => {
        try {
            const checkedItems = recentItems.filter(item => item.checked);
            const foodProducts = checkedItems.map(item => ({
                productid: item._id,
                quantity: item.quantity || 1 
            }));
            await mealService.postMeal(mealtype, foodProducts, selectedDate.format('MM-DD-YYYY'));
            navigate(`/diary/${selectedDate.format('YYYY-MM-DD')}`);
        } catch (error) {
            console.error('Error adding recent items to meal:', error);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Dashboardnavbar />
            <Box mx={2} my={2}>
                <Typography level="h1" color="primary" variant="plain">Add food to {mealtype}</Typography>
                <Typography level="title-md" color="primary" variant="plain">Search our food database by name</Typography>
                
                <Autocomplete
                    sx={{ width: '300px' }}
                    options={options}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(event, value) => searchHandler(event, value)}
                    renderInput={(params) => <Input {...params} placeholder="Search food" />}
                />
                <Box mx={2} my={2}>
                    {searchResults.map((item) => (
                        <Box key={item._id} display="flex" alignItems="center" my={1}>
                            <Checkbox
                                checked={item.checked}
                                onChange={() => toggleChecked(item._id)}
                            />
                            <Typography sx={{ mx: 2 }}>{item.name}</Typography>
                            <Input 
                                type="number" 
                                name="quantity" 
                                value={item.quantity} 
                                onChange={(e) => handleQuantityChange(item._id, e.target.value)} 
                                sx={{ width: '80px' }}
                            />
                        </Box>
                    ))}
                    <Button onClick={addCheckedItems} sx={{ mt: 2 }}>Add Checked</Button>
                </Box>
                <Typography level="h3" color="primary" variant="plain">or, add your recent items for {mealtype}</Typography>
                <Box mx={2} my={2}>
                    {recentItems.map((item) => (
                        <Box key={item._id} display="flex" alignItems="center" my={1}>
                            <Checkbox
                                checked={item.checked}
                                onChange={() => toggleRecentChecked(item._id)}
                            />
                            <Typography sx={{ mx: 2 }}>{item.name}</Typography>
                            <Input 
                                type="number" 
                                name="quantity" 
                                value={item.quantity} 
                                onChange={(e) => handleRecentQuantityChange(item._id, e.target.value)} 
                                sx={{ width: '80px' }}
                            />
                        </Box>
                    ))}
                    <Button onClick={addRecentItems} sx={{ mt: 2 }}>Add Checked Recent Items</Button>
                </Box>
                <Button onClick={handleOpenModal} sx={{ mt: 2 }}>Add Custom Food</Button>
                {/* Modal for adding custom food */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Newfood handleCloseModal={handleCloseModal} />
                </Modal>
            </Box>
        </div>
    );
};

export default Addfood;
