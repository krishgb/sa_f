import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useRef,useState } from "react"


export default function RaiseDemand({batch,year,data,name,user,isodd}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const reference_no_ref = useRef(null)
    const letter_no_ref = useRef(null)
    const due_date_ref = useRef(null)
    const [loading_save, set_loading_save] = useState(false)
    const toast = useToast()

    const save = async () => {
        console.log(`Transfer Model data ${data.length}`)
        set_loading_save(true)
        try{
            const request = await fetch('/api/transfer/demand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reference_no: reference_no_ref.current.value,
                    letter_no: letter_no_ref.current.value,
                    due_date: due_date_ref.current.value,
                    batch,
                    year,
                    data,
                    name,
                    isodd
                }
               ),
               credentials: 'include'
            
            })

            const response = await request.json()
            if(response.success){
                onClose()
                toast({
                    title: 'Demands Raised',
                    status: 'success',
                    isClosable: true,
                })
            }else{
                toast({
                    title: response.msg || response.message || 'Something went wrong',
                    status: 'error',
                    isClosable: true,
                })
                onClose()
            }
            set_loading_save(false)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Button 
                borderRadius={3} 
                backgroundColor={'#5169f6'} 
                size={'sm'} 
                color='white'
                fontWeight={'500'}
                onClick={onOpen}
                _hover={{backgroundColor: '#5169f6'}}
            >
                {name}
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount={true}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={'1.2rem'} >{name} for Batch {batch || 0}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={/*error_msgs[0]*/ ''} >
                            <FormLabel >Reference No</FormLabel>

                            <Input
                                borderRadius={'base'}
                                required
                                type="text"
                                placeholder='Reference No'
                                ref={reference_no_ref}
                            />
                            <FormErrorMessage>Reference No is required</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={/*error_msgs[1]*/ ''} mt={4} >
                            <FormLabel>Letter No</FormLabel>
                            <Input
                                borderRadius={'base'}
                                type="text"
                                placeholder='Letter No'
                                required
                                ref={letter_no_ref}
                            />
                            <FormErrorMessage>Letter No is required</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={/*error_msgs[2]*/ ''} mt={4}>
                            <FormLabel>Due Date</FormLabel>
                            <Input
                                borderRadius={'base'}
                                type="date"
                                placeholder='Due Date'
                                required
                                ref={due_date_ref}
                            />
                            <FormErrorMessage>Due Date is required</FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={save} isLoading={loading_save} >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
