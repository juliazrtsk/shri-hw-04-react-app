export interface Page {
  loadData(...args: unknown[]): Promise<void>;
}
