import "@/src/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import Axios from "axios";
import { AuthProvider } from "@/src/context/auth";
import NavBar from "@/src/components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  Axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <AuthProvider>
        {!authRoute && <NavBar />}
        <div className={authRoute ? "" : "pt-12"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
