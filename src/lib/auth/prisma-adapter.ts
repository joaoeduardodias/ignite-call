import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { destroyCookie, parseCookies } from 'nookies'
import { prisma } from '../prisma'

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('User id not found on cookies.')
      }
      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })
      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/',
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        username: prismaUser.username,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
        bio: prismaUser.bio,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      if (!user) {
        return null
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        bio: user.bio,
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })
      if (!user) {
        return null
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        bio: user.bio,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })
      if (!account) {
        return null
      }
      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        emailVerified: null,
        avatar_url: user.avatar_url!,
        bio: user.bio,
      }
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
          bio: user.bio,
        },
      })
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        username: prismaUser.username,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
        bio: prismaUser.bio,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.provider,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          session_token: sessionToken,
          expires,
        },
      })
      return {
        userId,
        sessionToken,
        expires,
      }
    },
    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })
      if (!prismaSession) {
        return null
      }
      const { user, ...session } = prismaSession
      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          username: user.username,
          emailVerified: null,
          avatar_url: user.avatar_url!,
          bio: user.bio,
        },
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        where: {
          id: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })
      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      }
    },
    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
