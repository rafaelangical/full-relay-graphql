import { useState } from 'react';
import { RelayRefetchProp } from 'react-relay';

type PageInfo = {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	startCursor: string;
	endCursor: string;
};
type Edge<T> = {
	node: T;
	cursor: string;
};
type Connection<T> = {
	endCursorOffset: number;
	startCursorOffset: number;
	count: number;
	totalCount: number;
	pageInfo: PageInfo;
	edges: Edge<T>[];
};

export const useRelayPagination = <T extends object>(relay: RelayRefetchProp, connection: Connection<T>) => {
	const [ isFetchingTop, setIsFetchingTop ] = useState(false);
	const [ isFetchingEnd, setIsFetchingEnd ] = useState(false);

	const onRefresh = () => {
		if (isFetchingTop) {
			return;
		}

		setIsFetchingTop(true);

		const refetchVariables = (fragmentVariables: object) => ({
			...fragmentVariables
		});

		relay.refetch(
			refetchVariables,
			null,
			() => {
				setIsFetchingTop(false);
				setIsFetchingEnd(false);
			},
			{
				force: true
			}
		);
	};

	const onEndReached = () => {
		if (isFetchingEnd) {
			return;
		}

		if (!connection || !connection.pageInfo.hasNextPage) {
			return;
		}

		setIsFetchingEnd(true);

		const { endCursor } = connection.pageInfo;

		const total = connection.edges.length + 10;
		const refetchVariables = (fragmentVariables: object) => ({
			...fragmentVariables,
			first: 10,
			cursor: endCursor
		});
		const renderVariables = {
			first: total
		};

		relay.refetch(
			refetchVariables,
			renderVariables,
			() => {
				setIsFetchingEnd(false);
				setIsFetchingTop(false);
			},
			{
				force: false
			}
		);
	};

	return {
		isFetchingEnd,
		isFetchingTop,
		onRefresh,
		onEndReached
	};
};
