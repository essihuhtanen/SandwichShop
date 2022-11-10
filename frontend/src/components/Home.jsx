import picture from '../pics/homepagepicture.jpg'
import './Home.css';

const Home = () => {
    return (
        <div className='home-page'>
            <img
                className="picture"
                src={picture}
                alt="Picture of sandwiches"
            />
            <h1 className='header'>Welcome to the site of BestSandwich</h1>
        </div>
    )
}

export default Home;