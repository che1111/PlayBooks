import React from "react";
import CustomDrawer from "../CustomDrawer/index.tsx";
import Sidebar from "../../Playbooks/create/Sidebar.tsx";
import { DrawerTypes } from "../../../store/features/drawers/drawerTypes.ts";
import GlobalVariables from "../GlobalVariable/index.tsx";

function AddVariableDrawer() {
  return (
    <CustomDrawer
      id={DrawerTypes.ADD_VARIABLES}
      openFrom="left"
      addtionalStyles={"lg:w-[25%]"}
      showOverlay={false}
      startFrom="80">
      <div className="flex-[0.4] border-r-[1px] border-r-gray-200 h-full">
        <div className={`w-full p-2`}>
          <GlobalVariables />
        </div>
      </div>
    </CustomDrawer>
  );
}

export default AddVariableDrawer;