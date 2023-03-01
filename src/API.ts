/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type _User = {
  __typename: "_User",
  userId: string,
  githubId: string,
  username: string,
  avatarUrl: string,
  apps:  Array<_App | null >,
};

export type _App = {
  __typename: "_App",
  appId: string,
  userId: string,
  appName: string,
  apiKey: string,
  unseal: string,
  discordGuildId: string,
  sessionTimeout: number,
  active: boolean,
};

export type Message = {
  __typename: "Message",
  hash: string,
  message: string,
};

export type Convo = {
  __typename: "Convo",
  hash: string,
  messageToken: string,
  sessionToken: string,
};

export type _Convo = {
  __typename: "_Convo",
  appId: string,
  convoId: string,
  apiKeyUsed: string,
  discordGuildId: string,
  messageToken: string,
  sessionStartTime: string,
  discordChannelId: string,
  messages:  Array<_Message | null >,
};

export type _Message = {
  __typename: "_Message",
  sendDate: string,
  userType: UserType,
  message: string,
};

export enum UserType {
  OWNER = "OWNER",
  CUSTOMER = "CUSTOMER",
}


export type CreateUserMutationVariables = {
  masterSecret: string,
  username: string,
  avatarUrl: string,
  githubId: string,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "_User",
    userId: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      userId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
      active: boolean,
    } | null >,
  },
};

export type AddAppMutationVariables = {
  masterSecret: string,
  userId: string,
  appName?: string | null,
};

export type AddAppMutation = {
  addApp:  {
    __typename: "_User",
    userId: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      userId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
      active: boolean,
    } | null >,
  },
};

export type RemoveAppMutationVariables = {
  masterSecret: string,
  appId: string,
};

export type RemoveAppMutation = {
  removeApp:  {
    __typename: "_User",
    userId: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      userId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
      active: boolean,
    } | null >,
  },
};

export type UpdateAppMutationVariables = {
  masterSecret: string,
  appId: string,
  discordGuildId?: string | null,
  appName?: string | null,
  active?: boolean | null,
  sessionTimeout?: number | null,
};

export type UpdateAppMutation = {
  updateApp:  {
    __typename: "_App",
    appId: string,
    userId: string,
    appName: string,
    apiKey: string,
    unseal: string,
    discordGuildId: string,
    sessionTimeout: number,
    active: boolean,
  },
};

export type RefreshApiKeyMutationVariables = {
  masterSecret: string,
  appId: string,
};

export type RefreshApiKeyMutation = {
  refreshApiKey:  {
    __typename: "_App",
    appId: string,
    userId: string,
    appName: string,
    apiKey: string,
    unseal: string,
    discordGuildId: string,
    sessionTimeout: number,
    active: boolean,
  },
};

export type AddOwnerMessageMutationVariables = {
  masterSecret: string,
  discordChannelId: string,
  message: string,
};

export type AddOwnerMessageMutation = {
  addOwnerMessage:  {
    __typename: "Message",
    hash: string,
    message: string,
  },
};

export type CreateSessionMutationVariables = {
  apiKey: string,
};

export type CreateSessionMutation = {
  createSession:  {
    __typename: "Convo",
    hash: string,
    messageToken: string,
    sessionToken: string,
  },
};

export type AddCustomerMessageMutationVariables = {
  sessionToken: string,
  message: string,
};

export type AddCustomerMessageMutation = {
  addCustomerMessage: string,
};

export type GetUserQueryVariables = {
  masterSecret: string,
  userId: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "_User",
    userId: string,
    githubId: string,
    username: string,
    avatarUrl: string,
    apps:  Array< {
      __typename: "_App",
      appId: string,
      userId: string,
      appName: string,
      apiKey: string,
      unseal: string,
      discordGuildId: string,
      sessionTimeout: number,
      active: boolean,
    } | null >,
  },
};

export type ViewConvoQueryVariables = {
  masterSecret: string,
  convoId: string,
};

export type ViewConvoQuery = {
  viewConvo:  {
    __typename: "_Convo",
    appId: string,
    convoId: string,
    apiKeyUsed: string,
    discordGuildId: string,
    messageToken: string,
    sessionStartTime: string,
    discordChannelId: string,
    messages:  Array< {
      __typename: "_Message",
      sendDate: string,
      userType: UserType,
      message: string,
    } | null >,
  },
};

export type ViewMessagesQueryVariables = {
  masterSecret: string,
  convoId: string,
};

export type ViewMessagesQuery = {
  viewMessages:  Array< {
    __typename: "_Message",
    sendDate: string,
    userType: UserType,
    message: string,
  } | null >,
};

export type GetMessagesQueryVariables = {
  sessionToken: string,
};

export type GetMessagesQuery = {
  getMessages:  Array< {
    __typename: "Message",
    hash: string,
    message: string,
  } | null >,
};

export type OnMessageSubscriptionVariables = {
  hash: string,
};

export type OnMessageSubscription = {
  onMessage?:  {
    __typename: "Message",
    hash: string,
    message: string,
  } | null,
};
