import './Search.css'

function Search(){
    return(
        <div className='search-wrapper'>
            <h1 className='heading'>POKEDEX</h1>
           <input
            type="text" 
            placeholder="Search a Pokemon ......"
            id='search' /> 
            
        </div>
    )
}

export default Search;