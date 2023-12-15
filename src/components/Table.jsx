import { useMemo } from "react";
import Popup from "reactjs-popup";
import {
  DataType,
  Table as KaTable,
  SortingMode,
  FilteringMode,
} from "ka-table";
import { updateFilterRowValue } from "ka-table/actionCreators";
import styled from "styled-components";
import { format } from "date-fns";

import "reactjs-popup/dist/index.css";

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
  color: white;
`;

const TableWrapper = styled.div`
  .ka {
    display: flex;
    justify-content: center;
    font-size: 18px;
  }

  .ka-table {
    display: block;
    height: 75vh;
    overflow-y: scroll;
    opacity: 0.75;
    border-collapse: collapse;
    border-radius: 10px;
    background-color: white;

    &::-webkit-scrollbar {
      width: 1em;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }

  .ka-cell {
    padding: 1em;
    border: 1px solid black;
    text-align: center;
  }

  .ka-thead-background {
    background-color: gray;
  }

  .ka-thead-cell {
    padding: 0.5em;
    font-size: 22px;
    text-align: center;
    border-right: 1px solid black;
  }

  .ka-thead-cell-content {
    cursor: pointer;
  }
`;

function NameFilter({ column, dispatch }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <input
        placeholder="Search for a name"
        onChange={(event) => {
          const filterRowValue =
            event.currentTarget.value !== "" ? event.currentTarget.value : null;
          dispatch(updateFilterRowValue(column.key, filterRowValue));
        }}
        type="text"
      />
    </div>
  );
}

function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        key: "name",
        title: "Name",
        dataType: DataType.String,
      },
      {
        key: "height",
        title: "Height",
        dataType: DataType.Number,
      },
      { key: "mass", title: "Mass", dataType: DataType.Number },
      {
        key: "created",
        title: "Created",
        dataType: DataType.Date,
      },
      { key: "edited", title: "Edited", dataType: DataType.Date },
      {
        key: "planetData",
        title: "Planet Name",
      },
    ],
    []
  );

  return (
    <>
      <StyledHeader>
        Information about the characters from Star Wars
      </StyledHeader>
      <TableWrapper>
        <KaTable
          columns={columns}
          data={data}
          rowKeyField="name"
          filteringMode={FilteringMode.FilterRow}
          sortingMode={SortingMode.Single}
          childComponents={{
            cell: {
              content: (props) => {
                switch (props.column.key) {
                  case "planetData":
                    const { name, diameter, climate, population } = props.value;
                    return name !== "unknown" ? (
                      <Popup
                        trigger={
                          <span style={{ cursor: "pointer" }}>{name}</span>
                        }
                      >
                        <div>
                          <ul style={{ listStyleType: "none" }}>
                            <li>
                              <strong>Name:</strong> {name}
                            </li>
                            <li>
                              <strong>Diameter:</strong> {diameter}
                            </li>
                            <li>
                              <strong>Climate:</strong> {climate}
                            </li>
                            <li>
                              <strong>Population:</strong> {population}
                            </li>
                          </ul>
                        </div>
                      </Popup>
                    ) : (
                      <span style={{ color: "red" }}>Unknown</span>
                    );

                  case "created":
                  case "edited":
                    return format(props.value, "dd/MM/yyyy");
                  default:
                    return props.value;
                }
              },
            },
            filterRowCell: {
              content: (props) => {
                switch (props.column.key) {
                  case "name":
                    return <NameFilter {...props} />;
                  default:
                    return <></>;
                }
              },
            },
          }}
        />
      </TableWrapper>
    </>
  );
}

export default Table;
