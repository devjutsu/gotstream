import React, { useEffect, useState } from 'react';
import { ChannelSort, DefaultGenerics, StreamChat, Channel as ChatChannel } from 'stream-chat';
import {
  Chat,      // no ui, general data about chat app
  Channel,  // no ui, data about active channel
  Window,   // container utility, responsiveness
  ChannelHeader, // basic info about active channel
  MessageList,  // list of messages in currently active channel
  MessageInput,
  Thread,       // manages threads
  ChannelList,
  LoadingIndicator
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGF3bi1zbm93LTgiLCJleHAiOjE2NTc5MDYzOTh9.KxlQEpFwyLvqWkq1Zy0iJBZGdomQCH3m3MKU7OlF1Yg';
const apiKey = process.env.REACT_APP_STRAM_API_KEY ?? '';

const user = {
  id: 'pinger',
  name: 'Pinger',
  image: 'https://getstream.imgix.net/images/random_svg/PN.png'
}

const filters = { type: 'messaging', members: { $in: [user.id] } };
const sort = { last_message_at: -1 } as ChannelSort;

export default function App() {
  const [client, setClient] = useState<StreamChat>();

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const chan = chatClient.channel('messaging', 'real-talk', {
        image: 'https://getstream.imgix.net/images/random_svg/RT.png',
        name: 'Real Talk',
        members: [user.id]
      });

      await chan.watch();
      console.log('chan:', chan);
      setClient(chatClient);
    }

    init();
  }, [])



  if (!client) return <LoadingIndicator />

  return (
    <Chat client={client} theme="messaging dark">
      <ChannelList
        filters={filters}
        sort={sort}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};