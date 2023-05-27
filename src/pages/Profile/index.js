import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Hospitals from "./Hospitals";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab="Inventory" key="1"></Tabs.TabPane>
            <Tabs.TabPane tab="Donars" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key="3">
                <Hospitals />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
