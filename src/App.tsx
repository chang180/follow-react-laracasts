import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { PageWrapper } from "./components/PageWrapper";
import { Main } from "./main";

function App() {
  return (
    <PageWrapper className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
      <Container>
        <Header />
        <Main />
      </Container>
    </PageWrapper>
  );
}

export default App;


