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
  async ({ token: token }) => {
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

const initialState = {
  userInfo: null,
  searchedUsers: [],
  selectedChat: null,
  userChats: [],
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

export const { setUserInfo, setSelectedChat, setUserChats } =
  reduxSlice.actions;

export default reduxSlice.reducer;
