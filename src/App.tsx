import React, { useEffect, useState } from 'react';
import { ChannelSort, DefaultGenerics, StreamChat } from 'stream-chat';
import { Chat,      // no ui, general data about chat app
          Channel,  // no ui, data about active channel
          Window,   // container utility, responsiveness
          ChannelHeader, // basic info about active channel
          MessageList,  // list of messages in currently active channel
          MessageInput,
          Thread,       // manages threads
          ChannelList, 
          LoadingIndicator } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGF3bi1zbm93LTgiLCJleHAiOjE2NTc5MDYzOTh9.KxlQEpFwyLvqWkq1Zy0iJBZGdomQCH3m3MKU7OlF1Yg';
const apiKey = process.env.REACT_APP_STRAM_API_KEY ?? '';

const filters = { type: 'messaging', members: { $in: ['dawn-snow-8'] } };
const sort = { last_message_at: -1 } as ChannelSort;

const App = () => {
  const [chatClient, setChatClient] = useState(null as (StreamChat<DefaultGenerics> | null));

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);

      await client.connectUser(
        {
          id: 'dawn-snow-8',
          name: 'dawn',
          image: 'https://getstream.io/random_png/?id=dawn-snow-8&name=dawn',
        },
        userToken,
      );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='messaging light'>
      <ChannelList filters={filters}  />
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

export default App;
