// simple register page that takes username, email, first name, last name, password and confirm password
// and sends a post request to the backend to create a new user.

import * as React from "react";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	VStack,
	Button,
	Box,
	useToast,
} from "@chakra-ui/react";
import { Formik, FormikProps } from "formik";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ProtectedComponent } from "./ProtectedComponent";
import { useRegisterMutation } from "../../app/services/auth";
import type { RegisterRequest } from "../../app/services/auth";

// import validateField from "../../utils/validateField";
import { RegisterSchema } from "../../utils/ValidationSchemas";

export default function Register() {
	const navigate = useNavigate();
	const toast = useToast();
	const [register, { isLoading }] = useRegisterMutation();

	return (
		<Box p={24}>
			<Formik
				initialValues={{
					username: "",
					email: "",
					firstName: "",
					lastName: "",
					password: "",
					confirmPassword: "",
				}}
				validationSchema={RegisterSchema}
				onSubmit={async (values, { setErrors }) => {
					const { confirmPassword, ...rest } = values;
					try {
						await register(rest).unwrap();
						toast({
							title: "Account created.",
							description: "We've created your account for you.",
							status: "success",
							duration: 9000,
							isClosable: true,
						});
						navigate("/login");
					} catch (err) {
						console.log(err);
						toast({
							title: "An error occurred.",
							description: "Unable to create account.",
							status: "error",
							duration: 9000,
							isClosable: true,
						});
					}
				}}>
				{(
					props: FormikProps<
						RegisterRequest & { confirmPassword: string }
					>
				) => (
					<form onSubmit={props.handleSubmit}>
						<VStack spacing={4}>
							<FormControl
								isInvalid={
									(props.errors
										.username as unknown as boolean) &&
									(props.touched
										.username as unknown as boolean)
								}>
								<FormLabel htmlFor="username">
									Username
								</FormLabel>
								<Input
									id="username"
									placeholder="Username"
									name="username"
									onChange={props.handleChange}
									value={props.values.username}
								/>
								{/* <FormHelperText
									textAlign="right"
									color="gray.500">
									{props.values.username.length}/50
								</FormHelperText> */}
								<FormErrorMessage>
									{props.errors.username}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									(props.errors
										.email as unknown as boolean) &&
									(props.touched.email as unknown as boolean)
								}>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									id="email"
									placeholder="Email"
									name="email"
									onChange={props.handleChange}
									value={props.values.email}
								/>
								<FormErrorMessage>
									{props.errors.email}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									(props.errors
										.firstName as unknown as boolean) &&
									(props.touched
										.firstName as unknown as boolean)
								}>
								<FormLabel htmlFor="firstName">
									First Name
								</FormLabel>
								<Input
									id="firstName"
									placeholder="First Name"
									name="firstName"
									onChange={props.handleChange}
									value={props.values.firstName}
								/>
								<FormErrorMessage>
									{props.errors.firstName}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									(props.errors
										.lastName as unknown as boolean) &&
									(props.touched
										.lastName as unknown as boolean)
								}>
								<FormLabel htmlFor="lastName">
									Last Name
								</FormLabel>
								<Input
									id="lastName"
									placeholder="Last Name"
									name="lastName"
									onChange={props.handleChange}
									value={props.values.lastName}
								/>
								<FormErrorMessage>
									{props.errors.lastName}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									(props.errors
										.password as unknown as boolean) &&
									(props.touched
										.password as unknown as boolean)
								}>
								<FormLabel htmlFor="password">
									Password
								</FormLabel>
								<Input
									id="password"
									placeholder="Password"
									name="password"
									type="password"
									onChange={props.handleChange}
									value={props.values.password}
								/>
								<FormErrorMessage>
									{props.errors.password}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									(props.errors
										.confirmPassword as unknown as boolean) &&
									(props.touched
										.confirmPassword as unknown as boolean)
								}>
								<FormLabel htmlFor="confirmPassword">
									Confirm Password
								</FormLabel>
								<Input
									id="confirmPassword"
									placeholder="Confirm Password"
									name="confirmPassword"
									type="password"
									onChange={props.handleChange}
									value={props.values.confirmPassword}
								/>
								<FormErrorMessage>
									{props.errors.confirmPassword}
								</FormErrorMessage>
							</FormControl>
							<Button
								isLoading={isLoading}
								loadingText="Submitting"
								colorScheme="teal"
								variant="outline"
								type="submit">
								Register
							</Button>
						</VStack>
					</form>
				)}
			</Formik>
		</Box>
	);
}
