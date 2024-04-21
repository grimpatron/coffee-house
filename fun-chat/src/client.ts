export function serverAuthentication(
  user_login: string,
  user_password: string
) {
  const socket: WebSocket = new WebSocket("ws://localhost:4000");

  // Обработчик события, который срабатывает, когда соединение установлено
  socket.onopen = (_e: Event): void => {
    console.log("[open] Соединение установлено");

    // Формирование запроса на аутентификацию пользователя
    const authRequest: {
      id: string;
      type: string;
      payload: {
        user: {
          login: string;
          password: string;
        };
      };
    } = {
      id: "unique_id", // Уникальный идентификатор запроса, сгенерированный клиентом
      type: "USER_LOGIN",
      payload: {
        user: {
          login: `${user_login}`, // Логин пользователя
          password: `${user_password}`, // Пароль пользователя
        },
      },
    };

    // Отправка запроса на сервер
    socket.send(JSON.stringify(authRequest));
  };
  // Обработчик события, который срабатывает, когда сервер отправляет сообщение
  socket.onmessage = (event: MessageEvent): void => {
    // Парсинг ответа от сервера
    const response: {
      type: string;
      payload: {
        user?: {
          login: string;
          isLogined: boolean;
        };
        error?: string;
      };
    } = JSON.parse(event.data);

    // Обработка ответа от сервера
    if (response.type === "USER_LOGIN") {
      console.log(
        `[login] Пользователь ${
          response.payload.user!.login
        } вошел в систему: ${response.payload.user!.isLogined}`
      );
    } else if (response.type === "ERROR") {
      console.log(`[error] Ошибка: ${response.payload.error}`);
    }
  };

  // Обработчик события, который срабатывает, когда соединение закрыто
  socket.onclose = (event: CloseEvent): void => {
    if (event.wasClean) {
      console.log(
        `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
      );
    } else {
      console.log("[close] Соединение прервано");
    }
  };

  // Обработчик события, который срабатывает, когда происходит ошибка
  socket.onerror = (error: Event): void => {
    console.log(`[error] ${(error as ErrorEvent).message}`);
  };
}
