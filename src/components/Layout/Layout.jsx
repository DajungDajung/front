import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";

export function DefaultLayout() {
  return (
    <DefaultLayoutStyle className="app-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </DefaultLayoutStyle>
  );
}

export function NonHeaderLayout() {
  return <Outlet />;
}

const DefaultLayoutStyle = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
  }
`;
