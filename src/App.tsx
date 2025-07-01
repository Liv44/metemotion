import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import {
	PersistQueryClientProvider,
	persistQueryClient,
} from "@tanstack/react-query-persist-client";

import Router from "./router/router";

// Date deserialization function to handle Date objects from localStorage
function deserialize(cachedString: string) {
	const data = JSON.parse(cachedString);

	// Recursively traverse and convert date strings back to Date objects
	function reviver(key: string, value: unknown): unknown {
		// Check if this looks like a createdAt field with ISO date string
		if (
			key === "createdAt" &&
			typeof value === "string" &&
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
		) {
			return new Date(value);
		}
		return value;
	}

	return JSON.parse(JSON.stringify(data), reviver);
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const localStoragePersister = createAsyncStoragePersister({
	storage: window.localStorage,
	deserialize,
});

persistQueryClient({
	queryClient,
	persister: localStoragePersister,
});

function App() {
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister: localStoragePersister }}
		>
			<Router />
		</PersistQueryClientProvider>
	);
}

export default App;
