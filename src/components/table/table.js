import React from "react";
import BTable from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { CSVLink } from "react-csv";
import {
  usePagination,
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import TableStyle from "./table.module.css";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  className,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className={className}>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

function Table({
  isLoading,
  columns,
  data,
  barCol,
  downloadFileName,
  disclaimer = "",
}) {
  const csvHeader = columns.map((val) => {
    const header = {};
    header.label = val.Header;
    header.key = val.accessor;
    return header;
  });

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    //pagination stuff
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex },
    // state: { pageIndex },

    //global filter
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );
  console.log("state :>> ", state);

  // Render the UI for your table
  return (
    <div className={TableStyle.tableWrap}>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {isLoading ? (
        <div className={TableStyle.spinnerContainer}>
          <Spinner animation="border" />
        </div>
      ) : (
        <BTable
          className={`${TableStyle.table} mt-3`}
          hover
          size="sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell) => {
                    if (cell.column.Header === barCol) console.log(cell);
                    return (
                      <td
                        {...cell.getCellProps()}
                        css={
                          cell.column.Header === barCol
                            ? css`
                                display: flex;
                                text-align: left;
                                &:before {
                                  content: "";
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  height: inherit;
                                  width: calc(
                                    ${cell.column.width}px *
                                      (${cell.value} / 100)
                                  );
                                  margin-right: 10px;
                                  background: lightgray;
                                }
                                &:hover:before {
                                  background: gray;
                                }
                              `
                            : css``
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </BTable>
      )}
      {disclaimer === "" ? null : (
        <div className={`${TableStyle.disclaimer} mb-3`}>{disclaimer}</div>
      )}
      {pageOptions.length === 1 ? (
        <Row className={TableStyle.paginationControl}>
          <Col xs={12} md={6} className="mb-3">
            <CSVLink
              data={data}
              headers={csvHeader}
              filename={downloadFileName}
              className="btn-sm btn-light"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              Download Table
            </CSVLink>
          </Col>
        </Row>
      ) : (
        <Row className={TableStyle.paginationControl}>
          <Col sm={12} md={6}>
            <Button
              variant="light"
              size="sm"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
            <p>
              {" "}
              Page <strong>{pageIndex + 1} </strong> of{" "}
              <strong>{pageOptions.length}</strong>
            </p>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <CSVLink
              data={data}
              headers={csvHeader}
              filename={downloadFileName}
              className="btn-sm btn-light"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              Download Table
            </CSVLink>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Table;
