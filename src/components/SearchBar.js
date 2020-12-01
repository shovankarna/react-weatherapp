import React from 'react';


export default function SearchBar(props) {
    return (
        <div className='searchbar-container'>
            <form className='searchbar' onSubmit={(e) => props.changeLocation(e)}>
                <input placeholder='Enter Location' onChange={(e) => props.changeRegion(e.target.value)
                } />
            </form>
        </div>
    )
}
