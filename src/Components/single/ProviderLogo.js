const ProviderLogo = ({ isIcon, icon }) => {
    return isIcon && <div className="providerLogo">
        {icon}
    </div>
}
export default ProviderLogo;