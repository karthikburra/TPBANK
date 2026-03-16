import { createBrowserRouter } from "react-router";
import { AadharVerification } from "./components/AadharVerification";
import { UserDetails } from "./components/UserDetails";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { BillsPage } from "./components/BillsPage";
import { CardsPage } from "./components/CardsPage";
import { RatesPage } from "./components/RatesPage";
import { ProfilePage } from "./components/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AadharVerification,
  },
  {
    path: "/details",
    Component: UserDetails,
  },
  {
    Component: Layout,
    children: [
      { path: "/home", Component: HomePage },
      { path: "/bills", Component: BillsPage },
      { path: "/cards", Component: CardsPage },
      { path: "/rates", Component: RatesPage },
      { path: "/profile", Component: ProfilePage },
    ],
  },
]);