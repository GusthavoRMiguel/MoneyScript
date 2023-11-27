import React from "react";
import { useTransform } from "framer-motion";
import Link from "next/link";

import { useWrapperScroll } from "../Model";

import { Container, Header, Footer } from "./styles";

const UniqueOverlay: React.FC = () => {
  const { scrollYProgress } = useWrapperScroll();

  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <>
      <Container>
        <Header></Header>
      </Container>
      <Footer style={{ opacity }}>
        <ul>
          <li>
            <Link href="#">Money Script</Link>
          </li>
          <li>
            <Link href="/contato">FALE CONOSCO</Link>
          </li>
          <li>
            <Link href="#">POLITICA DE PRIVACIDADE</Link>
          </li>
        </ul>
      </Footer>
    </>
  );
};

export default UniqueOverlay;
