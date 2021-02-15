import React from "react";

import Table from "../table/table";
import Selection from "../selection";
import { getSequenceData } from "../../services/sequenceTableData";
import {
  getSequenceTableTitle,
  getSequenceTableHeader,
  getSequenceTableDisclaimer,
  getSequenceTableBarCol,
  getBarConfig,
  getRankOptions,
} from "../../services/config";
import { useInterval } from "../../util/useInterval";
import { addThousandSeparators } from "../../util/addThousandSeparators";
import { updateBarMinMaxColor } from "../../util/updateBarMinMaxColor";
import { orderData } from "../../util/orderData";
import { rankData } from "../../util/rankData";
import { removeTrailingDecimals } from "../../util/removeTrailingDecimal";

import SequenceTableStyle from "./sequenceTable.module.css";

const SequenceTable = ({ config }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [firstFetch, setFirstFetch] = React.useState(true);

  const columns = React.useRef([]);
  const [rankOptions, setRankOptions] = React.useState([]);
  const [barCol, setBarCol] = React.useState([]);
  const [rawBarConfig, setRawBarConfig] = React.useState({});
  const [title, setTitle] = React.useState("");
  const [disclaimer, setDisclaimer] = React.useState("");

  const [rankBy, setRankBy] = React.useState("perc_sequenced");
  const [barConfig, setBarConfig] = React.useState({});
  const [data, setData] = React.useState([]);
  const fieldToAddCommas = React.useRef([
    "reported_cases",
    "samples_sequenced",
  ]);
  const fieldToRemoveTrailingDecimal = React.useRef([
    { name: "dtd", rounding: 0 },
    { name: "perc_sequenced", rounding: 2 },
  ]);
  const updateData = React.useCallback(
    (data) => {
      setBarConfig(
        updateBarMinMaxColor({
          barsConfig: rawBarConfig,
          barColumns: barCol,
          data: data,
        })
      );
      setIsLoading(false);

      return removeTrailingDecimals(
        addThousandSeparators(
          rankData(
            orderData(rankBy, data, ((rawBarConfig ?? {})[rankBy] ?? {}).order)
          ),
          fieldToAddCommas.current
        ),
        fieldToRemoveTrailingDecimal.current
      );
    },
    [rawBarConfig, rankBy, barCol]
  );

  React.useEffect(() => {
    setRankOptions(getRankOptions(config));
    setTitle(getSequenceTableTitle(config));
    setBarCol(getSequenceTableBarCol(config));
    setRawBarConfig(getBarConfig(config));
    columns.current = getSequenceTableHeader(config);
    setDisclaimer(getSequenceTableDisclaimer(config));
  }, [config]);

  React.useEffect(() => {
    setIsLoading(true);
    firstFetch
      ? getSequenceData().then((result) => {
          setFirstFetch(false);
          setData(updateData(result));
        })
      : setData((prev) => updateData(prev));
  }, [firstFetch, updateData]);

  const fiveMinutes = 1000 * 60 * 5; // in milliseconds
  useInterval(() => {
    getSequenceData().then((result) => setData(updateData(result)));
  }, fiveMinutes);

  console.log("data :>> ", data);
  return (
    <div className={`${SequenceTableStyle.fullWidth}`}>
      <h2 className={SequenceTableStyle.title}>{title ?? ""}</h2>
      <Selection
        rankBy={rankBy}
        setRankBy={setRankBy}
        rankOptions={rankOptions}
        label="Rank By"
      />
      <Table
        columns={columns.current}
        data={data}
        barCol={barCol}
        barConfig={barConfig}
        downloadFileName="sequenceOFSubmission.csv"
        isLoading={isLoading}
        disclaimer={disclaimer}
      />
    </div>
  );
};

export default SequenceTable;
