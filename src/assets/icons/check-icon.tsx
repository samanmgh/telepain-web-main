const CheckIcon = ({color = "#fff", size = "16"}: { color?: string, size?: string }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M13.3333 5.40704L6.07954 12.6667L2.66663 9.37617L4.07915 7.96913L6.07954 9.85258L11.9208 4L13.3333 5.40704Z"
            fill={color}/>
    </svg>
  );
};

export default CheckIcon;
