import './DetailsButton.css';

export default function DetailsButton({children}:{children:React.ReactNode}){
    return(
        <button className='DetailsButton'>{children}</button>
    );
}