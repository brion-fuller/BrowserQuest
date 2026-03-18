import type { JSX } from "solid-js";
import "./Parchment.css";

interface Props {
  children: JSX.Element;
}

export default function Parchment(props: Props) {
  return (
    <section id="parchment">
      <div class="parchment-left"></div>
      <div class="parchment-middle">
        {props.children}
      </div>
      <div class="parchment-right"></div>
    </section>
  );
}
