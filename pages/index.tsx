import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import Link from "next/link";
import fetch from "node-fetch";

const INDEX_PAGE_ID = "ab2f6a1e3fb047659e10f854cc63b55e";
const FAVICON_URL = "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F125e2583-73b0-4646-8b4e-ab66537a0dbb%2Fkaisancomp.jpg?table=block&amp;id=ab2f6a1e-3fb0-4765-9e10-f854cc63b55e&amp;cache=v2&amp;userId=848b6a58-1250-4be0-9116-8050f022b9cb&amp;width=200";

export async function getStaticProps() {
  const data: BlockMapType = await fetch(
    "https://notion-api.splitbee.io/v1/page/" + INDEX_PAGE_ID
  ).then(res => res.json());

  return {
    props: {
      blockMap: data,
      favicon: FAVICON_URL
    },
    revalidate: 1
  };
}

const Home = ({ blockMap, favicon }) => (
  <div>
    <Head>
      <style>{`body { margin: 0;}`}</style>
      <title>kaiinui.com</title>
      <link rel="icon" type="image/jpeg" href={favicon} />
    </Head>
    <div className="container">
      <NotionRenderer
        blockMap={blockMap}
        fullPage
        hideHeader
        customBlockComponents={{
          page: ({ blockValue, renderComponent }) => (
            <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
          )
        }}
      />
    </div>
  </div>
);

export default Home;