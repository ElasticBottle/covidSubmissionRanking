import React from "react";
import Select from "react-select";

import SelectStyle from "./selection.module.css";

function Selection({ rankOptions, rankBy, setRankBy, label }) {
  return (
    <div className={`mt-4 mb-4 ${SelectStyle.selectContainer}`}>
      <div className={SelectStyle.label}>{label}</div>
      <Select
        className={SelectStyle.rankBy}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isSearchable={true}
        name={label}
        value={(rankOptions ?? []).filter((option) => option.value === rankBy)}
        options={rankOptions}
        onChange={(e) => setRankBy(e.value)}
      />
    </div>
  );
}

export default Selection;
