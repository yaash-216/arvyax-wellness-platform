export interface LinkInterface {
  to: string;
  label: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export type UseAutoSaveOptions<T> = {
  value: T;
  onSave: (value: T) => Promise<any> | any;
  delay?: number;
};

export interface FormEditorInterface {
  id?: string | null;
  title: string;
  tags: string;
  json_file_url: string;
};