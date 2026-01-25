import React, { useState } from 'react'

const Nabvar = () => {
  const [count, setCount] = useState(0)
  
  const increaseCount = ()=>{
    setCount(count+1)
  }

  const decreaseCount = ()=>{
    setCount(count-1)
  }
  return (
    <div>
      I am Navbar.
      <br/>
      {count}
      <br/>
      <button onClick={increaseCount}>Increase</button>
      <br/>
      <button onClick={decreaseCount}>Decrease</button>
    </div>
  )
}

export default Nabvar
