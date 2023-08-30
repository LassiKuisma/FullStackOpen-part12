import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('todo component', () => {
  test('renders text', () => {
    const { container } = render(<Todo text={"I'm a todo"} done={true} />);

    expect(container).toHaveTextContent("I'm a todo");
  });

  test('todo that is not done', () => {
    const { container } = render(<Todo text={"I'm a todo"} done={false} />);

    expect(container).toHaveTextContent('This todo is not done');
    expect(container).not.toHaveTextContent('This todo is done');
  });

  test('deleting a todo', () => {
    const markAsDone = jest.fn();
    const deleteTodo = jest.fn();

    render(
      <Todo
        text={"I'm a todo"}
        done={false}
        onClickComplete={markAsDone}
        onClickDelete={deleteTodo}
      />
    );

    const deleteButton = screen.getByText('Delete');
    userEvent.click(deleteButton);

    expect(deleteTodo.mock.calls).toHaveLength(1);
  });

  test('this test passes', () => {
    expect(1 + 1).toEqual(2);
  });
});
