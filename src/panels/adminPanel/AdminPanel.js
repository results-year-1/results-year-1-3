import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { AdminPanelMain } from "/";
import { notifyUrl, rootUrl } from "../../constants";
import { typeLinkKey, getTypeLinkKeyNotify } from "../../helpers/index";

const AdminPanel = ({
  openAlert,
  snackbar,
  getButtonStats,
  getPlatform,
  getGroupId,
  notifyLinks,
}) => {
  const [currentLink, setCurrentLink] = useState("");
  const [currentNotyPage, setCurrentNotyPage] = useState(0);

  function editLinkGroup(type) {
    axios
      .post(`${rootUrl}/edit`, {
        key: typeLinkKey[type],
        value: currentLink,
      })
      .then(function (response) {
        if (response.data === "ok") {
          openAlert(
            type === "app-id"
              ? "Вы успешно изменили ссылку на приложение"
              : "Вы успешно изменили ссылку на группу"
          );
        } else {
          openAlert("Вы указали невалидную ссылку", "red");
        }
      })
      .catch(function (error) {});
  }

  function editLinkNotify(type) {
    axios
      .post(`${notifyUrl}/edit`, {
        key: getTypeLinkKeyNotify(type, currentNotyPage),
        value: currentLink,
      })
      .then(function (response) {
        openAlert("Вы успешно внесли изменения");
      })
      .catch(function (error) {});
  }

  function onChangeAction(e) {
    const value = e.target.value.trim();

    setCurrentLink(value);
  }

  const onChangeCurrentNotyPage = (value) => {
    setCurrentNotyPage(value);
  };

  return (
    <div>
      <AdminPanelMain
        onChangeAction={onChangeAction}
        editLinkGroup={editLinkGroup}
        getButtonStats={getButtonStats}
        getPlatform={getPlatform}
        getGroupId={getGroupId}
        notifyLinks={notifyLinks}
        editLinkNotify={editLinkNotify}
        onChangeCurrentNotyPage={onChangeCurrentNotyPage}
        currentNotyPage={currentNotyPage}
      />
      {snackbar}
    </div>
  );
};

export { AdminPanel };
