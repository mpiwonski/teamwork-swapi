import styled from "styled-components";

const StyledBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-image: url("background.jpg");
`;

function Background({ children }) {
  return <StyledBackground>{children}</StyledBackground>;
}

export default Background;
