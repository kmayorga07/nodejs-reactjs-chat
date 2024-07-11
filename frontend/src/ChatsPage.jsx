import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic(
        'cec3e138-87f4-4eed-8d05-9fe60b2f503e',
        props.user.username,
        props.user.secret
    );
    return (
        <div style ={{ height: '100vh' }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{ height: '100%'}} />
        </div>
    )
}

export default ChatsPage