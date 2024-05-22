import React, { useEffect, useState } from 'react';
import Dashboardnavbar from './Dashboardnavbar';
import dayjs from 'dayjs';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Link, useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import mealService from '../api/services/mealservice';
import { Box,Table,Sheet, Input, Stack,Button, Typography } from '@mui/joy';
import Footer from './Footer';

const Diary = () => {
    const { date } = useParams();   
    const [selectedDate, setSelectedDate] = useState(date ? dayjs(date) : dayjs());
   
    const [mealData, setMealData] = useState([]);
    const [calsate,setCalsate]=useState(0);
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
        // console.log(userdata)
        setUsersdata(userdata);



    }catch(err){console.log(err)}
}
async function getData() {
    try {
        let data = await mealService.getmealbyDate(selectedDate.format('MM-DD-YYYY'));
        setMealData(data);

        console.log(data)
        if(data[0]!=null){
        const newMacros = {
            breakfast: calculateMacros(data[0].mealType.breakfast),
            lunch: calculateMacros(data[0].mealType.lunch),
            dinner: calculateMacros(data[0].mealType.dinner)
        };
        
        setCalsate(data[0].totalCalories);
        setMacros(newMacros);
    }
    else{
        setCalsate(0);
        const newMacros = {
            breakfast: 0,
            lunch: 0,
            dinner: 0
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
    <>
      <Dashboardnavbar />
      <Box width={1000}
      
       mx={55} px={5} py={5} my={3}  display={"flow"} boxShadow={"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"}>

      <Box>
        <Stack spacing={3}>

      <Typography
            level="h3"
            variant="plain"
            >

        Your food diary for {selectedDate.format('MM-DD-YYYY')}
        </Typography>
        <Box >
        <Stack direction="row" spacing={3}>
          <Button sx={{width:"80px",height:"30px",position:"relative",top:"10px"}} onClick={handlePrevDay}>prev</Button>
          <LocalizationProvider dateAdapter={AdapterDayjs}>  
            <DatePicker
              label="date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              />
          </LocalizationProvider>
          <Button sx={{width:"80px",height:"30px",position:"relative",top:"10px"}} onClick={handleNextDay}>next</Button>
              </Stack>
        </Box>
              </Stack>
      </Box>
      <Box mx={3} my={3}>
      <Sheet
        variant="outlined"
    
        sx={{
          '--TableCell-height': '40px',
          // the number is the amount of the header rows.
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          // background needs to have transparency to show the scrolling shadows
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition:
            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
          backgroundColor: 'background.surface',
        }}
      >

               <Table       
                             borderAxis="bothBetween"
                             stripe="odd"
                             hoverRow
                             sx={{
                               '& tr > *:first-child': {
                                 position: 'sticky',
                                 left: 0,
                                 boxShadow: '1px 0 var(--TableCell-borderColor)',
                                 bgcolor: 'background.surface',
                               },
                               '& tr > *:last-child': {
                                 position: 'sticky',
                                 right: 0,
                                 bgcolor: 'var(--TableCell-headBackground)',
                               }
                             }}
               >
                <tbody>
                    <tr>
           <th>Breakfast</th>
           <td>calories</td>
           <td>carbs</td>
           <td>fat</td>
           <td>Protein</td>
           <td></td>
           
       </tr>
       {mealData.length === 0 && (
        <>
            <tr>
        <th>
        <Link to={`/add/breakfast/${selectedDate}`}>Add breakfast</Link>
        </th>
        </tr>
        <tr>
                <th>

            <Link to={`/add/lunch/${selectedDate}`}>Add lunch</Link>
                </th>
        </tr>
        <tr>
            <th>

            <Link to={`/add/dinner/${selectedDate}`}>Add dinner</Link>
            </th>
        </tr>
        </>
        
        
    )}
                {mealData.map((meal,index)=>(
                    <React.Fragment key={index}>
                {meal.mealType.breakfast.foodProducts.map((food,index)=>(
                    <tr  key={index}>
                    <th>{food.productid.name}</th>
                    <td>{food.productid.calories*food.quantity}</td>
                    <td>{food.productid.carbs}</td>
                    <td>{food.productid.fats}</td>
                    <td>{food.productid.protein}</td>
                    <td><Button size="md" variant="soft" color="danger" onClick={()=>{deleteproductfrommeal((food.productid._id),"breakfast",selectedDate.format('MM-DD-YYYY'))}}>Delete</Button></td>
                </tr>

))}
                <tr>
                <th><Link to={`/add/breakfast/${selectedDate}`}>add food</Link></th>
                    <td>{meal?meal.mealType.breakfast.calories:0}</td>
                    <td>{macros.breakfast.carbs}</td>
                    <td>{macros.breakfast.fats}</td>
                    <td>{macros.breakfast.protein}</td>
                    <td></td>
                    
                </tr>
                <tr>
                    <th colSpan={6}>Lunch</th>
                    </tr>
                {meal.mealType.lunch.foodProducts.map((food,index)=>(
                    <tr  key={index}>
                    <th>{food.productid.name}</th>
                    <td>{food.productid.calories*food.quantity}</td>
                    <td>{food.productid.carbs}</td>
                    <td>{food.productid.fats}</td>
                    <td>{food.productid.protein}</td>
                    <td><Button size="md" variant="soft" color="danger" onClick={()=>{deleteproductfrommeal((food.productid._id),"lunch",selectedDate.format('MM-DD-YYYY'))}}>Delete</Button></td>

                </tr>
               ))}
            <tr>
                <th><Link to={`/add/lunch/${selectedDate}`}>add food</Link></th>
                    <td>{meal?meal.mealType.lunch.calories:0}</td>
                    <td>{macros.lunch.carbs}</td>
                    <td>{macros.lunch.fats}</td>
                    <td>{macros.lunch.protein}</td>
                    <td></td>
            </tr>
                <tr>
                    <th colSpan={6}>Dinner</th>
                </tr>
                {meal.mealType.dinner.foodProducts.map((food,index)=>(
                    <tr  key={index}>
                    <th>{food.productid.name}</th>
                    <td>{food.productid.calories*food.quantity}</td>
                    <td>{food.productid.carbs}</td>
                    <td>{food.productid.fats}</td>
                    <td>{food.productid.protein}</td>
                    <td><Button size="md" variant="soft" color="danger" onClick={()=>{deleteproductfrommeal((food.productid._id),"dinner",selectedDate.format('MM-DD-YYYY'))}}>Delete</Button></td>

                </tr>
               ))}
                <tr>
                <th><Link to={`/add/dinner/${selectedDate}`}>add food</Link></th>
                    <td>{meal?meal.mealType.dinner.calories:0}</td>
                    <td>{macros.dinner.carbs}</td>
                    <td>{macros.dinner.fats}</td>
                    <td>{macros.dinner.protein}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>{meal?meal.totalCalories:0}</td>
                    <td>{totalmacros.carbs.toFixed(2)}</td>
                    <td>{totalmacros.fats.toFixed(2)}</td>
                    <td>{totalmacros.protein.toFixed(2)}</td>
                    <td></td>
                </tr>
              
               
                    
                    </React.Fragment>
                ))
                
                
            }
               
              
                
               
                
                
               
                
                </tbody>
               </Table>
               </Sheet>
                             </Box>

               <Stack direction="row" spacing={1} mx={22} my={5} >
            <Macr val={calsate} max={usersdata.userBMR} macrostype={'Calories'}/>
            <Macr val={totalmacros.carbs} max={parseFloat(((usersdata.userBMR*0.60)/4).toFixed(2))} macrostype={'Carbs'}/>
            <Macr val={totalmacros.fats} max={parseFloat(((usersdata.userBMR*0.60)/9).toFixed(2))} macrostype={'Fats'}/>
            <Macr val={parseFloat((totalmacros.protein).toFixed(2))} max={parseFloat(((usersdata.userBMR*0.15)/4).toFixed(2))} macrostype={'Protein'}/>
               </Stack>


            </Box>
            <Footer/>
        </>

        
  )
}


 


 const Macr = ({val,max,macrostype}) => {
  return (
    <Box>
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
/><Typography sx={{paddingLeft:"58px"}} level="title-sm" variant="plain" >{macrostype}</Typography>

    </Box>
  )
}


export default Diary