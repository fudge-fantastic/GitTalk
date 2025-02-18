import { RxDashboard } from "react-icons/rx";
import { RiRobot2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { GoRepo } from "react-icons/go";
import { CgSupport } from "react-icons/cg";

const SidebarItemsGroup1 = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: RxDashboard,
    },
    {
      title: "Q&A",
      url: "/askquestions",
      icon: RiRobot2Line,
    },
    {
      title: "Repositories",
      url: "/",
      icon: GoRepo,
    }
  ]

  const SidebarItemsGroup2 = [
    {
      title: "Settings",
      url: "/settings",
      icon: IoMdSettings,
    },
    {
      title: "Support",
      url: "/support",
      icon: CgSupport,
    },
  ]

  const SidebarItemsGroup3 = [
    {
      title: "Project 1",
      url: "/",
    },
    {
      title: "Project 2",
      url: "/1",
    },
    {
      title: "Project 3",
      url: "/1",
    },
    {
      title: "Project 4",
      url: "/1",
    },
    {
      title: "Project 5",
      url: "/1",
    },
  ]

export {SidebarItemsGroup1,SidebarItemsGroup2, SidebarItemsGroup3}