import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useRef } from 'react'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

export function QueryLoadingBar() {
	const loadingBar = useRef<LoadingBarRef>(null)
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	if (isFetching || isMutating) {
		loadingBar.current?.continuousStart()
	} else {
		loadingBar.current?.complete()
	}

	return (
		<LoadingBar
			color="var(--primary)"
			height={3}
			shadow={true}
			ref={loadingBar}
		/>
	)
}
