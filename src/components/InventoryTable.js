import React from "react";
import { useDispatch } from "react-redux";
import { getDateFormat } from "../utils/helpers";
import { Table, message } from "antd";
import { SetLoading } from "../redux/loadersSlice";
import { GetInventoryWithFilters } from "../apicalls/inventory";

function InventoryTable({ filters, userType, limit }) {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (userType === "organization") {
          return record.inventoryType === "in"
            ? record.donar.name
            : record.hospital.hospitalName;
        } else {
          return record.organization.organizationName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  if (userType !== "organization") {
    columns.splice(0, 1);
    columns[2].title = "Organization Name";
    columns[3].title = userType === "hospital" ? "Taken Date" : "Donated Date";
  }

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table dataSource={data} columns={columns} className="mt-3" />
    </div>
  );
}

export default InventoryTable;
