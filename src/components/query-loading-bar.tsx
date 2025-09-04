import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

export function QueryLoadingBar() {
	const loadingBar = useRef<LoadingBarRef>(null)
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	const [showBar, setShowBar] = useState(false)

	useEffect(() => {
		let timeout: NodeJS.Timeout

		timeout = setTimeout(() => setShowBar(true), 500)

		return () => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (!showBar) {
			return
		}

		if (isFetching || isMutating) {
			loadingBar.current?.continuousStart()
		} else {
			loadingBar.current?.complete()
		}
	}, [showBar, isFetching, isMutating])

	if (!showBar) {
		return null
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
