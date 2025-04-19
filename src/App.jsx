import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { PageWrapper } from "./components/PageWrapper";

function App() {
  return (
    <PageWrapper className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
      <Container>
        <Header />
        {/* Images list */}
        {/* New Image form */}
      </Container>
    </PageWrapper>
  );
}

export default App;
