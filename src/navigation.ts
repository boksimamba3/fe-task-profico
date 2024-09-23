import { BusinessIcon, HealthIcon, HomeIcon, NewsIcon, SportsIcon, TechnologyIcon } from "./ui/icon/Icon";

export const categoriesNavigation = [
  {
    name: "General",
    path: "/general",
    Icon: NewsIcon,
  },
  {
    name: "Business",
    path: "/business",
    Icon: BusinessIcon,
  },
  {
    name: "Health",
    path: "/health",
    Icon: HealthIcon,
  },
  {
    name: "Sports",
    path: "/sports",
    Icon: SportsIcon,
  },
  {
    name: "Technology",
    path: "/technology",
    Icon: TechnologyIcon,
  },
];

export const navigation = [
  {
    name: "Home",
    path: "/",
    Icon: HomeIcon,
  },
  ...categoriesNavigation,
];
