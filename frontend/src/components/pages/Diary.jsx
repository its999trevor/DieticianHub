import React, { useEffect, useState } from 'react';
import Dashboardnavbar from './Dashboardnavbar';
import dayjs from 'dayjs';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import mealService from '../api/services/mealservice';

const Diary = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [mealData, setMealData] = useState([]);
    const [macros, setMacros] = useState({
        breakfast: {
            carbs: 0,
            fats: 0,
            protein: 0
        },
        lunch: {
            carbs: 0,
            fats: 0,
            protein: 0
        },
        dinner: {
            carbs: 0,
            fats: 0,
            protein: 0
        }
    });
    const [totalmacros,setTotalmacros]=useState({
        carbs:0,
        fats:0,
        protein:0
    })
    const [usersdata,setUsersdata]=useState({})
    useEffect(() => {
        const totalmac = {
            carbs: macros.breakfast.carbs + macros.lunch.carbs + macros.dinner.carbs,
            fats: macros.breakfast.fats + macros.lunch.fats + macros.dinner.fats,
            protein: macros.breakfast.protein + macros.lunch.protein + macros.dinner.protein,
        };
        setTotalmacros(totalmac);
    }, [totalmacros]);

useEffect(() => {
    getData();
}, [selectedDate]);
useEffect(() => {
    macrosdata();
}, [selectedDate]);
async function deleteproductfrommeal(id,type,date){
    try{
    const data=await mealService.deletemeal(id,type,date);
    getData();
    macrosdata();
    console.log(data);
    }
    catch(err){
        console.log(err)
    }
}
async function macrosdata(){
    try{
        let userdata=await mealService.getData();
        // console.log(data)
        console.log(userdata)
        setUsersdata(userdata);



    }catch(err){console.log(err)}
}
async function getData() {
    try {
        let data = await mealService.getmealbyDate(selectedDate.format('MM-DD-YYYY'));
        setMealData(data);
        // console.log(data)
        if(data[0]!=null){
        const newMacros = {
            breakfast: calculateMacros(data[0].mealType.breakfast),
            lunch: calculateMacros(data[0].mealType.lunch),
            dinner: calculateMacros(data[0].mealType.dinner)
        };
        
        setMacros(newMacros);
    }
    
        // console.log(data);
    } catch (error) {
        console.error('Error fetching meal data:', error);
        }
    }

    const calculateMacros = (meal) => {
        if (meal) {
            const foodProducts = meal.foodProducts;
            let carbs = 0;
            let fats = 0;
            let protein = 0;
            foodProducts.forEach(food => {
                const { carbs: foodCarbs, fats: foodFats, protein: foodProtein } = food.productid;
                const quantity = food.quantity;
                carbs += foodCarbs * quantity;
                fats += foodFats * quantity;
                protein += foodProtein * quantity;
            });
            return { carbs, fats, protein };
        }
        return { carbs: 0, fats: 0, protein: 0 };
    };
    
    
    
  const handlePrevDay = () => {
    setSelectedDate((prevDate) => prevDate.subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => prevDate.add(1, 'day'));
  };

  return (
    <div>
      <Dashboardnavbar />
      <div>
        Your food diary for {selectedDate.format('MM-DD-YYYY')}
        <div>
          <button onClick={handlePrevDay}>prev</button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
          <button onClick={handleNextDay}>next</button>
        </div>
      </div>
               <table>
                <tbody>
                {mealData.map((meal,index)=>(
                    <React.Fragment key={index}>
                             <tr>
                    <th>Breakfast</th>
                    <td>calories</td>
                    <td>carbs</td>
                    <td>fat</td>
                    <td>Protein</td>
                    
                </tr>
                {meal.mealType.breakfast.foodProducts.map((food,index)=>(
                <tr  key={index}>
                    <th>{food.productid.name}</th>
                    <td>{food.productid.calories*food.quantity}</td>
                    <td>{food.productid.carbs}</td>
                    <td>{food.productid.fats}</td>
                    <td>{food.productid.protein}</td>
                    <td><button onClick={()=>{deleteproductfrommeal((food.productid._id),"breakfast",selectedDate.format('MM-DD-YYYY'))}}>del</button></td>
                </tr>

                ))}
                <tr>
                <th><Link to="/add/breakfast">add food</Link></th>
                    <td>{meal?meal.mealType.breakfast.calories:0}</td>
                    <td>{macros.breakfast.carbs}</td>
                    <td>{macros.breakfast.fats}</td>
                    <td>{macros.breakfast.protein}</td>
                    
                </tr>
                <tr>
                    <th>Lunch</th>
                    </tr>
                {meal.mealType.lunch.foodProducts.map((food,index)=>(
                <tr  key={index}>
                    <th>{food.productid.name}</th>
                    <td>{food.productid.calories*food.quantity}</td>
                    <td>{food.productid.carbs}</td>
                    <td>{food.productid.fats}</td>
                    <td>{food.productid.protein}</td>
                    <td><button onClick={()=>{deleteproductfrommeal((food.productid._id),"lunch",selectedDate.format('MM-DD-YYYY'))}}>del</button></td>

                </tr>
               ))}
            <tr>
                <th><Link to="/add/lunch">add food</Link></th>
                    <td>{meal?meal.mealType.lunch.calories:0}</td>
                    <td>{macros.lunch.carbs}</td>
                    <td>{macros.lunch.fats}</td>
                    <td>{macros.lunch.protein}</td>
            </tr>
                <tr>
                    <th>Dinner</th>
                </tr>
                {meal.mealType.dinner.foodProducts.map((food,index)=>(
                <tr  key={index}>
                    <th>{food.productid.name}</th>
                    <td>{food.productid.calories*food.quantity}</td>
                    <td>{food.productid.carbs}</td>
                    <td>{food.productid.fats}</td>
                    <td>{food.productid.protein}</td>
                    <td><button onClick={()=>{deleteproductfrommeal((food.productid._id),"dinner",selectedDate.format('MM-DD-YYYY'))}}>del</button></td>

                </tr>
               ))}
                <tr>
                <th><Link to="/add/dinner">add food</Link></th>
                    <td>{meal?meal.mealType.dinner.calories:0}</td>
                    <td>{macros.dinner.carbs}</td>
                    <td>{macros.dinner.fats}</td>
                    <td>{macros.dinner.protein}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>{meal?meal.totalCalories:0}</td>
                    <td>{totalmacros.carbs.toFixed(2)}</td>
                    <td>{totalmacros.fats.toFixed(2)}</td>
                    <td>{totalmacros.protein.toFixed(2)}</td>
                </tr>
              
               
                    
                    </React.Fragment>
                ))
                
                
            }
               
              
                
               
                
                
               
                
                </tbody>
               </table>

               <div>
            <Macr val={usersdata.calorieseaten} max={usersdata.userBMR} macrostype={'Calories'}/>
            <Macr val={totalmacros.carbs} max={parseFloat(((usersdata.userBMR*0.60)/4).toFixed(2))} macrostype={'Carbs'}/>
            <Macr val={totalmacros.fats} max={parseFloat(((usersdata.userBMR*0.60)/9).toFixed(2))} macrostype={'Fats'}/>
            <Macr val={parseFloat((totalmacros.protein).toFixed(2))} max={parseFloat(((usersdata.userBMR*0.15)/4).toFixed(2))} macrostype={'Protein'}/>
               </div>


        </div>

        
  )
}


 


 const Macr = ({val,max,macrostype}) => {
  return (
    <>
    <Gauge
  value={val}
  valueMax={max}
  startAngle={0}
  endAngle={360}
  height={120}
  width={150}
  sx={{
      [`& .${gaugeClasses.valueText}`]: {
          fontSize: 14,
          transform: 'translate(0px, 0px)',
        },
    }}
    text={
        ({ value, valueMax }) => `${value} / ${valueMax}     `
    }
/><span>{macrostype}</span>

    </>
  )
}


export default Diary