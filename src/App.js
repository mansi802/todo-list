import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Item from "./Item";
import { lightTheme, darkTheme } from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { addWork, clearCompleted } from "./redux/actions/todoActions";

function App() {
  const { all, active, completed } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : lightTheme
  );

  const [work, setWork] = useState("");
  const [list, setList] = useState(all);

  useEffect(() => {
    setList(all);
  }, [all]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const changeTheme = (theme) => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };

  return (
    <Container>
      <Background theme={theme}>
        <img src={theme.backgroundImage} alt="img" />
        <div></div>
      </Background>
      <Main theme={theme}>
        <div className="heading">
          <h1>TODO</h1>
          <img src={theme.icon} alt="icon" onClick={() => changeTheme(theme)} />
        </div>
        <div className="input">
          {/* <div></div> */}
          <input
            type="text"
            value={work}
            onChange={(e) => {
              setWork(e.target.value);
            }}
          />
          <img
            src="/images/thumb.svg"
            alt="thumb"
            onClick={() => {
              dispatch(addWork(work));
              setWork("");
            }}
          />
        </div>
        <div className="main">
          <div className="items">
            {list.map((item) => (
              <Item theme={theme} item={item} />
            ))}
          </div>
          <div className="footer">
            <span>
              {active.length}
              {list.length <= 1 ? ` item left` : ` items left`}
            </span>
            <div className="tags">
              <span
                className={list === all && "activeTag"}
                onClick={() => setList(all)}
              >
                All
              </span>
              <span
                className={list === active && "activeTag"}
                onClick={() => setList(active)}
              >
                Active
              </span>
              <span
                className={list === completed && "activeTag"}
                onClick={() => setList(completed)}
              >
                Completed
              </span>
            </div>
            <span onClick={() => dispatch(clearCompleted())}>
              Clear Completed
            </span>
          </div>
        </div>
      </Main>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;

  img {
    width: 100%;
    flex: 0.4;
  }

  div {
    flex: 0.6;
    width: 100vw;
    background-color: ${({ theme }) => theme.bodyBackgroundColor};
  }
`;

const Main = styled.div`
  height: 100vh;
  width: clamp(500px, 45vw, 800px);
  /* border: 1px solid red; */
  padding: 80px 20px;

  & > .heading {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 20px;
    align-items: center;
    margin-bottom: 5rem;

    h1 {
      font-size: 5rem;
      letter-spacing: 7px;
      color: var(--very-light-gray);
    }

    img {
      cursor: pointer;
    }
  }

  & > .input {
    width: 100%;
    height: 50px;
    background-color: ${({ theme }) => theme.todolistBackground};
    border-radius: 5px;
    border: none;
    padding: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    div {
      height: 25px;
      width: 25px;
      border-radius: 50%;
      border: ${({ theme }) => theme.border};
    }

    input {
      width: 90%;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 2rem;
      margin: 0 10px;
      color: ${({ theme }) => theme.textColor};
    }

    img {
      height: 100%;
      cursor: pointer;
    }
  }

  & > .main {
    border-radius: 5px;

    .items {
      display: flex;
      flex-direction: column;
      border-radius: 5px 5px 0 0;
      height: 49vh;
      overflow-y: scroll;
    }

    .items::-webkit-scrollbar {
      display: none;
    }

    .footer {
      width: 100%;
      height: 35px;
      background-color: ${({ theme }) => theme.todolistBackground};
      border-radius: 0 0px 5px 5px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 1.3rem;
      color: ${({ theme }) => theme.textCutColor};
      align-items: center;

      span {
        cursor: pointer;
      }

      span:hover {
        color: ${({ theme }) => theme.textColor};
      }

      .tags {
        display: flex;
        justify-content: space-between;
        flex: 0.6;

        @media (max-width: 786px) {
          flex: 0.8;
        }

        span {
          cursor: pointer;
          text-decoration: none;
          color: ${({ theme }) => theme.textCutColor};
        }

        span:hover {
          color: ${({ theme }) => theme.textColor};
        }

        span.activeTag {
          color: blue;
        }
      }
    }
  }
`;
