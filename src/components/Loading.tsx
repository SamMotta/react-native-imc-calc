import { Spinner, Center, Heading } from 'native-base'

export default function Loading() {
    return (
        <Center flex={1} bg="gray.900">
            <Spinner color={'emerald.500'} size={48} />
            <Heading color={'emerald.400'}>Carregando fontes...</Heading>
        </Center>
    )
}