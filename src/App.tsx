import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	PersistQueryClientProvider,
	persistQueryClient,
} from "@tanstack/react-query-persist-client";

import Router from "./router/router";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

// const localStoragePersister = createAsyncStoragePersister({
// 	storage: window.localStorage,
// });

// persistQueryClient({
// 	queryClient,
// 	persister: localStoragePersister,
// });

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router />
		</QueryClientProvider>
	);
}

export default App;
