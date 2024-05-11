import React from 'react'
import Dashboardnavbar from './Dashboardnavbar'
import { Link } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Diary = () => {
  return (

    <div>
        
        <Dashboardnavbar/>
            <div>Your food diary for <Link>prev</Link><div>Sunday, May 12,2024</div> <Link>next</Link>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DatePicker label="date"  /> </LocalizationProvider></div>
            <div className='container'>
               <table>
                <tbody>
                <tr>
                    <th>Breakfast</th>
                    <td>calories</td>
                    <td>carbs</td>
                    <td>fat</td>
                    <td>Protein</td>
                </tr>
                <tr>
                    <th>food className</th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                <th><Link to="/add/breakfast">add food</Link></th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                <th><Link to="/add/lunch">add food</Link></th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                <th><Link to="/add/dinner">add food</Link></th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>400</td>
                    <td>10</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                </tbody>
               </table>
            </div>


        </div>

        
  )
}

export default Diary