import { SafeTitlePipe } from './safe-title-pipe';

describe('Pipe безопасного заголовка', () => {
  it('создает экземпляр', () => {
    const pipe = new SafeTitlePipe();
    expect(pipe).toBeTruthy();
  });
});

