import { Layout } from "./components/layout/Layout";
import { ShortUrlForm } from "./components/shortUrl/forms/ShortUrlForm";
import { LinkList } from "./components/shortUrl/LinkList";

function App() {
  return (
    <Layout>
      <ShortUrlForm />
      <LinkList />
    </Layout>
  );
}

export default App;
