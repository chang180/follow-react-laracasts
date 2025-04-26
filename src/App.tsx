import { ErrorBoundary } from "react-error-boundary";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { PageWrapper } from "./components/PageWrapper";
import { Main } from "./main";
import { Suspense } from "react";
import { Loader } from "lucide-react";

function App() {
  return (
    <PageWrapper className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
      <Container>
        <Header />
        <ErrorBoundary fallbackRender={({ error }) => (
          <div className="bg-red-100 p-6 mt-12 shadow ring ring-black/5">
            <div className="text-red-500">{error.message} : {error.details}</div>
          </div>
        )}>
          <Suspense fallback={
            <div className="bg-green-100 p-6 mt-12 shadow ring ring-black/5">
              <Loader className="animate-spin stroke-slate-300" />
            </div>
          }>
            <Main />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </PageWrapper>
  );
}

export default App;


