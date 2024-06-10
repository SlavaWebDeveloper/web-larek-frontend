export interface BaseModel {
  fetch(): Promise<void>;
  save(): Promise<void>;
}

export interface BaseView {
  render(): void;
  destroy(): void;
}
