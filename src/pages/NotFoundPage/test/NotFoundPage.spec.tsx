import { describe, it, expect } from 'vitest';
import { renderComponent } from '@/tests';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  const renderNotFoundPage = () => {
    return renderComponent(<NotFoundPage />);
  };

  describe('Rendering', () => {
    it('renders page container with correct class', () => {
      const { getByTestId } = renderNotFoundPage();

      const container = getByTestId('not-found-page');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('Page');
    });

    it('renders 404 heading', () => {
      const { getByRole } = renderNotFoundPage();

      const heading = getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('404');
    });

    it('renders not found message', () => {
      const { getByText } = renderNotFoundPage();

      expect(getByText('404 - Página no encontrada')).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('maintains correct DOM hierarchy', () => {
      const { getByTestId, getByRole } = renderNotFoundPage();

      const container = getByTestId('not-found-page');
      const heading = getByRole('heading');

      expect(container).toContainElement(heading);
    });
  });
});
