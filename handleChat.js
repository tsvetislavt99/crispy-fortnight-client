document.getElementById('message').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

const ws = new WebSocket('wss://ws-server-ur6l.onrender.com/');

ws.addEventListener('message', function (event) {
  const data = JSON.parse(event.data);

  if (data.type === 'message') {
    addMessage(data.data, data.sender);
  }
});

function sendMessage() {
  const message = document.getElementById('message').value;
  const sender = getCookie('username');
  console.log(sender);
  if (!message || !sender) return false;

  ws.send(
    JSON.stringify({
      type: 'message',
      data: message,
      sender,
    }),
  );

  addMessageFromMe(message);
  document.getElementById('message').value = '';
}

function addMessage(message, sender) {
  const node = document.createElement('P');
  const text = document.createTextNode(message);

  const senderNode = document.createElement('SPAN');
  const senderText = document.createTextNode(sender.charAt(0).toUpperCase());

  const wrapperNode = document.createElement('DIV');

  senderNode.appendChild(senderText);
  senderNode.classList.add(
    'py-1',
    'w-max',
    'bg-gray-300',
    'rounded-lg',
    'px-3',
    'mr-2',
  );

  node.appendChild(text);
  node.classList.add(
    'py-1',
    'w-max',
    'bg-gray-300',
    'rounded-lg',
    'px-3',
    'mr-auto',
  );

  wrapperNode.appendChild(senderNode);
  wrapperNode.appendChild(node);

  wrapperNode.classList.add('flex', 'flex-row', 'w-max', 'my-2');

  document.getElementById('chat').appendChild(wrapperNode);
}

function addMessageFromMe(message) {
  const sender = getCookie('username').charAt(0).toUpperCase();

  const node = document.createElement('P');
  const text = document.createTextNode(message);

  const senderNode = document.createElement('SPAN');
  const senderText = document.createTextNode(sender);

  const wrapperNode = document.createElement('DIV');

  senderNode.appendChild(senderText);
  senderNode.classList.add(
    'py-1',
    'w-max',
    'bg-gray-300',
    'rounded-lg',
    'px-3',
  );

  node.appendChild(text);
  node.classList.add(
    'py-1',
    'bg-green-500',
    'text-white',
    'rounded-lg',
    'px-3',
    'mr-2',
  );

  wrapperNode.appendChild(node);
  wrapperNode.appendChild(senderNode);

  wrapperNode.classList.add('flex', 'flex-row', 'ml-auto', 'w-max', 'my-2');

  document.getElementById('chat').appendChild(wrapperNode);
}

/**
 *
 * @param {{sender: string, message:string}} messageObject
 */
function handleMessage(messageObject) {
  const sender = messageObject.sender;
  const message = messageObject.message;

  const currentUsername = getCookie('username');

  if (sender === currentUsername) {
    addMessageFromMe(message);
  } else {
    addMessage(message);
  }
}
