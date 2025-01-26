const EyeIcon = ({color = "#09090B"}: { color?: string, size?: string }) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M11.0711 5.42871L4 12.4998L11.0711 19.5708L12.4853 18.1566L7.83 13.4997L21 13.4998V11.4998L7.83 11.4997L12.4853 6.84292L11.0711 5.42871Z"
            fill={color}/>
    </svg>
  );
};

export default EyeIcon;
