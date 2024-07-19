import React, { useState, useEffect } from 'react';
import Dashboardnavbar from '../Dashboardnavbar';
import { useParams } from 'react-router-dom';
import foodproducts from '../../api/services/food';
import mealService from '../../api/services/mealservice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Typography, Button, Autocomplete, Input, Checkbox, Modal } from '@mui/joy';
import Newfood from './Newfood';
import { FaCamera } from "react-icons/fa";


const Addfood = () => {
    const { mealtype, date } = useParams();
    const [selectedDate, setSelectedDate] = useState(dayjs(date));
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [recentItems, setRecentItems] = useState([]);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [image,setImage]=useState();
    const [imageUrl,setImageUrl]=useState();
    const [resExists,setResExists]=useState(false);
    const [aiProd,setAiProd]=useState(false);

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
        setSelectedItems(selectedItems.map(item =>
            item._id === itemId ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleQuantityChange = (itemId, quantity) => {
        setSelectedItems(selectedItems.map(item =>
            item._id === itemId ? { ...item, quantity: parseInt(quantity) } : item
        ));
    };

    const addCheckedItems = async () => {
        try {
            const checkedItems = selectedItems.filter(item => item.checked);
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

    const handleSelectItem = (event, value) => {
        const item = searchResults.find(result => result._id === value._id);
        if (item && !selectedItems.some(selected => selected._id === item._id)) {
            setSelectedItems([...selectedItems, { ...item, checked: false }]);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const submitImage= async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("image",image);
        let data=await foodproducts.upload(formData);
    
        console.log(data);
        if(data){
            setAiProd(data);
            setResExists(true);
        }
        


    }
    const onInp=(e)=>{
        const file = e.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    }
    const aiProdSubmmit=async(e)=>{
        // console.log(prodata)
        let data=await foodproducts.addCustom(aiProd.name,aiProd.calories,aiProd.description,aiProd.fats,aiProd.fibers,aiProd.carbs,aiProd.protein);
        console.log(data);
        let foodProducts=[new Object()];
        if(data.exists){
             foodProducts =[new Object({
                productid:data.newData[0]._id,
                quantity:1
            })]
        }
        else{
         foodProducts =[new Object({
            productid:data.data._id,
            quantity:1
        })]
    }
    navigate(`/diary/${selectedDate.format('YYYY-MM-DD')}`);
    console.log(foodProducts);
    
        
        
 let data1=await mealService.postMeal(mealtype, foodProducts, selectedDate.format('MM-DD-YYYY'));
//  console.log(data1);
        

    }

    return (
        <div>
            <Dashboardnavbar />
            
            <Box mx={2} my={2}>
                <form onSubmit={submitImage}>
                <input type='file' accept='image/*' onChange={onInp}></input>
                <img src={imageUrl}  style={{ width: "300px" }}></img>
            <Button type="submit"><FaCamera  style={{fontSize:"34px"}} /></Button>
                </form>
                {resExists &&(<Typography level="h4" color="primary">{aiProd.description}</Typography>)}
                {resExists &&(
                    <Button onClick={aiProdSubmmit}>add this item</Button>)}
                <Typography level="h1" color="primary" variant="plain">Add food to {mealtype}</Typography>
                <Typography level="title-md" color="primary" variant="plain">Search our food database by name</Typography>
                
                <Autocomplete
                    sx={{ width: '300px' }}
                    options={options}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(event, value) => searchHandler(event, value)}
                    onChange={handleSelectItem}
                    renderInput={(params) => <Input {...params} placeholder="Search food" />}
                />
                <Box mx={2} my={2}>
                    {selectedItems.map((item) => (
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
