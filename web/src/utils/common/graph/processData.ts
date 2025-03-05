import { getTSLabel } from "../../../components/Playbooks/utils";
import { timeAgo } from "../timeAgo";

export const processData = (tsData: any, result: any) => {
  let sortedTSData = JSON.parse(JSON.stringify(tsData));

  for (let i = 0; i < sortedTSData.length; i++) {
    sortedTSData[i].datapoints = sortedTSData[i].datapoints.sort(
      (a: any, b: any) => {
        return parseInt(a.timestamp) - parseInt(b.timestamp);
      },
    );
  }

  let uniqueTimestamps = new Set<number>();
  sortedTSData.forEach((series: any) => {
    series.datapoints.forEach((dp: any) => uniqueTimestamps.add(parseInt(dp.timestamp)));
  });

  let sortedTimestamps = Array.from(uniqueTimestamps).sort((a, b) => a - b);

 let tsLabels = sortedTSData.map((x: any) => {
  const offsetSeconds = x?.metric_label_values?.find(
    (e) => e.name === "offset_seconds"
  );
  const seconds = parseInt(offsetSeconds?.value ?? "0", 10);
  const labelAppendValue = seconds === 0 ? "Current" : timeAgo(seconds);
  const metricLabel = x?.metric_label_values?.length > 1
    ? getTSLabel(x.metric_label_values)
    : result?.timeseries?.metric_expression ?? "Unknown Metric";

  return `${metricLabel} - ${labelAppendValue}`;
});

  let data: any[] = [];

  for (let j = 0; j < sortedTSData.length; j++) {
    let series = sortedTSData[j];
    let datapointsMap = new Map(
      series.datapoints.map((dp: any) => [parseInt(dp.timestamp), parseFloat(dp.value.toFixed(2))])
    );
    series.datapoints = sortedTimestamps.map((timestamp) => ({
      timestamp: timestamp.toString(),
      value: datapointsMap.get(timestamp) ?? null, 
    }));
    data.push({
      ts: series.datapoints.map((dp: any) => dp.value), 
      label: tsLabels[j], // Assign label
    });
  }

  let unit = result?.timeseries?.labeled_metric_timeseries
    ? result?.timeseries?.labeled_metric_timeseries[0]?.unit
    : null;

  return { sortedTSData, tsLabels, data, unit };
};
