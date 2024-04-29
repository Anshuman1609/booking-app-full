import React, { useState } from 'react';

const Test = () => {
    
    const [isOpen, setIsOpen] = useState(null);

    const handleClick = (entry) => {
        setIsOpen(isOpen === entry ? null : entry);
    };

    return (
        <div className='Entries'>
            <div onClick={() => handleClick('home')} className="primaries">
                <h2>Home</h2>
                {/* {isOpen === 'home' && <ul>
                    <li>Home1</li>
                    <li>Home2</li>
                </ul>} */}
            </div>
            <div onClick={() => handleClick('identity')} className="primaries">
                <h2>Identity</h2>

                { isOpen === 'identity' && <ul>
                    <li>User</li>
                    <li>Sales</li>
                </ul>}
            </div>
            <div onClick={() => handleClick('sales')} className="primaries">
                <h2>Sales</h2>

                {isOpen === 'sales' && <ul>
                    <li>Order</li>
                    <li>Shipment</li>
                </ul>}
            </div>

        </div>
    )
}

export default Test;
// Home
// Identity
// 	User
// 	Role
// Sales
// 	Orders
// 	Shipments
