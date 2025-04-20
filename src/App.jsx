import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { ImageList } from "./components/ImageList";
import { NewImageForm } from "./components/NewImageForm";
import { PageWrapper } from "./components/PageWrapper";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";

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

function Main() {
  return (
    <main>
      <div className="mt-24 grid gap-8 sm:grid-cols-2">
        <Search />
        <Shortlist />
      </div>
      <ImageList />
      <NewImageForm />
    </main>
  );
}
