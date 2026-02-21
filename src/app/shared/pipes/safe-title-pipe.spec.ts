import { SafeTitlePipe } from './safe-title-pipe';

describe('Pipe SafeTitle', () => {
  it('создает экземпляр', () => {
    const pipe = new SafeTitlePipe();
    expect(pipe).toBeTruthy();
  });
});

