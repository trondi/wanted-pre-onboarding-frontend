import axios from "axios";
const url = "https://pre-onboarding-selection-task.shop";
export const api = {
  // related to AUTH
  signUp: ({ email, password }) => {
    return axios
      .post(
        `${url}/auth/signup`,
        {
          email: `${email}`,
          password: `${password}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        return res;
      });
  },
  logIn: ({ email, password }) => {
    return axios.post(
      `${url}/auth/signin`,
      {
        email: `${email}`,
        password: `${password}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  initTodo: (accessToken) => {
    return axios.get(`${url}/todos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  addTodo: (accessToken, data) => {
    return axios.post(
      `${url}/todos`,
      {
        todo: data,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  },
  destoryTodo: (accessToken, item) => {
    return axios.delete(`${url}/todos/${item.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  modifyTodo: (accessToken, { item, newTodo }) => {
    return axios.put(
      `https://pre-onboarding-selection-task.shop/todos/${item.id}`,
      {
        todo: newTodo === undefined ? item.todo : newTodo,
        isCompleted:
          newTodo === undefined ? !item.isCompleted : item.isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  },
};
