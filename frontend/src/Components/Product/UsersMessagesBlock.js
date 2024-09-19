import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../Config/ChatLogics";
import { useSelector } from "react-redux";

const UsersMessagesBlock = ({ messages }) => {
  const { userInfo } = useSelector((state) => state.appScene);
  console.log("UsersMessagesBlock", userInfo);
  return (
    <ScrollableFeed
      display="flex"
      flexDirections="column"
      overflowY="scoll"
      scrollbarWidth="none"
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, userInfo.userInfo._id) ||
              isLastMessage(messages, i, userInfo.userInfo._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === userInfo.userInfo._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(
                  messages,
                  m,
                  i,
                  userInfo.userInfo._id
                ),
                marginTop: isSameUser(messages, m, i, userInfo.userInfo._id)
                  ? 3
                  : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default UsersMessagesBlock;
