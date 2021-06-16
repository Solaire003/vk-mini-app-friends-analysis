import React, { useState, useEffect } from "react";
import {
  Input,
  List,
  Avatar,
  Cell,
  IconButton,
  Panel,
  Group,
  FormItem,
  ScreenSpinner,
  Alert,
  PanelHeaderContent,
  PanelHeader,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import Icon16Clear from "@vkontakte/icons/dist/16/clear";

import actions from "../../store/actions";
import apiRequest from "../../utils/ApiServiceVK";

const ErrorModal = ({ setPopout, text }) => {
  return (
    <Alert
      actions={[
        {
          title: "Закрыть",
          autoclose: true,
          mode: "cancel",
          action: () => {
            setPopout(<ScreenSpinner size="large" />);
            document.location.reload();
          },
        },
      ]}
      onClose={() => {
        setPopout(<ScreenSpinner size="large" />);
        document.location.reload();
      }}
      actionsLayout="vertical"
      header="Что-то пошло не так!"
      text={text}
    />
  );
};

export const Home = ({ id, setPopout, friends, setFriend, setAnalise }) => {
  const user = useSelector((state) => state.user);
  const clear = () => setSearchTerm("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  useEffect(() => {
    const results =
      friends &&
      friends.filter(
        (el) =>
          el.first_name.toLowerCase().includes(searchTerm) ||
          el.last_name.toLowerCase().includes(searchTerm)
      );
    setSearchResults(results);
  }, [searchTerm, friends]);

  const getFriendInfo = async (id) => {
    setPopout(true);
    await Promise.all([
      //res[0]
      apiRequest.getFriendInfo(id),
      //res[1]
      apiRequest.getAllPhotos(id),
      //res[2]
      apiRequest.getMutualFriends(id),
    ]).then((res) => {
      // console.log(`FRIEND`, res);
      setFriend(res);
      setPopout();
      actions.activePanel.change("dashboard");
    });
  };

  return (
    <Panel id={id}>
      {user && (
        <PanelHeader>
          <PanelHeaderContent
            status={""}
            before={<Avatar size={45} src={user.photo_200} />}
          >
            {`${user.first_name} ${user.last_name}`}
          </PanelHeaderContent>
        </PanelHeader>
      )}

      <Group>
        <FormItem>
          <Input
            disabled={!friends}
            type="text"
            value={searchTerm}
            onChange={handleChange}
            after={
              <IconButton
                hoverMode="opacity"
                aria-label="Очистить поле"
                onClick={clear}
              >
                <Icon16Clear />
              </IconButton>
            }
          />
        </FormItem>

        <List>
          {searchResults &&
            searchResults.map((el) => {
              const { id, photo_100, first_name, last_name } = el;
              return (
                <Cell
                  key={id}
                  before={<Avatar src={photo_100} />}
                  onClick={() => getFriendInfo(id)}
                >
                  {`${first_name} ${last_name}`}
                </Cell>
              );
            })}
        </List>
      </Group>
    </Panel>
  );
};
