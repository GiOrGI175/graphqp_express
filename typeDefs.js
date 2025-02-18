export const typeDefs = `#graphql

type User {
    id: ID
    name: String
    age: Int
    expenses: [Expense]
}

type Expense {
    id: ID
    cost: Int
    description: String
    user: User
}

type Query {
    users: [User]
    expenses: [Expense]
    user(id: ID!): User
    expense(id: ID!): Expense
}

type Mutation {
    deleteUser(id: ID!): User
    createUser(name: String, age: Int): User
    updateUser(id: ID!, name: String, age: Int): User
    createExpense(cost: Int, description: String, userId: ID!): Expense
    updateExpense(id: ID!, cost: Int, description: String): Expense
    deleteExpense(id: ID!): Expense
}
`;
