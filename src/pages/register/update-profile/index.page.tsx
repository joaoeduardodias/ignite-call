import { api } from '@/lib/axios'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Button, MultiStep, Text, TextArea } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>
export default function UpdateProfile() {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })
  const router = useRouter()

  const session = useSession()
  console.log(session)

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })
    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>
        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>
        <Button disabled={isSubmitting} type="submit">
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
