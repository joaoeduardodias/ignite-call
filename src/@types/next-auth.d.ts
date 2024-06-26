import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
    bio: string?
  }
  interface Session {
    user: User
  }
}

