import CreateFlow from "./CreateFlow.js";
import GlobalVariables from "../../common/GlobalVariable/index.js";
import AddDataDrawer from "../../common/Drawers/AddDataDrawer.js";
import TemplatesDrawer from "../../common/Drawers/TemplatesDrawer.js";
import AddVariableDrawer from "../../common/Drawers/AddVariableDrawer.js";
import { DrawerTypes } from "../../../store/features/drawers/drawerTypes.js";
import useDrawerState from "../../../hooks/common/useDrawerState.js";
import CustomButton from "../../common/CustomButton/index.js";

const addVariableId = DrawerTypes.ADD_VARIABLES;

function Builder() {
  const { toggle: toggleAddData } =
    useDrawerState(addVariableId);

  const showAddGlobalVariable = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleAddData();
  };
  return (
    <div className="h-full w-full">
      <div className="absolute top-2 left-2 flex flex-col items-start gap-4 z-10">
        <CustomButton onClick={showAddGlobalVariable}>
          Show Add Global Variable
        </CustomButton>
      </div>
      <AddVariableDrawer />
      <AddDataDrawer />
      <TemplatesDrawer />
      <div className="flex-[1] h-full">
        <CreateFlow />
      </div>
    </div>
  );
}

export default Builder;
