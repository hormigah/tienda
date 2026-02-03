import { renderComponentWithRouter } from '@/tests';
import { describe, it, expect } from 'vitest';

describe('Layout', () => {
  const mockChildren = <div data-testid="child-content">Test Content</div>;

  const renderLayout = () => {
    return renderComponentWithRouter(mockChildren);
  };

  describe('Rendering', () => {
    it('renders container with Layout class', () => {
      const { getByTestId } = renderLayout();

      const layoutContainer = getByTestId('layout');
      expect(layoutContainer).toHaveClass('Layout');
    });

    it('renders children content', () => {
      const { getByTestId } = renderLayout();

      expect(getByTestId('child-content')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('accepts and renders multiple children', () => {
      const multipleChildren = (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      );

      const { getByTestId } = renderComponentWithRouter(multipleChildren);

      expect(getByTestId('child-1')).toBeInTheDocument();
      expect(getByTestId('child-2')).toBeInTheDocument();
    });
  });
});
