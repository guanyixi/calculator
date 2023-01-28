import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, Title} from 'chart.js/auto';


export default function BarChart({data}){
    return(
        <Bar
            data={data}
        />
    )
}