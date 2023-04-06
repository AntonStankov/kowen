import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { useAppDispatch, useTypedSelector } from "../../hooks/store";
import { selectCurrentGroup } from "../../features/groups/groupsSlice";

import Groups from "../../features/groups/Groups";
import Group from "../../features/groups/Group";

export default function Dashboard() {
	const dispatch = useAppDispatch();
	const currentGroup = useTypedSelector(selectCurrentGroup);

	return (
		<Flex
			direction="row"
			w="full"
			h="100vh"
			bg={useColorModeValue("gray.50", "inherit")}
			wrap="wrap">
			<Flex
				direction="column"
				w="fit-content"
				h="full"
				bg={useColorModeValue("gray.200", "gray.900")}
				wrap="wrap"
				overflowY="scroll"
				overflowX="hidden"
				shadow="md"
				p={3}>
				<Groups />
			</Flex>
			{currentGroup && (
				<Flex
					direction="column"
					w="fit-content"
					h="full"
					bg={useColorModeValue("gray.100", "gray.700")}
					wrap="wrap"
					overflowY="scroll"
					overflowX="hidden"
					// position={"fixed"}
					// left={{ base: "md", md: "lg" }}
					// top={0}
					// bottom={0}
					// zIndex={10}
					// shadow="md"
				>
					<Group />
				</Flex>
			)}
		</Flex>
	);
}
