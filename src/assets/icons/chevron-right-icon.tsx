const ChevronRightIcon = ({color = "#09090B", size = "16"}: { color?: string, size?: string }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12L10 8L6 4" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

export default ChevronRightIcon;
