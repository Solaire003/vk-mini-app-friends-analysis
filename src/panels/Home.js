import React, { useEffect } from "react";
import {
  Input,
  List,
  Avatar,
  Cell,
  IconButton,
  Panel,
  Group,
  FormItem,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import Icon16Clear from "@vkontakte/icons/dist/16/clear";
import actions from "../store/actions";

const Home = ({ id }) => {
  const { items } = useSelector((state) => state.friends);
  const user = useSelector((state) => state.user);

  const textInput = React.createRef();
  const clear = () => (textInput.current.value = "");

  const getFriendInfo = async (id, e) => {
    await Promise.all([
      actions.friends.getAllPhotos(id),
      actions.friends.getUserWall(id),
    ]);
    actions.activePanel.change('dashboard')
  };

  return (
    <Panel id={id}>
      {user && (
        <Group>
          <Cell
            disabled
            before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
            description={user.city && user.city.title ? user.city.title : ""}
          >
            {`${user.first_name} ${user.last_name}`}
          </Cell>
        </Group>
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
                  expandable
                  key={id}
                  before={<Avatar src={photo_100} />}
                  onClick={(e) => getFriendInfo(id, e)}
                  data-to="dashboard"
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
