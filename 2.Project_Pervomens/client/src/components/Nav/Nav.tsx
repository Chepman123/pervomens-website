import './Nav.css';
import logo from '/logo.png';

export default function Nav(){
    return (
        <nav>
            <img src={logo}/>
            <h1>Pervomens games</h1>
            <div className='borderDiv'/>
            <p>Horror, survival, roguelikes games — for mobile and PC</p>
        </nav>
    )
}