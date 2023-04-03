// a popup similar to the discord join/create server popup
// this is the popup that appears when you click the "join/create" button

import {
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	IconButton,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useCreateGroupMutation } from "../../app/services/groups";
import { Form, Formik, FormikProps } from "formik";
import { CreateGroupRequest } from "../../app/services/groups";
import { useNavigate } from "react-router-dom";
// import { useCreateGroupMutation } from "../../app/services/groups";
import { AddIcon } from "@chakra-ui/icons";

import { CreateGroupSchema } from "../../utils/ValidationSchemas";

export default function GroupModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [createGroup] = useCreateGroupMutation();
	const toast = useToast();
	const navigate = useNavigate();

	return (
		<>
			<IconButton
				size={{ base: "md", md: "lg", lg: "xl" }}
				w={"full"}
				p={6}
				fontSize={"lg"}
				borderRadius={"full"}
				variant={"ghost"}
				aria-label={"Create Group"}
				bg={useColorModeValue("gray.200", "gray.500")}
				_hover={{
					bg: "green.500",
					borderRadius: "30%",
				}}
				icon={<AddIcon />}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Group</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Formik
							initialValues={{ name: "", description: "" }}
							validationSchema={CreateGroupSchema}
							onSubmit={async (values, { setErrors }) => {
								try {
									await createGroup(values).unwrap();
									onClose();
									navigate(0);
									toast({
										title: "Group created.",
										description:
											"We've created your group for you.",
										status: "success",
										duration: 9000,
										isClosable: true,
									});
								} catch (err) {
									toast({
										title: "An error occurred.",
										description:
											"Sorry, we've encountered an error. Please try again later.",
										status: "error",
										duration: 9000,
										isClosable: true,
									});
								}
							}}>
							{(props: FormikProps<CreateGroupRequest>) => (
								<Form>
									<FormControl
										isInvalid={
											props.touched.name &&
											Boolean(props.errors.name)
										}>
										<FormLabel htmlFor="name">
											Name
										</FormLabel>
										<Input
											id="name"
											placeholder="name"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.name}
										/>
										<FormErrorMessage>
											{props.errors.name}
										</FormErrorMessage>
									</FormControl>
									<FormControl
										isInvalid={
											props.touched.description &&
											Boolean(props.errors.description)
										}>
										<FormLabel htmlFor="description">
											Description
										</FormLabel>
										<Input
											id="description"
											placeholder="description"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.description}
										/>
										<FormErrorMessage>
											{props.errors.description}
										</FormErrorMessage>
									</FormControl>
									<Button
										isDisabled={!props.isValid}
										loadingText="Submitting"
										colorScheme="twitter"
										variant="outline"
										type="submit"
										size="lg"
										width="full">
										Create Group
									</Button>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
