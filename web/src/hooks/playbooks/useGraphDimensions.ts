import { useEffect, useState } from "react";
import fetchGraphData from "../../utils/graph/fetchGraphData.ts";
import { useSelector } from "react-redux";
import { currentPlaybookSelector } from "../../store/features/playbook/playbookSlice.ts";
import { calculateData } from "../../utils/graph/calculateData.ts";
import { ReactFlowInstance } from "reactflow";
import usePermanentDrawerState from "../common/usePermanentDrawerState.ts";

const fitViewOptions = {
  maxZoom: 0.75,
  duration: 500,
};

type GraphDimensions = {
  graphData: any;
  dagreData: any;
};

function useGraphDimensions(
  width: number | undefined,
  height: number | undefined,
  instance: ReactFlowInstance<any, any>,
): GraphDimensions {
  const playbook = useSelector(currentPlaybookSelector);
  const { permanentView, isOpen } = usePermanentDrawerState();
  const graphData = fetchGraphData();
  const [data, setData] = useState<any>({});

  useEffect(() => {
      const graphData = fetchGraphData();
      const dagreData = calculateData(graphData, width? width: 350, height? height:200);
      setData(dagreData);
  }, [
    playbook?.steps,
    playbook?.step_relations,
    permanentView,
    isOpen,
  ]);

  return {
    graphData,
    dagreData: data,
  };
}

export default useGraphDimensions;
