export type ITheme = 'dark' | 'light';

export interface IThemeContextType {
  theme: ITheme;
  toggleTheme: () => void;
  setTheme: (newTheme: 'dark' | 'light') => void;
}
