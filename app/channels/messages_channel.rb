class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    messages = Message.all

    stream_from "messages"
    ActionCable.server.broadcast("messages", {type: "current_messages", messages: messages})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create_message(data)
    message = Message.create(content: data["content"])
    
    messages = Message.all
    ActionCable.server.broadcast("messages", {type: "current_messages", messages: messages})
  end
end
