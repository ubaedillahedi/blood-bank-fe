import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { SetLoading } from "../../redux/loadersSlice";
import { GetAllBloodGroupsInInventory } from "../../apicalls/dashboard";
import InventoryTable from "../../components/InventoryTable";

function Home() {
  const { currentUser } = useSelector((state) => state.users);
  const [bloodGroupsData, setBloodGroupsData] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllBloodGroupsInInventory();
      dispatch(SetLoading(false));
      if (response.success) {
        setBloodGroupsData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const colours = [
    "#ce5959",
    "#1a5f7a",
    "#88621b",
    "#245953",
    "#2c3333",
    "#804674",
    "#a84448",
    "#635985",
  ];
  return (
    <div>
      {/* <span className="text-gray-700 text-2xl font-semibold">
        Welcome {getLoggedInUserName(currentUser)}
      </span> */}
      {currentUser.userType === "organization" && (
        <>
          <div className="grid grid-cols-4 gap-5 mb-5 mt-2">
            {bloodGroupsData.map((bloodGroup, index) => {
              const color = colours[index];
              return (
                <div
                  className={`p-5 flex justify-between text-white rounded items-center`}
                  style={{ backgroundColor: color }}
                >
                  <h1 className="text-5xl uppercase">
                    {bloodGroup.bloodGroup}
                  </h1>
                  <div className="flex flex-col justify-between gap-2 ">
                    <div className="flex justify-between gap-5">
                      <span>Total In</span>
                      <span>{bloodGroup.totalIn} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>Total Out</span>
                      <span>{bloodGroup.totalOut} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>Available</span>
                      <span>{bloodGroup.available} ML</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Inventory{" "}
          </span>
          <InventoryTable
            filters={{ organization: currentUser._id }}
            limit={5}
            userType={currentUser.userType}
          />
        </>
      )}

      {currentUser.userType === "donar" && (
        <>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Donations{" "}
          </span>
          <InventoryTable
            filters={{ donar: currentUser._id }}
            limit={5}
            userType="donar"
          />
        </>
      )}

      {currentUser.userType === "hospital" && (
        <>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Requests / Consumptions
          </span>
          <InventoryTable
            filters={{ hospital: currentUser._id }}
            limit={5}
            userType="hospital"
          />
        </>
      )}
    </div>
  );
}

export default Home;
