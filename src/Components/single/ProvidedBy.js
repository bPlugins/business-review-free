const ProvidedBy = ({ isIcon, name }) => {
    return isIcon && <div className="providedBy">
        <p className='text'>Posted On</p>
        <a href="#" className='provider'>{name}</a>
    </div>
}
export default ProvidedBy;