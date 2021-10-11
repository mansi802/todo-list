import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { removeWork, workComplete } from "./redux/actions/todoActions";

function Item({ theme, item }) {
  const { id, work, completed } = item;
  const dispatch = useDispatch();
  return (
    <Container theme={theme} key={id}>
      {completed ? (
        <>
          <div className="color" onClick={() => dispatch(workComplete(id))}>
            <img src="/images/icon-check.svg" alt="tick" />
          </div>
          <span>
            <del>{work} </del>
          </span>
        </>
      ) : (
        <>
          <div onClick={() => dispatch(workComplete(id))}></div>
          <span>{work}</span>
        </>
      )}

      <img
        src="/images/icon-cross.svg"
        alt="cross"
        className="cross"
        onClick={() => dispatch(removeWork(id))}
      />
    </Container>
  );
}

export default Item;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  min-height: 50px;
  background-color: ${({ theme }) => theme.todolistBackground};
  border-bottom: ${({ theme }) => theme.border};

  :hover {
    img.cross {
      visibility: visible;
      cursor: pointer;
    }

    div {
      border: 1px solid blue;
    }
  }

  div {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: ${({ theme }) => theme.border};
    cursor: pointer;
  }

  div.color {
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(
      circle,
      rgba(238, 174, 202, 1) 0%,
      rgba(148, 187, 233, 1) 100%
    );
  }

  img.cross {
    visibility: hidden;

    @media (max-width: 786px) {
      visibility: visible;
    }
  }

  span {
    flex: 0.9;
    text-align: left;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.textColor};
    line-height: 1.2;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    del {
      color: ${({ theme }) => theme.textCutColor};
    }
  }
`;
