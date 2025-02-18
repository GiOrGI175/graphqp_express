import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs.js';
import { expenses, users } from './data.js';

const resolvers = {
  Query: {
    users() {
      return users;
    },
    expenses() {
      return expenses;
    },
    user(parent, args) {
      console.log(parent, args);
      const { id } = args;
      return users.find((el) => el.id == id);
    },
    expense(parent, args) {
      const { id } = args;
      return expenses.find((el) => el.id == id);
    },
  },
  Expense: {
    user(parent, args) {
      return users.find((el) => el.id == parent.userId);
    },
  },
  User: {
    expenses(parent) {
      return expenses.filter((el) => el.userId == parent.id);
    },
  },
  Mutation: {
    deleteUser(_, args) {
      const { id } = args;
      const index = users.findIndex((el) => el.id == id);
      if (index === -1) return null;
      const user = users.splice(index, 1);
      return user[0];
    },
    createUser(_, args) {
      const lastId = users[users.length - 1]?.id || 0;
      const newUser = {
        id: lastId + 1,
        ...args,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser(_, args) {
      const { id, name, age } = args;
      const index = users.findIndex((el) => el.id == id);
      if (index === -1) return null;

      const updatedUser = {
        ...users[index],
        ...(name && { name }),
        ...(age && { age }),
      };

      users[index] = updatedUser;
      return updatedUser;
    },
    createExpense(_, args) {
      const lastId = expenses[expenses.length - 1]?.id || 0;
      const newExpense = {
        id: lastId + 1,
        ...args,
      };
      expenses.push(newExpense);
      return newExpense;
    },
    updateExpense(_, args) {
      const { id, cost, description } = args;
      const index = expenses.findIndex((el) => el.id == id);
      if (index === -1) return null;

      const updatedExpense = {
        ...expenses[index],
        ...(cost && { cost }),
        ...(description && { description }),
      };

      expenses[index] = updatedExpense;
      return updatedExpense;
    },
    deleteExpense(_, args) {
      const { id } = args;
      const index = expenses.findIndex((el) => el.id == id);
      if (index === -1) return null;
      const expense = expenses.splice(index, 1);
      return expense[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: 3000 });

console.log(`server running on ${url}`);
