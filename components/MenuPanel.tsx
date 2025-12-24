import { MenuIcon, X } from "lucide-react";

interface Props {
  isMenuActive: boolean;
  setIsMenuActive: (value: boolean) => void;
}

const MenuPanel = ({ isMenuActive, setIsMenuActive }: Props) => {
  return (
    <div className="z-50 absolute right-5 top-6">
      {!isMenuActive ? (
        <button
          onClick={() => setIsMenuActive(true)}
          aria-label="Open menu"
        >
          <MenuIcon className="text-white" size={30} />
        </button>
      ) : (
        <button
          onClick={() => setIsMenuActive(false)}
          aria-label="Close menu"
        >
          <X className="text-primary" size={30} />
        </button>
      )}
    </div>
  );
};

export default MenuPanel;