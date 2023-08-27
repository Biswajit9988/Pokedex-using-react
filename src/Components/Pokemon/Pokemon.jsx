import './Pokemon.css'

function Pokemon({name, image, alt, height}){
    return(
        <div className="pokemon-card">
        <div className='pokemon-image-wrapper'>
        <img src={image} alt={alt} className='pokemon-image'/>
        </div>
        <h1 className='pokemon-name'>{name}</h1>
        <div className='pokemon-data'>
            <div>Height: {height}</div>
        </div>
        </div>
    )
}

export default Pokemon;