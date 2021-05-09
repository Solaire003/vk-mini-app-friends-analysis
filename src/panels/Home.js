import React, { useState } from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { Input, List } from "@vkontakte/vkui";
import { useSelector } from "react-redux";

const Home = ({ id }) => {
  const [search, setSearch] = useState("");
  const { items } = useSelector(state => state.friends)
  const user = useSelector(state => state.user)

  return (
    <Panel id={id}>
      <PanelHeader>Friend Analyse</PanelHeader>
      {user && (
        <Group>
          <Cell
            before={
              user.photo_200 ? (
                <Avatar src={user.photo_200}/>
              ) : null
            }
            description={
              user.city && user.city.title
                ? user.city.title
                : ""
            }
          >
            {`${user.first_name} ${user.last_name}`}
          </Cell>
        </Group>
      )}

      <Group>
        <Cell>
          <Input
            type="text"
            defaultValue=""
            onChange={(e) => setSearch(e.target.value)}
          />
        </Cell>

        <List>
          {items && items.map((el) => {
            return (
              <Cell
                expandable
                key={el.id}
                before={<Avatar src={el.photo_100}/>}
              >
                {`${el.first_name} ${el.last_name}`}
              </Cell>
            );
          })
          }
        </List>
      </Group>
    </Panel>
  );
};

export default Home;
