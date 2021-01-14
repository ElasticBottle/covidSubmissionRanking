import React from "react";

import Table from "../table/table";
import { getSequenceData } from "../../services/sequenceTableData";
import {
  getSequenceTableTitle,
  getSequenceTableHeader,
  getSequenceTableDisclaimer,
  getSequenceTableBarCol,
} from "../../services/config";
import { useInterval } from "../../util/useInterval";
import { addThousandSeparators } from "../../util/addThousandSeparators";
import SequenceTableStyle from "./sequenceTable.module.css";

const SequenceTable = ({ config }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const columns = React.useRef([]);
  const [barCol, setBarCol] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [disclaimer, setDisclaimer] = React.useState("");

  const [data, setData] = React.useState([]);
  const fieldToAddCommas = React.useRef([
    "reported_cases",
    "samples_sequenced",
  ]);
  const updateData = React.useCallback((data) => {
    setIsLoading(false);
    setData(addThousandSeparators(data, fieldToAddCommas.current));
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    setTitle(getSequenceTableTitle(config));
    setBarCol(getSequenceTableBarCol(config));
    columns.current = getSequenceTableHeader(config);
    setDisclaimer(getSequenceTableDisclaimer(config));

    getSequenceData().then((result) => {
      updateData(result);
      setIsLoading(false);
    });
  }, [updateData, config]);

  const fiveMinutes = 1000 * 60 * 5; // in milliseconds
  useInterval(() => {
    getSequenceData().then((result) => updateData(result));
  }, fiveMinutes);

  return (
    <div className={`${SequenceTableStyle.fullWidth}`}>
      <h2 className={SequenceTableStyle.title}>
        {title ?? "Country Submission Count"}
      </h2>
      <Table
        columns={columns.current}
        data={data}
        barCol={barCol}
        downloadFileName="sequenceOFSubmission.csv"
        isLoading={isLoading}
        disclaimer={disclaimer}
      />
    </div>
  );
};

export default SequenceTable;
