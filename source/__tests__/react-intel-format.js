import configure from '../configure';
import * as format from '../react-intl-format';

describe('react-intl-format', () => {
  it('exports configure as configure', () => {
    expect(format.configure).toEqual(configure);
  });

  it('exports <Format /> as Format', () => {
    expect(format.Format).toBeInstanceOf(Function);
    expect(format.Format).toHaveProperty('displayName', 'Format');
  });
});
