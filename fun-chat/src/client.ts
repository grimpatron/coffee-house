
interface User {
  login: string;
  password: string;
}

interface Request {
  id: string;
  type: string;
  payload: {
    user?: User;
  } | null;
}



export function userLogin(socket: WebSocket, login: string, password: string): void {
  if (socket.readyState === WebSocket.OPEN) {
    const request: Request = {
      id: Date.now().toString(),
      type: "USER_LOGIN",
      payload: {
        user: {
          login: login,
          password: password,
        },
      },
    };
  
    socket.send(JSON.stringify(request));
    processingMessage(socket);
    getActiveUsers(socket);
    getInactiveUsers(socket);
  } else {
    setTimeout(() => userLogin(socket, login, password), 1000);
  }
}



export function userLogout(socket: WebSocket, login: string, password: string): void {
  const request: Request = {
    id: Date.now().toString(),
    type: "USER_LOGOUT",
    payload: {
      user: {
        login: login,
        password: password,
      },
    },
  };

  socket.send(JSON.stringify(request));
  processingMessage(socket);
}



function processingMessage(socket: WebSocket) {
  socket.onmessage = function(event: MessageEvent): void {
    const response = JSON.parse(event.data);

    if (response.type === "ERROR") {
      console.error(response.payload.error);
    } else if (response.type === "USER_LOGIN") {
      console.log(`User ${response.payload.user.login} login status: ${response.payload.user.isLogined}`);
    } else if (response.type === "USER_LOGOUT") {
      console.log(`User ${response.payload.user.login} login status: ${response.payload.user.isLogined}`);
    }
  };
}



function getActiveUsers(socket: WebSocket): void {
  const request: Request = {
    id: Date.now().toString(),
    type: "USER_ACTIVE",
    payload: null,
  };

  socket.send(JSON.stringify(request));
  processingActive(socket);
}



function getInactiveUsers(socket: WebSocket): void {
  const request: Request = {
    id: Date.now().toString(),
    type: "USER_INACTIVE",
    payload: null,
  };

  socket.send(JSON.stringify(request));
  processingActive(socket);
}



function processingActive(socket: WebSocket) {
  socket.onmessage = function(event: MessageEvent): void {
    const response = JSON.parse(event.data);

    if (response.type === "ERROR") {
      console.error(response.payload.error);
    } else if (response.type === "USER_EXTERNAL_LOGIN") {
      console.log(`User ${response.payload.user.login} login status: ${response.payload.user.isLogined}`);
    } else if (response.type === "USER_EXTERNAL_LOGOUT") {
      console.log(`User ${response.payload.user.login} login status: ${response.payload.user.isLogined}`);
    } else if (response.type === "USER_ACTIVE") {
      console.log(`Active users: ${response.payload.users.length}`);
      console.log(`Active users: ${response.payload.users}`);
      console.log(`Active users: ${response.payload.users[0].login}`);
    } else if (response.type === "USER_INACTIVE") {
      console.log(`Inactive users: ${response.payload.users.length}`);
      console.log(`Inactive users: ${response.payload.users}`);
    }
  };
}

