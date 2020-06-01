class RoomsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"

    messages = Message.all
    stream_for messages
    RoomsChannel.broadcast_to(messages, messages)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
