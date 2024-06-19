import {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "../styles/tailwind.css";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
function MyApp({Component, pageProps}: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export default MyApp;
