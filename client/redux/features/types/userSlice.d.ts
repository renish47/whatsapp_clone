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
  filteredMessageList: MessageList[];
  onlineUsers: string[];
  friendsList: FriendsList;
  filteredFriendsList: UserInfo[];
  currentChatUserInfo: UserInfo;
  messages: Message[];
  socket: any;
  ungroupedFriendsList: UserInfo[];
  isMessageListLoading: boolean;
}
