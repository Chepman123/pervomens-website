import NavButton from '../Buttons/NavButton/NavButton';
import './Nav.css';
import logo from '/logo.png';

export default function Nav(){
    return (
        <nav id="games">
            <img src={logo}/>
            <h1>Pervomens games</h1>
            <div className='borderDiv'/>
            <p>Horror games, survival, roguelikes — for mobile and PC</p>
        </nav>
    )
}