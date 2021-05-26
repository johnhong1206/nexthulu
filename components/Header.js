import Logo from "../images/hululogo.png";
import Image from "next/image";
import HeaderItems from "./HeaderItems";
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  const navtoHome = () => {
    router.push("/");
  };
  const navtotrending = () => {
    router.push("/trending");
  };
  const navtocollections = () => {
    router.push("/collections");
  };
  const navtosearch = () => {
    router.push("/search");
  };
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItems title="HOME" Icon={HomeIcon} navtoHome={navtoHome} />
        <HeaderItems
          title="TRENDING"
          Icon={LightningBoltIcon}
          navtotrending={navtotrending}
        />
        <HeaderItems title="VERIFIED" Icon={BadgeCheckIcon} />
        <HeaderItems
          title="COLLECTIONS"
          Icon={CollectionIcon}
          navtocollections={navtocollections}
        />
        <HeaderItems
          title="SEARCH"
          Icon={SearchIcon}
          navtosearch={navtosearch}
        />
        <HeaderItems title="ACCOUNT" Icon={UserIcon} />
      </div>
      <Image className="object-contain" src={Logo} width={200} height={100} />
    </header>
  );
}

export default Header;
