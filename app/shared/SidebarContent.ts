import { BsGrid1X2Fill } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { CgSupport } from "react-icons/cg";
import { LuScreenShare } from "react-icons/lu";

const SidebarItemsGroup1 = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BsGrid1X2Fill,
    },
    {
      title: "Q&A",
      url: "/askquestions",
      icon: RiRobot2Line,
    },
    {
      title: "Meetings",
      url: "/meetings",
      icon: LuScreenShare,
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