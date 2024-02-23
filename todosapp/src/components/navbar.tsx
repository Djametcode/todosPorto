import { FiHome, FiFileText, FiPlus, FiMail, FiUser } from "react-icons/fi";
import {
  GoPerson,
  GoHome,
  GoChecklist,
  GoPlus,
  GoComment,
} from "react-icons/go";

export default function NavbarComponent() {
  return (
    <div className=" w-full h-[65px] bg-slate-50 fixed bottom-0 border-t z-40">
      <div className=" flex w-full justify-around h-full items-center">
        <GoHome size={28} />
        <GoChecklist size={25} />
        <div className=" bg-indigo-400 p-3 rounded-full text-white">
          <GoPlus size={28} />
        </div>
        <GoComment size={25} />
        <GoPerson size={28} />
      </div>
    </div>
  );
}
