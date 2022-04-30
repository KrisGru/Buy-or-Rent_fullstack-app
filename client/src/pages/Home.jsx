import { useContext } from "react";
import { AppContext } from "../utils/boxOfStates";

export default function Home() {
  const { input } = useContext(AppContext);

  return (
    <>
      <h1 className="headerHome">Current News</h1>
      <h2>{input}</h2>
      <Article
        title="Article 1"
        photo="assets/articleImg.jpg"
        autor="It uses utility classes for typography and spacing to space content out within the larger container."
      />
      <Article title="Article 2" autor="Christopher Somebody" />
    </>
  );
}

function Article({ title, photo, autor }) {
  return (
    <div className="bgJumbotron">
      <div className="jumbotron">
        <h1 className="display-4">{title}</h1>
        <div className="jumbotron__body">
          {photo ? <img src={photo} alt="logo" /> : null}
          <p className="jumbotron__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus nam alias voluptatem neque modi ex minus temporibus.
            Natus, nulla numquam libero omnis, ipsum laborum asperiores vero
            quia itaque. Incidunt, delectus.This is a simple hero unit, a simple
            jumbotron-style component for calling extra attention to featured
            content or information.
          </p>
        </div>
        <p className="jumbotron__autor">{autor}</p>
        <a className="btn btn-lg button darkBtn" href="./" role="button">
          Learn more
        </a>
      </div>
    </div>
  );
}
