import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Panel, PanelHeader, Button } from "@vkontakte/vkui";

import { TemplatePage, AnimationStars } from "../../components";
import "./Home.scss";

import { dataTemplatePages } from "../../helpers";
import { AdminPanel } from "../index";
import { LoveIcon, StarIcon } from "../../icons";
import { ADMINS_IDS } from "../../constants";

const Home = ({
  id,
  go,
  snackbar,
  fetchedUser,
  setTemplatePage,
  templatePage,
  appID,
  openAlert,
  getButtonStats,
  getStats,
  getGroupId,
  getRandomImg,
  gotToken,
  getPlatform,
  setUserToken,
}) => {
  return (
    <>
      <AnimationStars />
      <div>
        <>
          {fetchedUser && (
            <>
              {ADMINS_IDS.includes(fetchedUser.id) ? (
                <Button
                  onClick={() => navigate("/admin-panel")}
                  className="admin-btn"
                >
                  Админ панель
                </Button>
              ) : (
                ""
              )}
            </>
          )}
        </>

        {dataTemplatePages.map((item, index) => {
          if (item.name === templatePage) {
            return (
              <TemplatePage
                key={index}
                icon={item.icon}
                header={item.header}
                title={item.title}
                description={item.description}
                buttonName={item.buttonName}
                next={item.next}
                setTemplatePage={setTemplatePage}
                fn={item.fn && item.fn}
                name={item.name}
                appID={appID}
                getGroupId={getGroupId}
                openAlert={openAlert}
                fetchedUser={fetchedUser}
                getRandomImg={getRandomImg}
                gotToken={gotToken}
                getPlatform={getPlatform}
                setUserToken={setUserToken}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export { Home };
