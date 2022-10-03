import React from 'react'
import {HiMenuAlt1} from 'react-icons/hi';
import {RiShoppingCart2Line} from 'react-icons/ri';
import '../Top.css';

const Top = () => {
    return (
        <>
        <div id="topDeg">
            <HiMenuAlt1 className="topbar" id="iMenu"/>
            <div id="cCarrito">
            <RiShoppingCart2Line className="topbar" id="iCarrito"/>
            </div>
        </div>
        </>
    )
}

export default Top
