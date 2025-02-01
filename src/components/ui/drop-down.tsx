import React, {useEffect, useRef, useState} from "react";
import {CheckIcon, ChevronDownIcon} from "@/assets/icons";

type Placement = "bottom-left" | "bottom-right" | "bottom-center" | "top-left" | "top-right";
type Trigger = "click" | "hover";

interface DropdownProps {
  data: any[]
  onChange?: (value: string) => void;
  label?: string;
  name?: string;
  error?: string;
  placement?: Placement;
  space?: number;
  isDismissible?: boolean;
  trigger?: Trigger[];
}

// const Portal: React.FC<{ children: ReactNode }> = ({children}) => {
//   return ReactDom.createPortal(children, document.body);
// };

const Dropdown: React.FC<DropdownProps> = ({
                                             onChange,
                                             data,
                                             label,
                                             name,
                                             error,
                                             placement = "bottom-center",
                                             space = 5,
                                             isDismissible = true,
                                             trigger = ["click"],
                                           }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      setInputWidth(elementRef.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);

  useEffect(() => {
    if (!isDismissible || !isOpen) return;
    const checkAndHideDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        elementRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener("click", checkAndHideDropdown);
    return () => document.removeEventListener("click", checkAndHideDropdown);
  }, [isOpen, isDismissible]);

  const handleMouseEnter = () => {
    if (!trigger.includes("hover")) return;
    setIsOpen(true);
    updateDropdownPosition();
  };

  const handleMouseLeave = () => {
    if (!trigger.includes("hover")) return;
    setIsOpen(false);
  };

  const handleClick = () => {
    if (!trigger.includes("click")) return;
    setIsOpen((prev) => !prev);
    updateDropdownPosition();
  };

  const updateDropdownPosition = () => {
    if (!dropdownRef.current || !elementRef.current) return;
    const {x, y} = getPoint(
      elementRef.current,
      dropdownRef.current,
      placement,
      space
    );
    dropdownRef.current.style.left = `${x}px`;
    dropdownRef.current.style.top = `${y}px`;
  };

  const getPoint = (
    element: HTMLElement,
    dropdown: HTMLElement,
    placement: Placement,
    space: number
  ) => {
    const eleRect = element.getBoundingClientRect();
    const pt = {x: 0, y: 0};
    switch (placement) {
      case "bottom-left": {
        pt.x = eleRect.left;
        pt.y = eleRect.bottom + space;
        break;
      }
      case "bottom-right": {
        pt.x = eleRect.right - dropdown.offsetWidth;
        pt.y = eleRect.bottom + space;
        break;
      }
      case "bottom-center": {
        pt.x = eleRect.left + (element.offsetWidth - dropdown.offsetWidth) / 2;
        pt.y = eleRect.bottom + space;
        break;
      }
      case "top-left": {
        pt.x = eleRect.left - dropdown.offsetWidth - space;
        pt.y = eleRect.top;
        break;
      }
      case "top-right": {
        pt.x = eleRect.right + space;
        pt.y = eleRect.top;
        break;
      }
    }
    return pt;
  };

  const handleSelect = (val: string) => {
    setValue(data.find(elem => String(elem.id) === val).name);
    setIsOpen(false);

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <>
      <label htmlFor={name} className='text-gray-100'>
        {label}
      </label>
      <div className='relative w-full'>
        <input
          ref={elementRef}
          id={name}
          name={name}
          readOnly={true}
          className={`cursor-pointer w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${error ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby={`${name}-error`}
          value={value}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        />

        <span
          className={`absolute right-2 top-[60%] cursor-pointer transform -translate-y-1/2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={handleClick}
        >
          <ChevronDownIcon/>
        </span>

        {isOpen && <div
          ref={dropdownRef}
          className='absolute mt-2 z-50 shadow-custom-dropdown rounded-md transition'
          style={{width: inputWidth ? `${inputWidth}px` : 'auto'}}
        >
          <ul className='bg-white'>
            {data.map((item, i) => {
              console.log(value, item.id)
              return (
                <li
                  key={i}
                  className='flex items-center border-b border-[#E1E3E3] p-[9px] hover:bg-gray-50 cursor-pointer text-sm'
                  onClick={() => handleSelect(String(item.id))}
                >
                  <div
                    className={`flex items-center justify-center me-4 h-[22px] w-[22px] rounded-full border border-[#09090B] ${value === item.name && 'bg-black'}`}>
                    {value === item.name && <CheckIcon/>}
                  </div>
                  {item.name}
                </li>
              )
            })}
          </ul>
        </div>}
      </div>

      <div className="text-sm mt-2 text-red-500">{error}</div>
    </>
  );
};

export default Dropdown;
