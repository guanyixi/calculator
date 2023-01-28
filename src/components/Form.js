import React from 'react';
import {useState, useEffect} from 'react';

export default function Form({data, setData}){

    const [initial, setInitial] = useState(10000);
    const [pmt, setPmt] = useState(1000);
    const [rate, setRate] = useState(6);
    const [years, setYears] = useState(10);
    const [fv, setFv] = useState();
    const [contribution, setContribution] = useState();

    useEffect(()=>{
        calcTotal();
    });

    function valueChange(e){
        const id = e.target.id;
        const value = e.target.value;

        // Binding data
        switch(id){
            case 'initial':
                if(Number(value) > 10000000){
                    setInitial(10000000);
                }else if(Number(value) < 0){
                    setInitial(0);
                }else{
                    setInitial(value);
                }
                break;
            case 'pmt':
                if(Number(value) > 1000000){
                    setPmt(1000000);
                }else if(Number(value) < 0){
                    setPmt(0);
                }else{
                    setPmt(value);
                }
                break; 
            case 'rate':
                if(Number(value) > 15){
                    setRate(15);
                }else if(Number(value) < 0){
                    setRate(0);
                }else{
                    setRate(value);
                }
                break; 
            case 'years':
                if(Number(value) > 30){
                    setYears(30);
                }else if(Number(value) < 0){
                    setYears(0);
                }else{
                    setYears(value);
                }
                break;   
        }

        calcTotal();
       
    }

    function calcOneTime(initial, rate, years){
        // Compounding frequency: monthly, 12 periods per year.
        const n = 12;
        return initial * Math.pow((1 + rate/100/ n), years * n);
    }

    function calcOngoing(pmt, rate, years){
        // Compounding frequency: monthly, 12 periods per year.
        const n = 12;
        return pmt * (Math.pow( 1 + rate/100/n, years*n ) - 1)/ (rate/100/n);
    }

    function calcTotal(){
        const oneTime = calcOneTime(initial, rate, years);
        const ongoing = calcOngoing(pmt, rate, years);

        const total = (oneTime + ongoing).toFixed(2);

        setFv(total);


        //this is causing error
        setContribution((Number(pmt)*12*Number(years)+Number(initial)).toFixed(2));
       

        prepareData();
    }

    function prepareData(){
        let userData = [];
        for(let year = 1; year <= years; year++){
            const userDataObj = {
                year: year,
                value: (calcOneTime(initial, rate, year) + calcOngoing(pmt, rate, year)).toFixed(2)
            }
            userData.push(userDataObj);
        }

        if(userData && rate > 0 && years > 0){
            setTimeout(()=>{
                setData({
                    labels: userData.map((item)=> item.year),
                    datasets: [
                      {
                        type: 'bar',
                        label: "Investment Growth",
                        data: userData.map((item)=> item.value),
                        backgroundColor: '#008ba3',
                      }
                    ]
                });
            }, 500);
        }
    }

    function formatNum(num){
        return num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    return(
        <div className="form">
            <div>
                <label htmlFor="initial">Starting Amount</label>
                <input onChange={valueChange} type="number" id="initial" value={initial} min="100" max="10000000" step="100"/>
            </div>
            <div>
                <label htmlFor="pmt">Monthly Contribution</label>
                <input onChange={valueChange} type="number" id="pmt" value={pmt} min="0" max="1000000" step="100"/>
            </div>
            <div className="rate-input">
                <label htmlFor="rate">Annual Rate</label>
                <input onChange={valueChange} type="number" id="rate" value={rate} min="0" max="15" step="0.1"/>
            </div>
            <div>
                <label htmlFor="years">Years to Grow</label>
                <input onChange={valueChange} type="number" id="years" value={years} min="1" max="30" step="1"/>
            </div>
            <div className="note">Compound monthly & <br/>Interest paid monthly.</div>
            {
                fv &&
                <div className="worth">
                    <span>TOTAL WORTH</span>
                    <strong>${formatNum(fv)}</strong>
                    <span>Total Contribution</span>
                    <strong className="smaller">${formatNum(contribution)}</strong>
                    <span>Return</span>
                    <strong className="smaller">${ formatNum((fv - contribution).toFixed(2))}</strong>
                </div>
            }
        </div>
    )
}