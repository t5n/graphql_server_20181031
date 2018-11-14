
const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books =  [
      {
        "title": "Harry Potter and the Chamber of Secrets",
        "author": "J.K. Rowling"
      },
      {
        "title": "Jurassic Park",
        "author": "Michael Crichton"
      },
      {
        "title": "Dracula",
        "author": "Bram Stoker"
      },
      {
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoyevsky"
      },
      {
        "title": "1984",
        "author": "George Orwell"
      }
    ];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }
  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
  addBook: (root,args) => {
        item = { 'title': args.title, 'author': args.author };
        books.push(item);
        return item;
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, introspection: true});
// TJ: Adding "introspection: true" enables the GraphQL Playground (GraphiQL) in when node_env environment variable = "production"
// Source:
// https://www.apollographql.com/docs/apollo-server/v2/features/graphql-playground.html#Enabling-GraphQL-Playground-in-production
// https://stackoverflow.com/questions/52452497/graphql-playground-behaving-weirdly-running-on-heroku

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
// server.listen().then(({ url }) => {
//  console.log(`🚀  Server ready at ${url}`);
//  });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
 });

// Query examples

// List all books and authors
// query {
//   books {
//     title
//     author
//   }
// }

// Add a book
// mutation {
//   addBook {
//     title: "Dracula",
//     author: "Bram Stoker"
//   }
// }