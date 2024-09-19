import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegistration = createAsyncThunk(
  "appScene/userRegistration",
  async ({ name, email, password, confirmPassword }, { dispatch }) => {
    try {
      const response = await axios.post(
        `/api/user`,
        {
          name,
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data", response.data);
      dispatch(setUserInfo(response.data));
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
);

export const userLogin = createAsyncThunk(
  "appScene/userLogin",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axios.post(
        `/api/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data", response.data);
      dispatch(setUserInfo(response.data));

      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
);

export const fetchuserInfo = createAsyncThunk(
  "appScene/fetchuserInfo",
  async ({ userId }, { dispatch }) => {
    try {
      const response = await axios.get(
        `/api/user/fetchuserInfo?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response.data", response.data);
      dispatch(setUserInfo(response.data));

      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
);

export const fetchSearchedUsers = createAsyncThunk(
  "appScene/fetchSearchedUsers",
  async ({ search: search, token: token }) => {
    try {
      const response = await axios.get(`/api/user?search=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
);

export const accessChats = createAsyncThunk(
  "appScene/accessChats",
  async ({ userId: userId, token: token }) => {
    try {
      const response = await axios.post(
        `/api/chat`,
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }
);

export const getUserChat = createAsyncThunk(
  "appScene/getUserChat",
  async ({ token: token }, { dispatch }) => {
    // Notice _ is used as we are not using any payload in this case
    // const state = getState();
    // const token = state.appScene.userInfo.token; // Assuming userInfo contains the token
    // console.log("Token", token);

    try {
      const response = await axios.get(`/api/chat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data", response.data);
      // dispatch(setSelectedChat(response.data.payload));

      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const createGroupChat = createAsyncThunk(
  "appScene/createGroupChat",
  async ({ name: name, users: users, token: token }) => {
    // Notice _ is used as we are not using any payload in this case
    // const state = getState();
    // const token = state.appScene.userInfo.token; // Assuming userInfo contains the token
    // console.log("Token", token);

    try {
      const response = await axios.post(
        `/api/chat/createGroup`,
        { name: name, users: users },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const getPerticularChat = createAsyncThunk(
  "appScene/getPerticularChat",
  async ({ chatId: chatId, token: token }) => {
    // Notice _ is used as we are not using any payload in this case
    // const state = getState();
    // const token = state.appScene.userInfo.token; // Assuming userInfo contains the token
    // console.log("Token", token);

    try {
      const response = await axios.get(`/api/chat?chatId=${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const updateGroupName = createAsyncThunk(
  "appScene/updateGroupName",
  async ({
    chatId: chatId,
    updatedGroupName: updatedGroupName,
    token: token,
  }) => {
    // Notice _ is used as we are not using any payload in this case
    // const state = getState();
    // const token = state.appScene.userInfo.token; // Assuming userInfo contains the token
    // console.log("Token", token);

    try {
      const response = await axios.put(
        `/api/chat/renameGroup`,
        {
          chatId: chatId,
          updatedGroupName: updatedGroupName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const updateGroupUsers = createAsyncThunk(
  "appScene/updateGroupUsers",
  async ({ chatId: chatId, userId: userId, token: token }) => {
    // Notice _ is used as we are not using any payload in this case
    // const state = getState();
    // const token = state.appScene.userInfo.token; // Assuming userInfo contains the token
    // console.log("Token", token);

    try {
      const response = await axios.put(
        `/api/chat/addUsers`,
        {
          chatId: chatId,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const removeUserFromGroup = createAsyncThunk(
  "appScene/removeUserFromGroup",
  async ({ chatId: chatId, userId: userId, token: token }) => {
    try {
      const response = await axios.put(
        `/api/chat/removeUsers`,
        {
          chatId: chatId,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "appScene/sendMessage",
  async ({ chatId: chatId, content: content, token: token }) => {
    try {
      const response = await axios.post(
        `/api/message`,
        {
          chatId: chatId,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

export const fetchAllMessages = createAsyncThunk(
  "appScene/fetchAllMessages",
  async ({ chatId: chatId, token: token }, { dispatch }) => {
    try {
      dispatch(setMessageLoading(true));
      const response = await axios.get(`/api/message/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      dispatch(setMessageLoading(false));
      return response.data;
    } catch (error) {
      console.error("Error fetching chat data:", error);
      throw error;
    }
  }
);

const initialState = {
  userInfo: null,
  searchedUsers: [],
  selectedChat: null,
  userChats: [],
  showGroupModal: false,
  groupModalLogic: false,
  showSelectedUserInfo: false,
  messageLoading: false,
};

const reduxSlice = createSlice({
  name: "appScene",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
    setShowGroupModal: (state, action) => {
      state.showGroupModal = action.payload;
    },
    setGroupModalLogic: (state, action) => {
      state.groupModalLogic = action.payload;
    },
    setShowSelectedUserInfo: (state, action) => {
      state.showSelectedUserInfo = action.payload;
    },
    setMessageLoading: (state, action) => {
      state.messageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedUsers.fulfilled, (state, action) => {
      state.searchedUsers = action.payload;
    });
    builder.addCase(accessChats.fulfilled, (state, action) => {
      state.selectedChat = action.payload;
    });
    builder.addCase(getUserChat.fulfilled, (state, action) => {
      state.userChats = action.payload;
    });
  },
});

export const {
  setUserInfo,
  setSelectedChat,
  setUserChats,
  setShowGroupModal,
  setGroupModalLogic,
  setShowSelectedUserInfo,
  setMessageLoading,
} = reduxSlice.actions;

export default reduxSlice.reducer;
