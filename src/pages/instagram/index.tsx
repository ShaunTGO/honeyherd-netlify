import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Instafeed from "../../lib/instafeed.min"

export default function Index() {
    const url = "/instagram";
    const title = "All posts";

    fetch('https://honeyherdheroku.herokuapp.com/token.json').then( async (resp) => {
        const tokenObj = await resp.json();

        if (!tokenObj || !tokenObj.token) throw new Error('Failed to load the token');

        const feed = new Instafeed({
            accessToken: tokenObj.token,
            limit: 20,
        });

        feed.run();
    });

    return (
        <Layout>
            <BasicMeta url={url} title={title} />
            <OpenGraphMeta url={url} title={title} />
            <TwitterCardMeta url={url} title={title} />
            <div id="instafeed" className="instafeed" />
            <style jsx global>{`
                .instafeed {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  grid-template-rows: repeat(3, 1fr);
                  grid-column-gap: 0.5rem;
                  grid-row-gap: 0.5rem;
                  max-width: 64rem;
                  margin: auto;                  
                }
                
                .instafeed a {
                  display: block;
                }
                
                .instafeed img {
                  display: block;
                  width: 100%;
                }
              `}</style>
            <style jsx>{`
                .container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex: 1 1 auto;
                  padding: 0 1.5rem;
                }
                h1 {
                  font-size: 2.5rem;
                  margin: 0;
                  font-weight: 500;
                }
                h2 {
                  font-size: 1.75rem;
                  font-weight: 400;
                  line-height: 1.25;
                }
                .fancy {
                  color: #15847d;
                }
                .handle {
                  display: inline-block;
                  margin-top: 0.275em;
                  color: #9b9b9b;
                  letter-spacing: 0.05em;
                }
        
                @media (min-width: 769px) {
                  h1 {
                    font-size: 3rem;
                  }
                  h2 {
                    font-size: 2.25rem;
                  }
                }
              `}</style>
        </Layout>
    );
}