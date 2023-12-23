import React, { useState } from 'react';

import Barchart from './Barchart';
import Areachart from './Areachart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';


const Chartscontainer = () => {

    const [barchart,setbarchart] = useState(true)
    
    //we are giving an alias of data to monthlyApplications
    const {monthlyApplications: data} = useSelector((store)=>store.alljobs)

  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' onClick={()=>{setbarchart(!barchart)}}>
            {barchart ? 'Area Chart': 'Bar Chart'}
        </button>
        {barchart? <Barchart data={data}/> : <Areachart data={data}/>}
    </Wrapper>
  )
}
export default Chartscontainer