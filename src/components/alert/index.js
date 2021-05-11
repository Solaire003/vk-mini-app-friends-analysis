import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@vkontakte/vkui";

const Alert = ({ msg }) => {
  return (
    <Alert
      actions={[
        {
          title: "Закрыть",
          autoclose: true,
          mode: "cancel",
        },
      ]}
      actionsLayout="horizontal"
      // onClose={this.closePopout}
      header="Ошибка!"
      text={msg || "Что-то пошло не так :("}
    />
  );
};

export default Alert;
