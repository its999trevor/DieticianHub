import React, { useState } from 'react';
import { Box, Typography, Button, Input } from '@mui/joy'; // Import Input component
import foodproducts from '../../api/services/food';

const Newfood = () => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [description, setDescription] = useState('');
    const [fats, setFats] = useState('');
    const [fibers, setFibers] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await foodproducts.addCustom(name, calories, description, fats, fibers, carbs, protein);
            console.log('New food item added successfully!');
            // Clear form fields
            setName('');
            setCalories('');
            setDescription('');
            setFats('');
            setFibers('');
            setCarbs('');
            setProtein('');
        } catch (error) {
            console.error('Error adding new food item:', error);
        }
    };

    return (
        <Box maxWidth="500px" mx="auto" my="250px">
            <Typography   level="h4" gutterBottom>Add New Food</Typography>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    placeholder="Calories"
                    type="number"
                    fullWidth
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                />
                <Input
                    placeholder="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    placeholder="Fats"
                    type="number"
                    fullWidth
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                />
                <Input
                    placeholder="Fibers"
                    type="number"
                    fullWidth
                    value={fibers}
                    onChange={(e) => setFibers(e.target.value)}
                />
                <Input
                    placeholder="Carbs"
                    type="number"
                    fullWidth
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                />
                <Input
                    placeholder="Protein"
                    type="number"
                    fullWidth
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                />
                <Button type="submit"   size="sm"
                  variant="solid" color="primary" fullWidth>
                    Add Food
                </Button>
            </form>
        </Box>
    );
};

export default Newfood;
