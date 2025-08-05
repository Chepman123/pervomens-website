import './NavButton.css';

export default function NavButton({children}:{children:React.ReactNode}){
    return(
        <button className='navButton'>{children}</button>
    );
}