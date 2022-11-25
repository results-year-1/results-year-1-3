import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { SettingLightIcon } from "../../../icons";
import { Timer } from "../../../components";

import { NAME_PROJECT } from "../../../constants";

const ResultModal = ({
  notifyLinks,
  setIsModalVisible,
  isModalVisible,
  success,
  fetchedUser,
}) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  const handleOk = () => {
    setIsModalVisible(false);
    success();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 1 - woman, 2 - man
  const linkTgBySex =
    fetchedUser?.sex === 1
      ? notifyLinks[`${NAME_PROJECT}_linkTelegramWoman`]
      : notifyLinks[`${NAME_PROJECT}_linkTelegramMan`];

  return (
    <Modal
      title="Кол-во сообщений и шагов за 2022г"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <SettingLightIcon color="black" />
        <Timer expiryTimestamp={time} />
        <p>Идет загрузка...</p>
        <p>Нажмите кнопку "Узнать моментально", чтобы ускорить загрузку</p>
        <Button
          type="primary"
          href={linkTgBySex}
          target="_blank"
          onClick={handleOk}
        >
          "Узнать моментально"
        </Button>
      </div>
    </Modal>
  );
};

export { ResultModal };
