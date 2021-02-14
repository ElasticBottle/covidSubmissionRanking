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
import { scaleLinear } from "d3-scale";

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
    <span
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} Countries...`}
        css={css`
          font-size: 1.1rem;
          border: 0;
          margin-left: 20px;
          width: 100%;
          transition: all 0.5s ease 0s;
          &:focus {
            outline: none;
            border-bottom: 1px solid;
          }
        `}
      />
    </span>
  );
}

function Table({
  isLoading,
  columns,
  data,
  barCol,
  barConfig,
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

  // Render the UI for your table
  return (
    <div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className={TableStyle.tableWrap}>
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
                      const key = columns.find(
                        (val) => val.Header === cell.column.Header
                      ).accessor;
                      return (
                        <td
                          {...cell.getCellProps()}
                          css={
                            barCol.includes(key)
                              ? css`
                                  text-align: left;
                                  &:before {
                                    transition: all 0.5s ease 0s;
                                    content: "";
                                    display: inline-block;
                                    height: 14px;
                                    width: calc(
                                      ${cell.column.width}px *
                                        (
                                          ${cell.value} /
                                            ${(barConfig[key] ?? {}).max}
                                        )
                                    );
                                    margin-right: 10px;
                                    background: ${scaleLinear()
                                      .domain([
                                        (barConfig[key] ?? {}).min,
                                        (barConfig[key] ?? {}).max,
                                      ])
                                      .range([
                                        (barConfig[key] ?? {}).minColor,
                                        (barConfig[key] ?? {}).maxColor,
                                      ])(cell.value)};
                                  }
                                  &:hover:before {
                                    opacity: 1;
                                    transform: ${cell.value /
                                      (barConfig[key] ?? {}).max <=
                                    0.3
                                      ? "scale(1.5)"
                                      : "scale(1.1)"};
                                  }
                                `
                              : css``
                          }
                        >
                          {barCol.includes(key)
                            ? cell.value.toFixed(2)
                            : cell.render("Cell")}
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
    </div>
  );
}

export default Table;
