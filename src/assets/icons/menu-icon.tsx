const MenuIcon = ({color = "#000", size = "20"}: { color?: string, size?: string }) => {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20">
      <path color={color} d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z"></path>
    </svg>
  );
}

export default MenuIcon;
