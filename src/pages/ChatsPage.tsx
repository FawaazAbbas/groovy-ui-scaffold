import { useState } from 'react';
import { mockChats, Chat } from '@/lib/mocks/chats';
import { Paperclip, Smile, AtSign, Bold, Send, Bot } from 'lucide-react';

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [composerText, setComposerText] = useState('');

  const agentChats = mockChats.filter(c => c.type === 'agent');
  const dmChats = mockChats.filter(c => c.type === 'dm');
  const channelChats = mockChats.filter(c => c.type === 'channel');

  return (
    <div className="flex h-full">
      {/* Chat list */}
      <div className="w-80 shrink-0 border-r border-border glass overflow-y-auto">
        <div className="p-4">
          <h2 className="text-heading-sm font-semibold text-text-primary mb-4">Messages</h2>
        </div>
        {[
          { label: 'Agents', chats: agentChats },
          { label: 'Direct Messages', chats: dmChats },
          { label: 'Channels', chats: channelChats },
        ].map(section => (
          <div key={section.label} className="mb-3">
            <p className="px-4 py-1 retro-label text-text-secondary/60"><span className="text-electric/30 mr-1">›</span>{section.label}</p>
            {section.chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-all duration-200 ${
                  selectedChat.id === chat.id
                    ? chat.type === 'agent' ? 'bg-electric/[0.06] border-l-2 border-l-electric' : 'bg-white/60'
                    : 'hover:bg-white/30'
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${chat.type === 'agent' ? 'bg-electric-muted text-electric' : chat.type === 'channel' ? 'bg-primary/10 text-primary' : 'bg-surface-elevated text-text-secondary'} text-sm font-medium`}>
                    {chat.type === 'channel' ? '#' : chat.name[0]}
                  </div>
                  {chat.type === 'agent' && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-agent">
                      <Bot className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-body-sm font-medium text-text-primary">{chat.name}</span>
                    <span className="shrink-0 font-mono text-[10px] text-text-secondary/60 tracking-wider">
                      {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-caption text-text-secondary">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-white">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Chat thread */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border glass px-6 py-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${selectedChat.type === 'agent' ? 'bg-electric-muted text-electric' : 'bg-surface-elevated text-text-secondary'} text-sm font-medium`}>
            {selectedChat.type === 'channel' ? '#' : selectedChat.name[0]}
          </div>
          <div>
            <h3 className="text-body-sm font-semibold text-text-primary">{selectedChat.name}</h3>
            {selectedChat.type === 'agent' && <span className="text-caption text-electric">AI Agent</span>}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {selectedChat.messages.map(msg => {
            const isAgent = msg.senderType === 'agent';
            const isMe = msg.senderId === 'usr_001';
            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-medium ${
                  isAgent ? 'bg-electric-muted text-electric' : 'bg-surface-elevated text-text-secondary'
                }`}>
                  {msg.senderName[0]}
                </div>
                <div className={`max-w-[70%] ${isMe ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-caption font-medium text-text-primary">{msg.senderName}</span>
                    {isAgent && <span className="rounded-md bg-electric-muted px-1.5 py-0.5 text-[10px] font-medium text-electric-bright neon-glow-sm">AI</span>}
                    <span className="font-mono text-[10px] text-text-secondary/50 tracking-wider">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className={`rounded-2xl px-4 py-2.5 text-body-sm shadow-glass-sm ${
                    isMe
                      ? 'bg-primary text-white'
                      : isAgent
                        ? 'glass border border-electric/10 text-text-primary'
                        : 'glass-elevated text-text-primary'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.toolUse && (
                    <details className="mt-2 rounded-xl border border-border bg-surface-elevated overflow-hidden">
                      <summary className="cursor-pointer px-3 py-2 retro-label text-electric flex items-center gap-1.5">
                        <span className="text-primary">▸</span> {msg.toolUse.tool}
                      </summary>
                      <div className="border-t border-border px-3 py-2 font-mono text-[11px] text-text-secondary leading-relaxed">
                        <p><span className="text-primary/60">$</span> {msg.toolUse.input}</p>
                        <p className="text-text-primary mt-1">{msg.toolUse.output}</p>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
          {/* Typing indicator */}
          {selectedChat.type === 'agent' && (
            <div className="flex items-center gap-2 font-mono text-[11px] text-electric/70 animate-retro-pulse">
              <span className="text-cyan">▋</span>
              {selectedChat.name} processing...
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border glass p-4">
          <div className="rounded-2xl border border-border glass-elevated shadow-glass-sm">
            <textarea
              value={composerText}
              onChange={e => setComposerText(e.target.value)}
              placeholder={`Message ${selectedChat.name}...`}
              className="w-full resize-none bg-transparent px-4 py-3 text-body-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none"
              rows={2}
            />
            <div className="flex items-center justify-between border-t border-border px-3 py-2">
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/50 hover:text-text-primary transition-colors"><Paperclip className="h-4 w-4" /></button>
                <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/50 hover:text-text-primary transition-colors"><Smile className="h-4 w-4" /></button>
                <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/50 hover:text-text-primary transition-colors"><AtSign className="h-4 w-4" /></button>
                <button className="rounded-lg p-1.5 text-text-secondary hover:bg-white/50 hover:text-text-primary transition-colors"><Bold className="h-4 w-4" /></button>
              </div>
              <button className={`rounded-xl p-2 text-white transition-all shadow-glass-sm ${
                selectedChat.type === 'agent'
                  ? 'bg-electric-muted text-electric hover:bg-electric hover:text-electric-dark neon-glow-sm hover:neon-glow-md'
                  : 'bg-primary hover:bg-primary-hover'
              }`}>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
