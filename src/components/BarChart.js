import React, {useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

export default function BarChart({data}){
    useEffect(()=>{
        // console.log(data);
    });
    return(
        <Bar
            data={data}
        />
    )
}