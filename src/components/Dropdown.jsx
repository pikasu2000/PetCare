import { useState, useEffect, useRef } from "react";

// Reusable Dropdown Component

function Dropdown({ trigger, items, className = "", triggerClassName = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 hover:text-green-500 ${triggerClassName}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-green-600 rounded-md shadow-lg transition-all duration-200 z-50">
          {items.map((item, index) => (
            <item.component
              key={index}
              to={item.to}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
            >
              {item.label}
            </item.component>
          ))}
        </div>
      )}
    </div>
  );
}
export default Dropdown;
