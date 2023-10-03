import React from 'react'
import spiner from './spiner.gif'

const Spiner=()=> {
  
    return (
      <div className="text-center">
         <img className='my-3' src={spiner} alt="loading" />
      </div>
    )
  
}
export default Spiner;
