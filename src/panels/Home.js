import React from "react";
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
import actions from "../store/actions";

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

const Home = ({ id, setPopout }) => {
  const { items } = useSelector((state) => state.friends);
  const user = useSelector((state) => state.user);

  const textInput = React.createRef();
  const clear = () => (textInput.current.value = "");

  const getFriendInfo = async (id) => {
    setPopout(<ScreenSpinner size="large" />);
    await Promise.all([
      actions.friends.getAllPhotos(id),
      actions.friends.getUserWall(id),
      actions.friends.getFriendInfo(id),
      actions.friends.getMutualFriends(id),
    ])
      .then(() => {
        setPopout(null);
        actions.activePanel.change("dashboard");
      })
      .catch((e) => {
        const msg = e.error_data.error_reason?.error_msg || "Ошибка(";
        console.log(`ERROR`, e);
        setPopout(<ErrorModal setPopout={setPopout} text={msg} />);
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
            disabled={!items}
            getRef={textInput}
            type="text"
            defaultValue=""
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
          {items &&
            items.map((el) => {
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

export default Home;
