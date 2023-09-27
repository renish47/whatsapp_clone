import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import {
  CHECK_USER_ROUTE,
  GET_ALL_USERS,
  GET_MESSAGE_LIST_ROUTE,
  GET_MESSAGE_ROUTE,
} from "@/utils/apiRoutes";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string;
  about: string;
  newUser?: boolean;
}

export interface Message {
  createdAt: string;
  id: string;
  message: string;
  messageStatus: string;
  receiverId: string;
  senderId: string;
  type: string;
}

interface FriendsList {
  [key: string]: UserInfo[];
}

export interface MessageList {
  about: string;
  createdAt: string;
  email: string;
  messageId: string;
  image: string;
  message: string;
  messageStatus: string;
  name: string;
  newUser: boolean;
  receiverId: string;
  senderId: string;
  totalUnreadMesages: number;
  type: string;
}

interface State {
  userInfo: UserInfo;
  messageList: MessageList[];
  messageListIds: string[];
  filteredMessageList: MessageList[];
  onlineUsers: string[];
  friendsList: FriendsList;
  filteredFriendsList: UserInfo[];
  currentChatUserInfo: UserInfo;
  messages: Message[];
  socket: any;
  ungroupedFriendsList: UserInfo[];
  isMessageListLoading: boolean;
  usersInYourChat: string[];
}

const initialState: State = {
  userInfo: {
    id: "",
    name: "",
    email: "",
    image: "/assets/default_avatar.png",
    about: "Hi there! I'm New to WhatsApp",
    newUser: false,
  },
  friendsList: {},
  ungroupedFriendsList: [],
  currentChatUserInfo: {
    id: "",
    name: "",
    email: "",
    image: "/assets/default_avatar.png",
    about: "",
  },
  messages: [],
  socket: undefined,
  messageList: [],
  messageListIds: [],
  onlineUsers: [],
  filteredFriendsList: [],
  filteredMessageList: [],
  isMessageListLoading: true,
  usersInYourChat: [],
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUser",
  async (email: string, thunkApi) => {
    const res = await axios.get(`${CHECK_USER_ROUTE}/${email}`);
    return res.data.user;
  }
);
export const fetchFriendsList = createAsyncThunk(
  "user/fetchFriendsList",
  async (email: string, thunkApi) => {
    const res = await axios.get(`${GET_ALL_USERS}/${email}`);
    return res.data;
  }
);
export const fetchMessageList = createAsyncThunk(
  "user/fetchMessageList",
  async (id: string, thunkApi) => {
    const res = await axios.get(`${GET_MESSAGE_LIST_ROUTE}/${id}`);
    return res.data;
  }
);
export const fetchMessages = createAsyncThunk(
  "user/fetchMessages",
  async ({ from, to }: { from: string; to: string }, thunkApi) => {
    const res = await axios.get(`${GET_MESSAGE_ROUTE}/${from}/${to}`);
    return res.data.messages;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state: State, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },

    addSocket: (state: State, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    addUsersInYourChat: (state: State, action: PayloadAction<string>) => {
      state.usersInYourChat = [...state.usersInYourChat, action.payload];
      state.messages.forEach((message) => {
        if (message.receiverId === action.payload) {
          message.messageStatus = "read";
        }
      });
    },
    updateUsersInYourChat: (state: State, action: PayloadAction<string[]>) => {
      // const index = state.usersInYourChat.indexOf(action.payload);
      // state.usersInYourChat.splice(index, 1);
      state.usersInYourChat = [...action.payload];
    },

    addMessage: (state: State, action: PayloadAction<Message>) => {
      const friendId =
        state.userInfo.id === action.payload.receiverId
          ? action.payload.senderId
          : action.payload.receiverId;
      let target = state.messageList[state.messageListIds.indexOf(friendId)];
      const condition = state.messageListIds.includes(friendId);
      if (!condition) {
        state.messageListIds.unshift(friendId);

        const details = state.ungroupedFriendsList.filter(
          (friend) => friend.id === friendId
        );

        state.messageList.unshift({
          type: action.payload.type,
          createdAt: action.payload.createdAt,
          messageStatus: action.payload.messageStatus,
          senderId: action.payload.senderId,
          receiverId: action.payload.receiverId,
          message: action.payload.message,
          messageId: action.payload.id,
          totalUnreadMesages: friendId === action.payload.senderId ? 1 : 0,
          about: details[0].about,
          email: details[0].email,
          image: details[0].image,
          name: details[0].name,
          newUser: false,
        });
      } else if (condition) {
        if (target) {
          if (
            friendId === action.payload.senderId &&
            state.currentChatUserInfo.id !== action.payload.senderId
          )
            target.totalUnreadMesages += 1;
          target.type = action.payload.type;
          target.createdAt = action.payload.createdAt;
          target.messageStatus = action.payload.messageStatus;
          target.senderId = action.payload.senderId;
          target.receiverId = action.payload.receiverId;
          target.message = action.payload.message;
          target.messageId = action.payload.id;
        }
      }
      if (
        state.currentChatUserInfo.id === action.payload.senderId ||
        state.userInfo.id === action.payload.senderId
      ) {
        if (
          state.messages[0]?.id === action.payload.id ||
          state.messages.length === 0
        ) {
          state.messages[0] = action.payload;
          if (target) {
            target.messageStatus = action.payload.messageStatus;
          }
        } else {
          state.messages = [...state.messages, action.payload];
        }

        state.messages.sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      }
      state.filteredMessageList = state.messageList.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
      state.messageListIds = state.filteredMessageList.map((e) => {
        return state.userInfo.id === e.receiverId ? e.senderId : e.receiverId;
      });
    },

    resetMessage: (state: State, action: PayloadAction<string>) => {
      if (state.currentChatUserInfo.id !== action.payload) {
        state.messages = [];
        state.messageList.map((message, index) => {
          if (message.senderId === action.payload) {
            state.filteredMessageList[index].totalUnreadMesages = 0;
            state.messageList[index].totalUnreadMesages = 0;
          }
        });
      }
    },

    ChangeCurrentChatUserInfo: (
      state: State,
      action: PayloadAction<UserInfo>
    ) => {
      state.currentChatUserInfo = action.payload;
      if (state.currentChatUserInfo.id !== action.payload.id) {
        if (state.currentChatUserInfo.id !== "")
          state.socket.current.emit("out-chat", {
            from: state.userInfo.id,
            to: state.currentChatUserInfo.id,
          });
        state.socket.current.emit("in-chat", {
          from: state.userInfo.id,
          to: action.payload.id,
        });
      }
    },

    filterFriendsList: (state: State, action: PayloadAction<string>) => {
      state.filteredFriendsList = state.ungroupedFriendsList?.filter(
        (friend) =>
          friend.name.toLowerCase().includes(action.payload.toLowerCase()) &&
          action.payload !== ""
      );
    },

    filterMessageList: (state: State, action: PayloadAction<string>) => {
      state.filteredMessageList = state.messageList?.filter((friend) =>
        friend.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    setOnlineUsers: (state: State, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    resetCurrentUserInfo: (state: State) => {
      state.currentChatUserInfo = initialState.currentChatUserInfo;
      state.socket.current.emit("out-chat", {
        from: state.userInfo.id,
        to: state.currentChatUserInfo.id,
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchUserInfo.fulfilled,
      (state: State, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
      }
    );

    builder.addCase(
      fetchFriendsList.fulfilled,
      (
        state: State,
        action: PayloadAction<{
          usersGroupedByInitialLetters: FriendsList;
          users: UserInfo[];
        }>
      ) => {
        state.friendsList = action.payload.usersGroupedByInitialLetters;
        state.ungroupedFriendsList = action.payload.users;
      }
    );

    builder.addCase(
      fetchMessages.fulfilled,
      (state: State, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
      }
    );

    builder.addCase(
      fetchMessageList.fulfilled,
      (
        state: State,
        action: PayloadAction<{
          usersList: MessageList[];
          usersListIds: string[];
          onlineUsers: string[];
          inChatUsers: string[];
        }>
      ) => {
        state.isMessageListLoading = false;
        state.messageList = action.payload.usersList;
        state.messageListIds = action.payload.usersListIds;
        state.filteredMessageList = action.payload.usersList;
        state.onlineUsers = action.payload.onlineUsers;
        state.usersInYourChat = action.payload.inChatUsers;
        state.messageList.map((message, index) => {
          if (message.senderId === state.currentChatUserInfo.id) {
            state.filteredMessageList[index].totalUnreadMesages = 0;
            state.messageList[index].totalUnreadMesages = 0;
          }
        });
      }
    );

    builder.addCase(fetchMessageList.pending, (state: State) => {
      state.isMessageListLoading = true;
    });
  },
});

export const {
  addUserInfo,
  ChangeCurrentChatUserInfo,
  addSocket,
  addMessage,
  resetMessage,
  filterFriendsList,
  filterMessageList,
  setOnlineUsers,
  resetCurrentUserInfo,
  addUsersInYourChat,
  updateUsersInYourChat,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice;
