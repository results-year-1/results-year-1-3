import React, { useState, useEffect, useReducer } from "react";
import { navigate } from "@reach/router";
import { Tabs, Input, Button, Select } from "antd";
const { TabPane } = Tabs;

import { Icon20HomeOutline } from "@vkontakte/icons";
import { NAME_PROJECT } from "../../constants";
import { TabItem } from "./TabItem";
import { tabsPagesData, notifyMockData } from "../../helpers/index";

import "./AdminPanelMain.scss";

const notyPages = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const AdminPanelMain = ({
  onChangeAction,
  editLinkGroup,
  getPlatform,
  getButtonStats,
  getGroupId,
  notifyLinks,
  editLinkNotify,
  onChangeCurrentNotyPage,
  currentNotyPage,
}) => {
  const [renderTabNotify, setRenderTabNotify] = useState([]);
  const [notifyKey, setNotifyKey] = useState(0);
  // const arrStats = [];

  // for (let key in getButtonStats) {
  //   if (!key.includes("SquidGameAPP")) {
  //     arrStats.push({ [key]: getButtonStats[key] });
  //   }
  // }

  const renderTabPage = tabsPagesData(getGroupId);

  useEffect(() => {
    const render = notifyMockData(notifyLinks, currentNotyPage);
    setRenderTabNotify(render);
    setNotifyKey(Math.random());
  }, [currentNotyPage]);

  return (
    <Tabs
      defaultActiveKey="pages"
      centered
      tabPosition="top"
      style={{ marginTop: getPlatform !== "web" ? "50px" : "0" }}
    >
      <TabPane
        tab={
          <div
            className="admin-panel-container__icon"
            onClick={() => navigate(NAME_PROJECT)}
            // onClick={() => navigate("/")}
          >
            <Icon20HomeOutline />
          </div>
        }
        key="home"
      ></TabPane>
      <TabPane tab="Страницы" key="pages">
        {renderTabPage?.map((item, index) => {
          return (
            <TabItem
              key={item.keyItem}
              keyItem={item.keyItem}
              title={item.title}
              placeholder={item.placeholder}
              onChangeAction={onChangeAction}
              defaultValue={item.defaultValue}
              editLink={editLinkGroup}
              className={
                renderTabPage.length - 1 === index &&
                "admin-panel-container last"
              }
            />
          );
        })}
      </TabPane>

      <TabPane tab="Уведомления" key="notify">
        <div className="admin-panel-container">
          <div className="title">Номер страницы для уведомлений</div>
          <Select
            style={{ width: 120 }}
            defaultValue={0}
            onChange={onChangeCurrentNotyPage}
            options={notyPages}
            placeholder="Выберите страницу"
          ></Select>
        </div>

        <div key={notifyKey}>
          {renderTabNotify?.map((item, index) => {
            return (
              <TabItem
                key={item.keyItem}
                keyItem={item.keyItem}
                title={item.title}
                placeholder={item.placeholder}
                onChangeAction={onChangeAction}
                defaultValue={item.defaultValue}
                editLink={editLinkNotify}
                className={
                  renderTabPage.length - 1 === index &&
                  "admin-panel-container last"
                }
              />
            );
          })}
        </div>
      </TabPane>
    </Tabs>
  );
};

export { AdminPanelMain };
