const CloseIcon = ({color = "#000", size = "20"}: { color?: string, size?: string }) => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20">
      <path fill={color}
            d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"></path>
    </svg>
  );
};

export default CloseIcon;
