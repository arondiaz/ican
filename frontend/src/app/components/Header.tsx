import React from 'react'

const Header = ({title= "", className=""}) => {
  return (
    <div>
        <h2 className={className}>{title}</h2>
    </div>
  )
}

export default Header