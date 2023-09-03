import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface LeftSideBarItemProps {
  key: string;
  label: string;
  route: string;
  icon: React.ReactElement;
  auth?: boolean;
}

const LeftSideBarItem: React.FC<LeftSideBarItemProps> = ({
  key,
  label,
  route,
  icon,
}) => {
  return (
    <Link href={route} key={key} className="flex flex-row items-center ">
      <div
        className="
          relative 
          rounded-full 
          h-16 
          w-16 
          flex 
          items-center 
          justify-center 
          p-4 
          hover:bg-slate-300 
          hover:bg-opacity-10 
          cursor-pointer 
          lg:hidden"
      >
        {icon}
      </div>
      <div
        className="
          relative 
          hidden 
          lg:flex 
          items-row 
          gap-4 
          p-4 
          rounded-full 
          items-row 
          hover:bg-slate-300 
          hover:bg-opacity-10 
          cursor-pointer 
          items-center"
      >
        {icon}
        <p className="hidden lg:block text-heading4-medium text-light-1">
          {label}&nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </Link>
  );
};

export default LeftSideBarItem;
