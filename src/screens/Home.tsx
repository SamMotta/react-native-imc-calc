import { Center, Text, Button, Input, Heading, useToast, Box, VStack } from 'native-base'
import { useState } from 'react';

interface IResultProps {
    imc: number
}

function Result({ imc }: IResultProps) {
    return (
        <Center mt={6}>
            <Heading color={'white'} fontSize={'xl'} fontFamily={'body'}>{imc}</Heading>
        </Center>
    )
}


export default function Home() {
    const toast = useToast();
    const toastIdRef = 'invalid-input';

    const [mass, setMass] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [IMC, setIMC] = useState<number>();

    const handleMassChange = (mass: string) => {
        const trimmedMass = mass.split('-').join('.').replace(',', '.')

        if (trimmedMass.length <= 0) {
            setMass(0);
            handleToast(0);
            return;
        }

        const Mass = parseFloat(parseFloat(trimmedMass).toFixed(2));
        setMass(Mass);
        handleToast(Mass);
    }

    const handleHeightChange = (height: string) => {
        const trimmedHeight = height.split('-').join('.').replace(',', '.')

        if (trimmedHeight.length <= 0) {
            setHeight(0);
            handleToast(0);
            return;
        }

        const Height = parseFloat(parseFloat(trimmedHeight).toFixed(2));
        setHeight(Height);
        handleToast(Height);
    }


    function handleCalculateIMC() {
        if (mass > 0 && height > 0) {
            const imcResult = parseFloat((mass / (height ** 2)).toFixed(2))
            console.log(imcResult)
            setIMC(imcResult)
        }



    }

    function handleToast(value: number) {
        console.table(mass, height)
        if (isNaN(value)) {
            if (!toast.isActive(toastIdRef)) {
                toast.show({
                    id: toastIdRef,
                    title: 'Campos inválidos!',
                    description: 'Certifique-se de que está colocando um número nos campos.',
                    placement: 'top',
                    duration: null
                })
            }
        } else {
            toast.close(toastIdRef)
        }

    }

    return (
        <VStack space={36} flex={1} bgColor={'black'} safeArea>

            <Center mt={6}>
                <Heading color={'white'} fontSize={'4xl'} fontFamily={'heading'}>Calculadora IMC</Heading>
            </Center>

            <Center>
                <VStack space={4} width={'3/4'}>
                    <Input
                        color={'white'}
                        _focus={{
                            selectionColor: 'white',
                            caretHidden: false
                        }}
                        type={'text'}
                        placeholder='Digite sua massa'
                        shadow={'2'}
                        keyboardType={'number-pad'}
                        onChangeText={handleMassChange}
                        onSubmitEditing={handleCalculateIMC}
                    />

                    <Input
                        color={'white'}
                        _focus={{
                            selectionColor: 'white',
                            caretHidden: false
                        }}
                        placeholder='Digite sua altura'
                        shadow={'2'}
                        keyboardType={'number-pad'}
                        onChangeText={handleHeightChange}
                        onSubmitEditing={handleCalculateIMC}
                    />

                    <Button
                        px={'4'}
                        fontSize={36}
                        rounded={'md'}
                        onPress={handleCalculateIMC}
                    >Calcular</Button>
                </VStack>
            </Center>
            {IMC
                ? <Result imc={IMC} />
                : null
            }
        </VStack>
    );
}